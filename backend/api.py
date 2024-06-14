import datetime
import inspect
from bson import ObjectId
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
configs = mongo["configs"]
customersDB = mongo["Customers"]

users = sensitivedb["users"]

products = inventory["products"]
productInventory = inventory["inventory"]

tickets = supportdb["tickets"]

CMSs = configs["CMS"]
facilities = configs["Facility"]
Group = configs["Group"]
Location = configs["Location"]
MEDs = configs["MED"]
Monitor = configs["Monitor"]
Room = configs["Room"]
ConfigAlert = configs["ConfigAlert"]
ConfigCMS = configs["ConfigCMS"]
ConfigMED = configs["ConfigMED"]

prospects = customersDB["prospects"]
customers = customersDB["customers"]

CUSTOMER_LIMIT = 25
USER_LIMIT = 50
PRODUCT_LIMIT = 50

@app.route("/products")
# @authenticate(TokenManager.ValidationLevel.USER)
async def get_products():
    items = json.dumps({"error": "Unexpected Error Occured!"})
    if request.args.__len__() != 0:  # if there are args do:
        if request.args.get("p") is not None:  # todo serialize the arg to int
            print(request.args.get("p"))
            items = dumps(
                products.find().skip(int(request.args.get("p")) * PRODUCT_LIMIT).limit(PRODUCT_LIMIT)
            )  # for selecting pages, use https://site/page?p=i where i is the page number
            if request.args.get("search") is not None:  # todo serialize the arg to int
                if request.args.get("search") == "":
                    items = dumps(
                        products.find().skip(int(request.args.get("p")) * PRODUCT_LIMIT).limit(PRODUCT_LIMIT)
                    )  # returns first 50 products in case ?p= is not in the argument
                else:
                    items = dumps(
                        products.find(
                            {"$text": {"$search": request.args.get("search")}}
                        )
                        .skip(int(request.args.get("p")) * PRODUCT_LIMIT)
                        .limit(PRODUCT_LIMIT)
                    )  # searches through the db and returns at most 50 for the current page
        else:
            print(request.args.get("p"))
    else:
        items = dumps(
            products.find().limit(PRODUCT_LIMIT)
        )  # returns first 50 products in case ?p= is not in the argument
        print(items)
    return items


# @app.route("/time") Code Demo
# # @authenticate(TokenManager.ValidationLevel.USER)
# def get_time():
#     return {"time": time.time()}


@app.route("/tickets", methods=["PUT"])
# @authenticate(TokenManager.ValidationLevel.USER)
async def replace_ticket():
    try:
        print("replacing ticket")
        ticket_data = await request.get_json()
        print("")
        print(ticket_data)
        print("")
        if not ticket_data:
            return json.dumps({"error": "No ticket data provided"}), 400
        current_ticket = tickets.find_one({"ticket": ticket_data["ticket"]})
        ticket_data["_id"] = current_ticket["_id"]
        result = tickets.replace_one(
            {"ticket": ticket_data["ticket"]}, ticket_data
        )
        if result.modified_count == 0:
            return json.dumps({"error": "Ticket not updates!"}), 405
        return json.dumps({"message": "Ticket replaced successfully!"}), 200
    except Exception as e:
        return json.dumps({"error": f"Unexpected Error Occured: {str(e)}"}), 500

@app.route("/tickets", methods=["POST"])
# @authenticate(TokenManager.ValidationLevel.USER)
async def create_ticket():
    try:
        ticket_data = await request.get_json()
        print(ticket_data)
        if not ticket_data:
            return json.dumps({"error": "No ticket data provided"}), 400
        print(dumps(tickets.find().sort({"ticket":-1}).limit(1)[0]))
        index = (int) (tickets.find().sort({"ticket":-1}).limit(1)[0]['ticket'])
        # Insert the new ticket into the database
        print(ticket_data)
        ticket_data['ticket'] = index+1
        print(ticket_data)
        result = tickets.insert_one(ticket_data)
        print(result.inserted_id)
        return dumps(tickets.find_one(result.inserted_id)), 201
        # return ticket_data, 201

    except Exception as e:
        print(e)
        return json.dumps({"error": f"Unexpected Error Occured: {str(e)}"}), 500


