from flask import Flask, jsonify, request, render_template, Blueprint,make_response,session
from flask_migrate import Migrate
from models import db, TravelPlan, Traveler, Destination, Activity
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_session import Session
from flask_login import LoginManager, login_user, logout_user, login_required
from datetime import datetime



app = Flask(__name__)
api = Api(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})



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

    if user:
        if user.password != password:
            return jsonify({'error': 'Password or email not correct'}),401
        
        elif user.password == password:
            # login_user(user)
            return jsonify({'user_id': user.id, 'username' : user.username}), 200
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
    
class TravelPlanner(Resource):

    def post(self):
        data = request.json
        print(data)

        destination = data.get('destination')
        activity = data.get('activity')
        startDate = datetime.strptime(data.get('startDate'), "%Y-%m-%d")
        endDate = datetime.strptime(data.get('endDate'), "%Y-%m-%d")
        traveler_id = data.get('user_id')

        new_travel_plan = TravelPlan(destination=destination, activity=activity, start_date=startDate, end_date=endDate, traveler_id=traveler_id)
        db.session.add(new_travel_plan)
        db.session.commit()

        return {'message' : 'Successfully created travel plan!'}, 201
    

api.add_resource(DestinationData, '/destinations')
api.add_resource(ActivityData, '/activities/' ,'/activities/<int:id>')
api.add_resource(TravelPlanner, '/travelplan')





# -------------------------------------travel plan routes---------------------------------------------

# @bp.route('/travel_plans', methods=['GET'])
# def get_travel_plans():
#     try:
#         travel_plans = TravelPlan.query.all()
#         return render_template('travel_plans.html', travel_plans=travel_plans)
#     except Exception as e:
#         return render_template('error.html', error_message=str(e))

# @bp.route('/travel_plans/api', methods=['GET'])
# def get_travel_plans_api():
#     plans = TravelPlan.query.all()
#     return jsonify([plan.__dict__ for plan in plans])

# @bp.route('/travel_plans/<int:plan_id>', methods=['GET'])
# def get_travel_plan(plan_id):
#     plan = TravelPlan.query.get(plan_id)
#     if plan:
#         return jsonify(plan.__dict__)
#     return jsonify({'message': 'Travel plan not found'}), 404

# @bp.route('/travel_plans', methods=['POST'])
# def create_travel_plan():
#     data = request.json
#     destination = data.get('destination')
#     date = data.get('date')
#     description = data.get('description')

#     if not destination or not date:
#         return jsonify({'message': 'Destination and date are required'}), 400

#     new_plan = TravelPlan(destination=destination, date=date, description=description)
#     db.session.add(new_plan)
#     db.session.commit()

#     return jsonify({'message': 'Travel plan created successfully'}), 201

# @bp.route('/travel_plans/<int:plan_id>', methods=['PUT'])
# def update_travel_plan(plan_id):
#     plan = TravelPlan.query.get(plan_id)
#     if not plan:
#         return jsonify({'message': 'Travel plan not found'}), 404

#     data = request.json
#     plan.destination = data.get('destination', plan.destination)
#     plan.date = data.get('date', plan.date)
#     plan.description = data.get('description', plan.description)
#     db.session.commit()

#     return jsonify({'message': 'Travel plan updated successfully'})

# @bp.route('/travel_plans/<int:plan_id>', methods=['DELETE'])
# def delete_travel_plan(plan_id):
#     plan = TravelPlan.query.get(plan_id)
#     if not plan:
#         return jsonify({'message': 'Travel plan not found'}), 404

#     db.session.delete(plan)
#     db.session.commit()

#     return jsonify({'message': 'Travel plan deleted successfully'})


# ---------------------------profile routes---------------------------------------------



if __name__ == '__main__':
    with app.app_context():
      db.create_all()
    
    app.run(port=5000, debug=True)

