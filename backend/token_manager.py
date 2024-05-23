import datetime
from enum import Enum
import secrets
import string
import bcrypt
import pymongo
import jwt
import json
from quart import request


class TokenManager:

    SERVER_SECRET_KEY = "your_secret_key"

    mongo = pymongo.MongoClient("mongodb://localhost:27017/")
    db = mongo["sensitive_data"]
    users = db["users"]
    basesalt = b'$2b$12$yyWUkoynZmBAH85KIJBh4e'

    class ValidationLevel(Enum):
        MINIMAL = 1  # User with out token
        CUSTOMER = 2  # User logged in with a customer token
        STAFF = 3  # User logged in with a staff token
        MOD = 4  # User with elevated permissions
        ADMIN = 5  # User with all permissions

    @staticmethod
    def generate_password(length: int = 16):
        characters = string.ascii_letters + string.digits + string.punctuation
        password = "".join(secrets.choice(characters) for i in range(length))
        return password

    @staticmethod
    def hash_password(password: string):
        hashed_password = bcrypt.hashpw(password.encode(), TokenManager.basesalt)
        return hashed_password

    @staticmethod
    def generate_user(
        user: string,
        password: string,
        permissions: ValidationLevel = ValidationLevel.USER,
        expires_at: datetime = (datetime.datetime.now() + datetime.timedelta(days=1)),
    ):
        hashed_password = TokenManager.hash_password(password)
        payload = {"username": user, "permission": permissions.value, "exp": expires_at}
        token = jwt.encode(payload, TokenManager.SERVER_SECRET_KEY, algorithm="HS256")
        document = {
            "username": user,
            "password": hashed_password,
            "permissions": permissions.value,
            "token": token,
        }
        TokenManager.users.insert_one(document)
        return token

    @staticmethod
    def generate_token(
        user: string,
        permissions: ValidationLevel = ValidationLevel.USER,
        expires_at: datetime = None,
    ):
        print(user)
        if not expires_at:
            expires_at = datetime.datetime.now() + datetime.timedelta(days=1)
            print(expires_at)
        payload = {"username": user, "permission": permissions.value, "exp": expires_at}
        token = jwt.encode(payload, TokenManager.SERVER_SECRET_KEY, algorithm="HS256")
        print(expires_at)
        print(token)
        TokenManager.users.find_one_and_update(
            {"username": user}, {"$set": {"token": token}}
        )
        return token

    
