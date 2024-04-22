from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Traveler(db.Model):
    __tablename__ = 'travelers'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

class Destination(db.Model):
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    currency = db.Column(db.String, nullable=False)

    activities = db.relationship('Activity', backref='destination')


class Activity(db.Model):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    cost = db.Column(db.Integer, nullable=False)

    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'), nullable=False)

class TravelPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.Text)

    @classmethod
    def search_by_destination(cls, destination):
        return cls.query.filter(cls.destination.ilike(f'%{destination}%')).all()

    @classmethod
    def search_by_date(cls, date):
        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
            return cls.query.filter(cls.date == date_obj).all()
        except ValueError:
            return []
