from flask_sqlalchemy import SQLAlchemy
import sys
import os
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import ForeignKeyConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

db = SQLAlchemy()

class User(db.Model):
    _tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

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
    product_cost = db.Column(db.String(10), nullable=False)
    product_image = db.Column(db.String(250))
    product_upc = db.Column(db.String(12), unique=True, nullable=False)

    def __repr__(self):
        return '<Products %r>' % self.product_name

    def serialize(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "product_cost": self.product_cost,
            "product_image": self.product_image,
            "product_upc": self.product_upc,
            # do not serialize the password, its a security breach
        }
        
class User_Has_Products(db.Model):
    __tablename__ = 'userhasproducts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    user = db.relationship(User)
    product = db.relationship(Products)

    def __repr__(self):
        return '<User_Has_Products %r>' % self.user_id

    def serialize(self):
        return {
            "id": self.id,
            "user" : self.user.serialize(),
            "product" : self.product.serialize()
            # do not serialize the password, its a security breach
        }

class keepaAPI(db.Model):
    __tablename__ = 'keepaapi'
    id = db.Column(db.Integer, primary_key=True)
    product_upc = db.Column(db.String(12), db.ForeignKey('products.product_upc'))
    fba_fee = db.Column(db.String(10), nullable=False)
    amazon_price = db.Column(db.String(10), nullable=False)
    products = db.relationship(Products)

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

class Profit(db.Model):
    __tablename__ = 'profit'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    keepaAPI_id = db.Column(db.Integer, db.ForeignKey('keepaapi.id'))
    product_cost = db.Column(db.String(10), nullable=False)
    fba_fee = db.Column(db.String(10), nullable=False)
    amazon_price = db.Column(db.String(10), nullable=False)
    user = db.relationship(User)
    products = db.relationship(Products)
    keepaapi = db.relationship(keepaAPI)

    def __repr__(self):
        return '<Profit %r>' % self.user_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id" : self.user_id,
            "product_id" : self.product_id,
            "keepaAPI_id" : self.keepaAPI_id,
            "product_cost": self.product_cost,
            "fba_fee": self.fba_fee,
            "amazon_price": self.amazon_price,
            # do not serialize the password, its a security breach
        }