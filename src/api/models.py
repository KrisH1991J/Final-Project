from flask_sqlalchemy import SQLAlchemy
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

db = SQLAlchemy()

class User(db.Model):
    _tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    user_user_has_products = db.relationship('User_Has_Products', backref='u_uhp')

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # do not serialize the password, its a security breach
        }

class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(120), nullable=False)
    product_cost = db.Column(db.Integer, nullable=False)
    product_image = db.Column(db.String(250))
    product_upc = db.Column(db.Integer, unique=True, nullable=False)
    keepaAPI = db.relationship('keepaAPI', backref='keepaapi')
    products_user_has_products = db.relationship('User_Has_Products', backref='p_uhp')

    def __repr__(self):
        return '<Products %r>' % self.product_name

    def serialize(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "product_cost": self.product_cost,
            "product_upc": self.product_upc,
            # do not serialize the password, its a security breach
        }
        
class User_Has_Products(db.Model):
    __tablename__ = 'userhasproducts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    user = db.relationship("User")
    products = db.relationship("Products")

class keepaAPI(db.Model):
    __tablename__ = 'keepaapi'
    id = db.Column(db.Integer, primary_key=True)
    product_upc = db.Column(db.Integer, db.ForeignKey('products.product_upc'))
    fba_fee = db.Column(db.Integer, unique=True, nullable=False)
    amazon_price = db.Column(db.Integer, unique=True, nullable=False)
    products = db.relationship("Products")

    def __repr__(self):
        return '<keepAPI %r>' % self.product_upc

    def serialize(self):
        return {
            "id": self.id,
            "product_upc": self.product_upc,
            "fba_fee": self.fba_fee,
            "amazon_price": self.amazon_price,
            # do not serialize the password, its a security breach
        }

# class Profit(db.Model):
#     __tablename__ = 'profit'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
#     product_cost = db.Column(db.Integer, db.ForeignKey('products.product_cost'))
#     fba_fee = db.Column(db.Integer, db.ForeignKey('keepaAPI.fba_fee'))
#     amazon_price = db.Column(db.Integer, db.ForeignKey('keepaAPI.amazon_price'))
#     keepaAPI = db.relationship('keepaAPI', backref='keepaapi')
#     products = db.relationship('Products', backref='products')