from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Traveler(db.Model):
    _tablename_ = 'travelers'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # Relationships
    trip_data = db.relationship('TripData', backref='traveler', cascade='all')

class Destination(db.Model):
    _tablename_ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    currency = db.Column(db.String, nullable=False)

    # Relationships
    trips = db.relationship('TripData', backref='destination')
    activities = db.relationship('Activity', backref='destination')

class TripData(db.Model):
    _tablename_ = 'trip_data'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.String, nullable=False)
    end_date = db.Column(db.String, nullable=False)

    # Foreign Keys
    traveler_id = db.Column(db.Integer, db.ForeignKey('traveler.id'), nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey('destination.id'), nullable=False)

class Activity(db.Model):
    _tablename_ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    cost = db.Column(db.Integer, nullable=False)

    # Foreign Keys
    destination_id = db.Column(db.Integer, db.ForeignKey('destination.id'), nullable=False)