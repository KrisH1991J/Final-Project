"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Products, User_Has_Products, keepaAPI
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)

    user_name = body["user_name"]
    user_name_exists = User.query.filter_by(user_name=user_name)

    if user_name is not None:
        raise APIException("The username you have selected is already taken", status_code=400)

    email = body["email"]
    email_exists = User.query.filter_by(email=email)

    if email_exists is not None:
        raise APIException("That email already exists", status_code=400)

    new_user = User(username=body["username"], first_name=body["first_name"], last_name=body["last_name"], email=body['email'], password=body['password'])
    db.session.add(new_user)
    db.session.commit()
    user_id = new_user.id
    access_token = create_access_token(identity=user_id)
    return jsonify(access_token=access_token), 200

@api.route("/login", methods=["POST"])
def user_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first

    if user is None:
        raise APIException("Bad email or password", status_code=400)

    user_id = user.id
    access_token = create_access_token(identity=user_id)
    return jsonify(access_token=access_token), 200

@api.route("/user/<int:user_id>", methods=["DELETE"])
def del_user(user_id):
    sel_user = User.query.get(user_id)
    if sel_user is None:
        raise APIException("User not found", status_code=404)
    db.session.delete(sel_user)
    db.session.commit()

    return jsonify("ok"), 200

@api.route('/user', methods=['GET'])
def get_users():
    user_query = User.query.all()
    all_users = list(map(lambda x: x.serialize(), user_query))
    return jsonify(all_users), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(id)
    return jsonify(user.serialize()), 200
