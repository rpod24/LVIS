const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

class TokenManager {
    static SERVER_SECRET_KEY = 'your_secret_key';

    static mongoUrl = 'mongodb://localhost:27017/';
    static client = new MongoClient(TokenManager.mongoUrl);
    static db;
    static users;
    static basesalt = '$2b$12$yyWUkoynZmBAH85KIJBh4e';

    static async init() {
        await TokenManager.client.connect();
        TokenManager.db = TokenManager.client.db('sensitive_data');
        TokenManager.users = TokenManager.db.collection('users');
    }

    static ValidationLevel = {
        MINIMAL: 1,  // User without token
        USER: 2,     // User logged in with a base token
        MOD: 3,      // User with elevated permissions
        ADMIN: 4     // User with all permissions
    };

    static generatePassword(length = 16) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }

    static async hashPassword(password) {
        const hashedPassword = await bcrypt.hash(password, TokenManager.basesalt);
        return hashedPassword;
    }

    static async generateUser(user, password, permissions = TokenManager.ValidationLevel.USER, expires = 86400000) {
        console.log("running");
        const hashedPassword = await TokenManager.hashPassword(password);
        const payload = { username: user, permission: permissions, exp: expires };
        const token = jwt.sign(payload, TokenManager.SERVER_SECRET_KEY, { algorithm: 'HS256' });
        const document = {
            username: user,
            password: hashedPassword,
            permissions: permissions,
            token: token,
        };
        await TokenManager.users.insertOne(document);
        return token;
    }

    static async generateToken(user, permissions = TokenManager.ValidationLevel.USER, expires_at = null) {
        if (!expires_at) {
            expires_at = new Date(Date.now() + 86400000);
        }
        const payload = { username: user, permission: permissions, exp: expires_at };
        const token = jwt.sign(payload, TokenManager.SERVER_SECRET_KEY, { algorithm: 'HS256' });
        await TokenManager.users.findOneAndUpdate({ username: user }, { $set: { token: token } });
        return token;
    }
}

// Initialize MongoDB connection
TokenManager.init().catch(console.error);

module.exports = TokenManager;
