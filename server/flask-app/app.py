from flask import Flask, jsonify, request, render_template, Blueprint,make_response,session
from flask_migrate import Migrate
from models import db, TravelPlan,Traveler, Destination, Activity
from flask_cors import CORS
# import firebase_admin
# from firebase_admin import credentials, auth
from flask_restful import Api, Resource
from flask_session import Session
from flask_login import LoginManager, login_user, logout_user, login_required



app = Flask(__name__)
api = Api(app)
CORS(app)



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_NAME'] = 'travel_cookie'
app.config['SECRET_KEY'] = 'group_5 '

db.init_app(app)
migrate = Migrate(app, db)
bp = Blueprint('api', __name__, url_prefix='/api')

Session(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'


# setup login manager
@login_manager.user_loader
def load_user(user_id):
    return Traveler.query.get(int(user_id))


@app.route('/login', methods=['POST'])
def post():
    email = request.json.get('email')
    password = request.json.get('password')

    user = Traveler.query.filter_by(email = email).first()

    # session['user_id'] = user.id
    if user:
        if user.password != password:
            return jsonify({'error': 'Password or email not correct'}),401
        elif user.password == password:
            login_user(user)
            return {'message' : 'Login successful'}, 200
    else:
        return jsonify({'Error': 'User not found'}), 404


@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    username= request.json.get('name')
    password = request.json.get('password')

    # check user exist
    user = Traveler.query.filter_by(email=email).first()
    if user:
        return jsonify({'Error': 'User already exist'}), 409
    
    # create new user
    new_user = Traveler(username= username, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User Registered Successfully'}), 201


class DestinationData(Resource):


    def get(self):
        destination_list= []

        all_destinations = Destination.query.all()

        for destination in all_destinations:
            destination_dict = {
                'id': destination.id,
                'name': destination.name,
                'location': destination.location,
                'image': destination.image,
                'currency': destination.currency
            }
            destination_list.append(destination_dict)

        return make_response(destination_list, 200)


class ActivityData(Resource):

    def get(self, id=None):
        activities_list = []

        if id is None:
            destination_activities = Activity.query.all()
        else:
            destination_activities = Activity.query.filter_by(destination_id=id).all()

        for activity in destination_activities:
            activity_dict ={
                'id' : activity.id,
                'name' : activity.name,
                'cost' : activity.cost
            }
            activities_list.append(activity_dict)

        return make_response(activities_list, 200)
    

api.add_resource(DestinationData, '/destinations')
api.add_resource(ActivityData, '/activities/' ,'/activities/<int:id>')




# class TravelerResource(Resource):

#     def get(self, id=None):
#         if id:
#             user = Traveler.query.get(id)
#             if not user:
#                 return {'error': 'Traveler not found.'}, 404
#             return make_response(jsonify(user.to_dict())), 200
#         else:
#             users = Traveler.query.all()
#             if not users:
#                 return {'error': 'There are no users to display.'}, 400
#             return make_response(jsonify([u.to_dict() for u in users]), 200)
        

#     def post(self):
#         data = request.get_json()
#         new_user = Traveler(
#             username = data['name'],
#             email = data['email'],
#             password=data['password']
#         )    

#         db.session.add(new_user)
#         db.session.commit()
#         return {'success': 'Traveler created successfully'}, 201
    
#     def patch(self, id):
#         user = Traveler.query.filter_by(id=id).first()
#         if not user:
#             return {'error': 'Traveler not found.'}, 404
#         data = request.json
#         for attr in request.form():
#             setattr(user, attr, request.form['attr'])
#         db.session.commit()
#         return {'success': 'Customer updated successfully.'}, 200
    
#     def delete(self, id):
#         user = Traveler.query.get(id)
#         if not user:
#             return {'error': 'Traveler not found.'}, 404
#         db.session.delete(user)
#         db.session.commit()
#         return {}, 204
    
# class CheckSession(Resource):
#     def get(self):
#         user = Traveler.query.filter(Traveler.id == session.get('user_id')).first()
#         if user:
#             return user.to_dict()
#         else:
#             return {}, 401
        
# api.add_resource(TravelerResource, '/travelers', '/travelers/<int:id>')
# api.add_resource(CheckSession, '/check_session')
    


# def index():
#     try:
#         # Fetch all travel plans from the database
#         travel_plans = TravelPlan.query.all()
#         # Render the HTML template and pass the travel plans to it
#         return render_template('travel_plans.html', travel_plans=travel_plans)
#     except Exception as e:
#         # Handle any exceptions and return an error message
#         return render_template('error.html', message=str(e))

# def index():
#     try:
#         travel_plans = TravelPlan.query.all()
#         return render_template('travel_plans.html', travel_plans=travel_plans)
#     except Exception as e:
#         return render_template('error.html', message=str(e))


# -------------------------------------travel plan routes---------------------------------------------

@bp.route('/travel_plans', methods=['GET'])
def get_travel_plans():
    try:
        travel_plans = TravelPlan.query.all()
        return render_template('travel_plans.html', travel_plans=travel_plans)
    except Exception as e:
        return render_template('error.html', error_message=str(e))

@bp.route('/travel_plans/api', methods=['GET'])
def get_travel_plans_api():
    plans = TravelPlan.query.all()
    return jsonify([plan.__dict__ for plan in plans])

@bp.route('/travel_plans/<int:plan_id>', methods=['GET'])
def get_travel_plan(plan_id):
    plan = TravelPlan.query.get(plan_id)
    if plan:
        return jsonify(plan.__dict__)
    return jsonify({'message': 'Travel plan not found'}), 404

@bp.route('/travel_plans', methods=['POST'])
def create_travel_plan():
    data = request.json
    destination = data.get('destination')
    date = data.get('date')
    description = data.get('description')

    if not destination or not date:
        return jsonify({'message': 'Destination and date are required'}), 400

    new_plan = TravelPlan(destination=destination, date=date, description=description)
    db.session.add(new_plan)
    db.session.commit()

    return jsonify({'message': 'Travel plan created successfully'}), 201

@bp.route('/travel_plans/<int:plan_id>', methods=['PUT'])
def update_travel_plan(plan_id):
    plan = TravelPlan.query.get(plan_id)
    if not plan:
        return jsonify({'message': 'Travel plan not found'}), 404

    data = request.json
    plan.destination = data.get('destination', plan.destination)
    plan.date = data.get('date', plan.date)
    plan.description = data.get('description', plan.description)
    db.session.commit()

    return jsonify({'message': 'Travel plan updated successfully'})

@bp.route('/travel_plans/<int:plan_id>', methods=['DELETE'])
def delete_travel_plan(plan_id):
    plan = TravelPlan.query.get(plan_id)
    if not plan:
        return jsonify({'message': 'Travel plan not found'}), 404

    db.session.delete(plan)
    db.session.commit()

    return jsonify({'message': 'Travel plan deleted successfully'})


# ---------------------------profile routes---------------------------------------------

@app.route('/profile', methods=['GET'])
def get_profile():
    try:
        user = auth.get_user(request.headers.get('Authorization'))
        profile_data = {
            'email': user.email,
            'displayName': user.display_name,
            'photoURL': user.photo_url
        }
        return jsonify(profile_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/profile', methods=['POST'])
def update_profile():
    try:
        user = auth.get_user(request.headers.get('Authorization'))
        new_display_name = request.json.get('displayName')
        auth.update_user(user.uid, display_name=new_display_name)
        return jsonify({'message': 'Profile updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/profile', methods=['DELETE'])
def delete_profile():
    try:
        user = auth.get_user(request.headers.get('Authorization'))
        auth.delete_user(user.uid)
        return jsonify({'message': 'Profile deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

    # Add route to your Flask app
@app.route('/api/travel_plans', methods=['POST'])
def add_travel_plan():
    data = request.json  # Assuming you're sending JSON data
    # Extract data from JSON
    country = data.get('country')
    destination = data.get('destination')
    activity = data.get('activity')
    start_date = data.get('startDate')
    adults = data.get('adults')
    children = data.get('children')
    
    # Assuming you have a TravelPlan model
    new_plan = TravelPlan(
        country=country,
        destination=destination,
        activity=activity,
        start_date=start_date,
        adults=adults,
        children=children
    )
    
    db.session.add(new_plan)
    db.session.commit()
    
    return jsonify({'message': 'Travel plan recorded successfully'}), 201




if __name__ == '__main__':
    with app.app_context():
      db.create_all()
    
    app.run(port=5000, debug=True)

