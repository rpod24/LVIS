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

app = Quart(__name__)
app = cors(app, allow_origin="*")

mongo = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongo["DEV"]
demo = db["MONGO_DEMO"]
sensitivedb = mongo["sensitive_data"]
users = sensitivedb["users"]


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


@app.route("/time")
@authenticate(TokenManager.ValidationLevel.USER)
def get_time():
    return {"time": time.time()}


@app.route("/mongo")
async def get_mongo():
    data = json_serializable(demo.find_one())
    print(data)
    if data is not None:
        demo.delete_one(data)
        return data
    return {}


@app.route("/mongocreate", methods=["POST"])
async def mongocreate():
    data = await request.get_data()
    print(json.loads(data))
    demo.insert_one(json.loads(data))
    demo.insert_one(json.loads(data))
    return "ok"


# @app.route('/validate', methods=['POST'])
# async def validate():
#     data = await request.get_data()
#     print(json.loads(data))
#     data = request.headers.get('Token')
#     print(data)
#     return 'ok'


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

    token = TokenManager.generate_token(user['username'])
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
