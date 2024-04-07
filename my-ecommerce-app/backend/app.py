from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Signup a new user
@app.route('/login/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    return jsonify({'message': 'User created successfully!'})