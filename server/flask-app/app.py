from flask import Flask, jsonify, request, render_template, make_response
from flask_migrate import Migrate
from models import db, TravelPlan, Traveler, Destination, Activity
from flask_cors import CORS
from flask_restful import Api, Resource
from datetime import datetime
import os


# from dotenv import load_dotenv
# load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)


# @app.errorhandler(404)
# def not_found(e):
#     return render_template("index.html")

api = Api(app)



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_app.db'
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'


db.init_app(app)
migrate = Migrate(app, db)

CORS(app, supports_credentials=True, origins='*')


@app.route('/api/login', methods=['POST'])
def post():
    email = request.json.get('email')
    password = request.json.get('password')

    user = Traveler.query.filter_by(email = email).first()

    if user:
        if user.password != password:
            return jsonify({'error': 'Password or email not correct'}),401
        
        elif user.password == password:
            return jsonify({'user_id': user.id, 'username' : user.username}), 200
    else:
        return jsonify({'Error': 'User not found'}), 404


@app.route('/api/register/', methods=['POST'])
def register():
    data = request.json

    email = data.get('email')
    username= data.get('name')
    password = data.get('password')

    print(data)
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

    def get(self,id): 
        
        travel_plans = TravelPlan.query.filter_by(traveler_id=id).all()

        response_arr =[]

        for plan in travel_plans:
            response_dict={
                'destination' : plan.destination,
                'activity' : plan.activity,
                'start_date' : plan.start_date,
                'end_date' : plan.end_date,
                'description' : plan.description,
            }
            response_arr.append(response_dict)

        return make_response(response_arr, 200)

    

    def patch(self, id):
        data = request.json

        travelplan= TravelPlan.query.filter_by(
                    traveler_id =id,
                    destination = data.get('destination'),
                    ).first()

        print(travelplan)

        travelplan.destination = data.get('destination', travelplan.destination)
        travelplan.activity = data.get('activity', travelplan.activity)
        travelplan.start_date = datetime.strptime(data.get('startDate'), "%Y-%m-%d") if data.get('startDate') != '' else travelplan.start_date
        travelplan.end_date = datetime.strptime(data.get('endDate'), "%Y-%m-%d") if data.get('endDate') != '' else travelplan.end_date
        travelplan.description = data.get('description', travelplan.description)
        travelplan.traveler_id = travelplan.traveler_id
        db.session.commit()

        response = {'message': 'travel plan updated successfully!'}
        return make_response(response, 200)    
    
    
    def delete(self, id):
        data = request.json

        travelplan= TravelPlan.query.filter_by(
                        traveler_id =id,
                        destination = data.get('destination'),
                        activity = data.get('activity')
                        ).first()
        
        print(data)

        if not travelplan:
            return {'message' : 'Travel plan not found'}, 404
        
        db.session.delete(travelplan)
        db.session.commit()

        response = {'message': 'travelplan deleted successfully!'}
        return make_response(response, 200)


class PostTravel(Resource):
    def post(self):
        data = request.json
        print(data)

        destination = data.get('destination')
        activity = data.get('activity')
        startDate = datetime.strptime(data.get('startDate'), "%Y-%m-%d")
        endDate = datetime.strptime(data.get('endDate'), "%Y-%m-%d")
        traveler_id = data.get('user_id')

        if not data:
            return {'Error' : 'Data provided is not valid'}, 400
        
        if data:
            new_travel_plan = TravelPlan(destination=destination, activity=activity, start_date=startDate, end_date=endDate, traveler_id=traveler_id)
            db.session.add(new_travel_plan)
            db.session.commit()

        response = {'message': 'travel plan created successfully!'}
        return make_response(response, 201)   


api.add_resource(DestinationData, '/api/destinations')
api.add_resource(ActivityData, '/api/activities/' ,'/api/activities/<int:id>')
api.add_resource(TravelPlanner, '/api/travelplan/<int:id>/')
api.add_resource(PostTravel, '/api/travelplan/')



if __name__ == '__main__':
    with app.app_context():
      db.create_all()
    
    app.run(port=5000, debug=True)

