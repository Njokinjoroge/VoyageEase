from .app import db

class TravelPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
from datetime import datetime
from . import db

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

    # Add more search methods as needed
