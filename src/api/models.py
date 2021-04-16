from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
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
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(120), nullable=False)
    product_cost = db.Column(db.Integer)
    product_image = db.Column(db.String(250))
    product_upc = db.Column(db.Integer)

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
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    product_id = db.Column(db.Integer, ForeignKey('products.id'))
    user = db.relationship(User)
    products = db.relationship(Products)

class keepaAPI(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_upc = db.Column(db.Integer, ForeignKey('products.product_upc'))
    fba_fee = db.Column(db.Integer)
    amazon_price = db.Column(db.Integer)
    products = db.relationship(Products)

class Profit(db.Model):
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    product_id = db.Column(db.Integer, ForeignKey('products.id'))
    product_cost = db.Column(db.Integer, ForeignKey('products.product_cost'))
    fba_fee = db.Column(db.Integer, ForeignKey('keepaAPI.fba_fee'))
    amazon_price = db.Column(db.Integer, ForeignKey('keepaAPI.amazon_price'))
    user = db.relationship(User)
    products = db.relationship(Products)
    keepaAPI = db.relationship(keepaAPI)