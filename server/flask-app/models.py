from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Traveler(db.Model):
    pass

class Trip_Data(db.Model):
    pass

class Destination(db.Model):
    pass

class Activity(db.Model):
    pass