@app.route("/tickets")
# @authenticate(TokenManager.ValidationLevel.USER)
async def get_tickets():
    items = json.dumps({"error": "Unexpected Error Occured! Request: " + request.url})
    if request.args.__len__() != 0:  # if there are args do:
        if request.args.get("ticket", type=int) is not None:
            return dumps(tickets.find({"ticket": request.args.get("ticket", type=int)}).limit(1))
        elif request.args.get("p") is not None:  # todo serialize the arg to int
            print(request.args.get("p"))
            items = dumps(
                tickets.find().skip(int(request.args.get("p")) * PRODUCT_LIMIT).limit(PRODUCT_LIMIT)
            )  # for selecting pages, use https://site/page?p=i where i is the page number
            if request.args.get("search") is not None:  # todo serialize the arg to int
                if request.args.get("search") == "":
                    items = dumps(
                        tickets.find().skip(int(request.args.get("p")) * PRODUCT_LIMIT).limit(PRODUCT_LIMIT)
                    )  # returns first 50 tickets in case ?p= is not in the argument
                else:
                    items = dumps(
                        tickets.find({"$text": {"$search": request.args.get("search")}})
                        .skip(int(request.args.get("p")) * PRODUCT_LIMIT)
                        .limit(PRODUCT_LIMIT)
                    )  # searches through the db and returns at most 50 for the current page
        elif request.args.get("ticket") is not None:
            items = json.dumps({"error": "Invalid Ticket Entered!"})
        else:
            print(request.args.get("p"))
    else:
        items = dumps(
            tickets.find().limit(PRODUCT_LIMIT)
        )  # returns first 50 tickets in case ?p= is not in the argument
        print(items)
    return items

@app.route("/tickets/<ticket_id>", methods=["DELETE"])
# @authenticate(TokenManager.ValidationLevel.USER)
async def delete_ticket(ticket_id):
    try:
        result = tickets.delete_one({"ticket": int(ticket_id)})
        if result.deleted_count == 0:
            return json.dumps({"error": "Ticket not found!"}), 404
        return json.dumps({"message": "Ticket deleted successfully!"}), 200
    except Exception as e:
        return json.dumps({"error": f"Unexpected Error Occured: {str(e)}"}), 500
    
@app.route("/facilities")
#Returns 50 facilities at a time based on the page number
async def get_facilities():
    items = json.dumps({"error": "Unexpected Error Occured!"})
    search = ""
    if request.args.__len__() != 0:
        print(request.args)
        if request.args.get("search") is not None and request.args.get("search") != "":
            search = {"$text": {"$search": request.args.get("search")}}
        if request.args.get("sort") is not None and request.args.get("sort") != "":
            req = facilities.find(search).sort(json.loads(request.args.get("sort")))
        else:
            req = facilities.find(search)
        if request.args.get("p") is not None and request.args.get("p").isnumeric() and int(request.args.get("p")) >= 0:
            items = dumps(req.skip(int(request.args.get("p")) * 50).limit(50))
        else:
            items = dumps(req.limit(50))
    else:
        items = dumps(facilities.find().limit(50))
    return items

@app.route("/facility/<facility_id>")
#Returns the facility with the given id
async def get_facility(facility_id):
    print(facility_id)
    facility = (facilities.find({"PartitionKey": facility_id}).limit(1))
    groups = (Group.find({"PartitionKey": facility_id}))
    locations = (Location.find({"PartitionKey": facility_id}))
    meds = (MEDs.find({"PartitionKey": facility_id}))
    monitors = (Monitor.find({"PartitionKey": facility_id}))
    rooms = (Room.find({"PartitionKey": facility_id}))
    config_alerts = (ConfigAlert.find({"PartitionKey": facility_id}))
    config_cms = (ConfigCMS.find({"PartitionKey": facility_id}))
    config_med = (ConfigMED.find({"PartitionKey": facility_id}))
    cms = (CMSs.find({"PartitionKey": facility_id}))
    return dumps({
        "facility": facility,
        "groups": groups,
        "locations": locations,
        "meds": meds,
        "monitors": monitors,
        "rooms": rooms,
        "config_alerts": config_alerts,
        "config_cms": config_cms,
        "config_med": config_med,
        "cms": cms
    })



