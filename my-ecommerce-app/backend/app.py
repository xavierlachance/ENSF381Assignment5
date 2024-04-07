from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

users = []

products = [
    {
        "id": 1,
        "name": "Product 1",
        "description": "Description for Product 1",
        "price": 10.99,
        "image": 'images/product1.png'
    },
    {
        "id": 2,
        "name": "Product 2",
        "description": "Description for Product 2",
        "price": 20.99,
        "image": 'images/product2.jpg'
    },
    {
        "id": 3,
        "name": "Product 3",
        "description": "Description for Product 3",
        "price": 10.99,
        "image": 'images/product3.jpg'
    },
    {
        "id": 4,
        "name": "Product 4",
        "description": "Description for Product 4",
        "price": 10.99,
        "image": 'images/product4.jpg'
    },
    {
        "id": 5,
        "name": "Product 5",
        "description": "Description for Product 5",
        "price": 10.99,
        "image": 'images/product5.jpg'
    },
    {
        "id": 6,
        "name": "Product 6",
        "description": "Description for Product 6",
        "price": 10.99,
        "image": 'images/product6.jpg'
    },
    {
        "id": 7,
        "name": "Product 7",
        "description": "Description for Product 7",
        "price": 10.99,
        "image": 'images/product7.jpg'
    },
    {
        "id": 8,
        "name": "Product 8",
        "description": "Description for Product 8",
        "price": 10.99,
        "image": 'images/product8.jpg'
    },
    {
        "id": 9,
        "name": "Product 9",
        "description": "Description for Product 9",
        "price": 10.99,
        "image": 'images/product9.jpg'
    },
    {
        "id": 10,
        "name": "Product 10",
        "description": "Description for Product 10",
        "price": 10.99,
        "image": 'images/product10.jpg'
    }
]

# Signup a new user
@app.route('/login/signup', methods=['POST'])
def signup():
    newUserData = request.get_json()
    for user in users:
        if user['username'] == newUserData['username']:
            return jsonify({'message': 'User already exists!'}), 409
    users.append(newUserData)
    return jsonify({'message': 'User created successfully!'}), 201

# Login a user
@app.route('/login', methods=['POST']) # This should be get, no?
def login():
    userData = request.get_json()
    for user in users:
        if user['username'] == userData['username'] and user['password'] == userData['password']:
            return jsonify({'authenticated': True, 'message': 'User logged in successfully!'}), 200
    return jsonify({'authenticated': False, 'message': 'Username and/or password incorrect!'}), 401

# Get all products
@app.route('/products/info', methods=['GET'])
def get_products():
    return jsonify(products)

if __name__ == '__main__':
    app.run()