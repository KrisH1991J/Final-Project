"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Products, User_Has_Products, keepaAPI, Profit
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)

    username = body["username"]
    username_exists = User.query.filter_by(username=username)

    if username is None:
        raise APIException("The username you have selected is already taken", status_code=400)

    email = body["email"]
    email_exists = User.query.filter_by(email=email)

    if email_exists is None:
        raise APIException("That email already exists", status_code=400)

    new_user = User(username=username, first_name=body['first_name'], last_name=body['last_name'], email=email, password=body['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    user_id = new_user.id
    access_token = create_access_token(identity=user_id)
    return jsonify(access_token=access_token), 200

@api.route("/login", methods=["POST"])
def user_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        raise APIException("Bad email or password", status_code=400)

    #if the user exists, then create the new access token and return access token 
    user_id = user.id
    access_token = create_access_token(identity=user_id)
    return jsonify(access_token=access_token, user=user.serialize()), 200

@api.route("/login/fromsignup", methods=["POST"])
def user_login_from_signup():
    email = request.json.get("username", None)
    password = request.json.get("email", None)
    user = User.query.filter_by(username=username, email=email).first()

    if user is None:
        raise APIException("Bad email or username", status_code=400)

    #if the user exists, then create the new access token and return access token 
    user_id = user.id
    access_token = create_access_token(identity=user_id)
    return jsonify(access_token=access_token, user=user.serialize()), 200

@api.route("/user/delete/<int:user_id>", methods=["DELETE"])
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
    return jsonify(results=all_users), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user.serialize()), 200

@api.route('/products', methods=['GET'])
def get_products():
    product_query = Products.query.all()
    all_products = list(map(lambda x: x.serialize(), product_query))
    return jsonify(results=all_products), 200

@api.route("/products/delete/<int:product_id>", methods=["DELETE"])
def del_product(product_id):
    sel_product = Products.query.get(product_id)
    if sel_product is None:
        raise APIException("Product not found", status_code=404)
    db.session.delete(sel_product)
    db.session.commit()

    return jsonify("ok"), 200

@api.route('/products/make', methods=['POST'])
def make_product():
    body = request.get_json()

    product_upc = body["product_upc"]
    upc_exists = Products.query.filter_by(product_upc=product_upc)

    if product_upc is None:
        raise APIException("That upc code has already been used", status_code=400)

    new_product = Products(product_name=body['product_name'], product_cost=body['product_cost'], product_image=body['product_image'], product_upc=product_upc)
    db.session.add(new_product)
    db.session.commit()
    product_query = Products.query.all()
    all_products = list(map(lambda x: x.serialize(), product_query))
    return jsonify(results=all_products), 200

@api.route('/products/<int:products_id>', methods=['GET'])
def get_singleProduct(products_id):
    products = Products.query.get(products_id)
    return jsonify(products.serialize()), 200

@api.route('/userhasproducts', methods=['GET'])
def get_userhasproducts():
    userhasproducts_query = User_Has_Products.query.all()
    all_UHP = list(map(lambda x: x.serialize(), userhasproducts_query))
    return jsonify(results=all_UHP), 200

@api.route('/userhasproducts/make', methods=['POST'])
def make_userProduct():
    body = request.get_json()

    new_userProduct = User_Has_Products(user_id=body['user_id'], product_id=body['product_id'])
    db.session.add(new_userProduct)
    db.session.commit()
    userProducts_query = User_Has_Products.query.all()
    all_userProducts = list(map(lambda x: x.serialize(), userProducts_query))
    return jsonify(results=all_userProducts), 200

@api.route('/userhasproducts/<int:userhasproducts_id>', methods=['GET'])
def get_singleUHP(userhasproducts_id):
    singleUHP = User_Has_Products.query.get(userhasproducts_id)
    return jsonify(singleUHP.serialize()), 200

@api.route('/keepaapi', methods=['GET'])
def get_keepaAPI():
    keepaapi_query = keepaAPI.query.all()
    all_keepaapi = list(map(lambda x: x.serialize(), keepaapi_query))
    return jsonify(results=all_keepaapi), 200

@api.route('/keepaapi/<int:keepaapi_id>', methods=['GET'])
def get_singleAPI(keepaapi_id):
    singleKeepa = keepaAPI.query.get(keepaapi_id)
    return jsonify(singleKeepa.serialize()), 200

@api.route('/profit', methods=['GET'])
def get_profit():
    profit_query = Profit.query.all()
    all_profit = list(map(lambda x: x.serialize(), profit_query))
    return jsonify(results=all_profit), 200

@api.route('/profit/<int:profit_id>', methods=['GET'])
def get_singleProfit(profit_id):
    profit = Profit.query.get(profit_id)
    return jsonify(profit.serialize()), 200