@app.route("/prospects")
#Returns 50 customers at a time based on the page number
async def get_prospects():
    items = json.dumps({"error": "Unexpected Error Occured!"})
    if request.args.__len__() != 0:
        print(request.args)
        if request.args.get("search") is not None and request.args.get("search") != "":
            search = {"$text": {"$search": request.args.get("search")}, "status": "Pending"}
        else:
            search = {"status": "Pending"}
        if request.args.get("sort") is not None and request.args.get("sort") != "":
            req = prospects.find(search).sort(json.loads(request.args.get("sort")))
        else:
            req = prospects.find(search)
        if request.args.get("p") is not None and request.args.get("p").isnumeric() and int(request.args.get("p")) >= 0:
            items = dumps(req.skip(int(request.args.get("p")) * CUSTOMER_LIMIT).limit(CUSTOMER_LIMIT))
        else:
            items = dumps(req.limit(CUSTOMER_LIMIT))
    else:
        items = dumps(prospects.find().limit(CUSTOMER_LIMIT))
    return items

@app.route("/customers")
#Returns 50 customers at a time based on the page number
async def get_customers():
    items = json.dumps({"error": "Unexpected Error Occured!"})
    search = ""
    if request.args.__len__() != 0:
        print(request.args)
        if request.args.get("search") is not None and request.args.get("search") != "":
            search = {"$text": {"$search": request.args.get("search")}}
        if request.args.get("sort") is not None and request.args.get("sort") != "":
            req = customers.find(search).sort(json.loads(request.args.get("sort")))
        else:
            req = customers.find(search)
        if request.args.get("p") is not None and request.args.get("p").isnumeric() and int(request.args.get("p")) >= 0:
            items = dumps(req.skip(int(request.args.get("p")) * CUSTOMER_LIMIT).limit(CUSTOMER_LIMIT))
        else:
            items = dumps(req.limit(CUSTOMER_LIMIT))
    else:
        items = dumps(customers.find().limit(CUSTOMER_LIMIT))
    return items

@app.route("/customers/<customer_id>")
#Returns the customer with the given id
async def get_customer(customer_id):
    id = ObjectId(customer_id)
    print(customer_id)
    customer = (customers.find({"_id":id}).limit(1)[0])
    return dumps(customer)

@app.route("/customers", methods=["POST"])
# @authenticate(TokenManager.ValidationLevel.USER)
async def create_customer():
    try:
        customer_data = await request.get_json()
        print(customer_data)
        if not customer_data:
            return json.dumps({"error": "No customer data provided"}), 400
        result = customers.insert_one(customer_data)
        return dumps(customers.find_one(result.inserted_id)), 201
    except Exception as e:
        return json.dumps({"error": f"Unexpected Error Occured: {str(e)}"}), 500
    
@app.route("/customers/<customer_id>", methods=["POST"])
# @authenticate(TokenManager.ValidationLevel.USER)
async def update_customer(customer_id):
    try:
        customer_data = await request.get_json()
        print(customer_data)
        if not customer_data:
            return json.dumps({"error": "No customer data provided"}), 419
        current_customer = customers.find_one({"_id": ObjectId(customer_id)})
        if(str(current_customer["_id"]) != str(customer_data["_id"]["$oid"])):
            return json.dumps({"error": "Customer ID does not match!" + str(customer_data["_id"]["$oid"]) + "!=" + str(current_customer["_id"])}), 420
        customer_data["_id"] = current_customer["_id"]
        print("-----------------")
        print( customers.find_one_and_replace(
            {"_id": ObjectId(customer_id)}, customer_data
        ))
        # if result.modified_count == 0:
        #     return json.dumps({"error": "Customer not updates!"}), 405
        return json.dumps({"message": "Customer replaced successfully!"}), 200
    except Exception as e:
        print(e)
        return json.dumps({"error": f"Unexpected Error Occured: {str(e)}"}), 500

# @app.route("/ticket")
# # @authenticate(TokenManager.ValidationLevel.USER)
# async def get_ticket():
#     item = tickets.find({"ticket": request.args.get("ticket")}).limit(1)
#     print(item)
#     return item


# Authentication and Logging in


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

    user = users.find_one({"username": username})

    if user:
        return json.dumps({"error": "User already exists!"}), 401

    token = TokenManager.generate_user(username, password)
    return json.dumps({"token": token})


if __name__ == "__main__":
    app.run()
