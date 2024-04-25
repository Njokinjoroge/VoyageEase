from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os

# Initialize app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and marshmallow
db = SQLAlchemy(app)
ma = SQLAlchemyAutoSchema()

# Initialize CORS
CORS(app)

# Define allowed_file function
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False)
    email = db.Column(db.String(100), unique=True)
    profile_picture = db.Column(db.String(200))
    bio = db.Column(db.String(200))

    def __init__(self, name, email, profile_picture, bio):
        self.name = name
        self.email = email
        self.profile_picture = profile_picture
        self.bio = bio

# User Schema
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

# Initialize schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Create a user
@app.route('/api/profile', methods=['POST'])
def add_user():
    data = request.get_json()
    if not data or not all(key in data for key in ['name', 'email', 'profile_picture', 'bio']):
        return jsonify({'message': 'Missing required fields'}), 400

    name = data['name']
    email = data['email']
    profile_picture = data['profile_picture']
    bio = data['bio']

    new_user = User(name=name, email=email, profile_picture=profile_picture, bio=bio)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user), 201

# Get all users
@app.route('/api/profile', methods=['GET'])
def get_users():
    users = User.query.all()
    return users_schema.jsonify(users)

# Get a single user
@app.route('/api/profile/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    return user_schema.jsonify(user)

# Update a user
@app.route('/api/profile/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    if not data or not all(key in data for key in ['name', 'email', 'profile_picture', 'bio']):
        return jsonify({'message': 'Missing required fields'}), 400

    user.name = data['name']
    user.email = data['email']
    user.profile_picture = data['profile_picture']
    user.bio = data['bio']

    db.session.commit()
    return user_schema.jsonify(user)

# Delete a user
@app.route('/api/profile/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted'}), 200

# Handle 404 errors
@app.errorhandler(404)
def not_found(error):
    return jsonify({'message': 'Resource not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)