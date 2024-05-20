import datetime
import inspect
from quart import Quart
import json
import pymongo
import time
from token_manager import TokenManager
from json_serialize import json_serializable
from quart_cors import cors
from quart import request
from functools import wraps
import jwt
from bson.json_util import loads, dumps

app = Quart(__name__)
app = cors(app, allow_origin="*")

mongo = pymongo.MongoClient("mongodb://localhost:27017/")

db = mongo["DEV"]
inventory = mongo["inventory"]
sensitivedb = mongo["sensitive_data"]
supportdb = mongo["support"]

users = sensitivedb["users"]
demo = db["MONGO_DEMO"]
products = inventory["products"]
productInventory = inventory["inventory"]
tickets = supportdb["tickets"]


@app.route("/products")
# @authenticate(TokenManager.ValidationLevel.USER)
async def get_products():
    items = json.dumps({"error": "Unexpected Error Occured!"})
    if request.args.__len__() != 0:  # if there are args do:
        if request.args.get("p") is not None:  # todo serialize the arg to int
            print(request.args.get("p"))
            items = dumps(
                products.find().skip(int(request.args.get("p")) * 50).limit(50)
            )  # for selecting pages, use https://site/page?p=i where i is the page number
            if request.args.get("search") is not None:  # todo serialize the arg to int
                if request.args.get("search") == "":
                    items = dumps(
                        products.find().skip(int(request.args.get("p")) * 50).limit(50)
                    )  # returns first 50 products in case ?p= is not in the argument
                else:
                    items = dumps(
                        products.find(
                             { '$text': { '$search': request.args.get("search") } } 
                        )
                        .skip(int(request.args.get("p")) * 50)
                        .limit(50)
                    )  # searches through the db and returns at most 50 for the current page
        else:
            print(request.args.get("p"))
    else:
        items = dumps(
            products.find().limit(50)
        )  # returns first 50 products in case ?p= is not in the argument
        print(items)
    return items


# @app.route("/time") Code Demo
# # @authenticate(TokenManager.ValidationLevel.USER)
# def get_time():
#     return {"time": time.time()}

@app.route("/CreateTicket", methods=["GET", "POST"]) #TODO Finish
async def createTicket():
    cursor = tickets.find( {}, { 'ticketNumber': 1 } ).sort( { 'ticketNumber': -1 } ).limit(1)
    number = cursor.next()['ticketNumber'] if cursor.next() is not None else 1
    data = await request.get_data()
    print(json.loads(data))
    print(number)



#Authentication and Logging in

def authenticate(required_role: TokenManager.ValidationLevel):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            print("authenticating")
            token = request.headers.get("Authorization")
            payload = None
            if not token:
                return json.dumps({"error": "Token is missing!"}), 401
            try:
                payload = jwt.decode(
                    token.split()[0],
                    TokenManager.SERVER_SECRET_KEY,
                    algorithms=["HS256"],
                )
            except jwt.ExpiredSignatureError:
                return json.dumps({"error": "Token has expired!"}), 401
            except jwt.InvalidTokenError:
                return json.dumps({"error": "Invalid token!"}), 401
            if not payload:
                return json.dumps({"error": "Unexpected Token Error Occurred"}), 401
            if payload["permission"] < required_role.value:
                return json.dumps({"error": "Access forbidden!"}), 403
            return func(*args, **kwargs)

        return wrapper

    return decorator

@app.route("/login", methods=["POST"])
async def login():
    data = json.loads(await request.get_data())
    username = data["username"]
    password = data["password"]

    user = users.find_one({"username": username})
    database_password = user["password"] if user else None
    if not user:
        print("Invalid user!")
        return json.dumps({"error": "Invalid credentials!"}), 401
    elif not TokenManager.hash_password(password) == database_password:
        print(TokenManager.hash_password(password))
        print(database_password)
        print("Invalid password!")
        return json.dumps({"error": "Invalid credentials!"}), 401

    token = TokenManager.generate_token(user["username"])
    return json.dumps({"token": token})


@app.route("/register", methods=["POST"])
async def register():
    data = json.loads(await request.get_data())
    username = data["username"]
    password = data["password"]

    user = demo.find_one({"username": username})

    if user:
        return json.dumps({"error": "User already exists!"}), 401

    token = TokenManager.generate_user(username, password)
    return json.dumps({"token": token})


if __name__ == "__main__":
    app.run()
