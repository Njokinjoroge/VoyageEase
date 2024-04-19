from flask import Flask, jsonify, request, render_template, Blueprint
from flask_migrate import Migrate
from models import db, TravelPlan
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_app.db'
app.config['SQLALCHEMY_TRACK CHANGES'] = False

db.init_app(app)
migrate = Migrate(app, db)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('./firebase-cred.json')
firebase_admin.initialize_app(cred)

# Create a Flask Blueprint
bp = Blueprint('api', __name__, url_prefix='/api')


@app.route('/')
def index():
    try:
        # Fetch all travel plans from the database
        travel_plans = TravelPlan.query.all()
        # Render the HTML template and pass the travel plans to it
        return render_template('travel_plans.html', travel_plans=travel_plans)
    except Exception as e:
        # Handle any exceptions and return an error message
        return render_template('error.html', message=str(e))



# Route to render HTML template for viewing travel plans
@bp.route('/travel_plans', methods=['GET'])
def get_travel_plans():
    try:
        # Fetch all travel plans from the database
        travel_plans = TravelPlan.query.all()
        # Render the HTML template and pass the travel plans to it
        return render_template('travel_plans.html', travel_plans=travel_plans)
    except Exception as e:
        # Pass the error message to the error template
        return render_template('error.html', error_message=str(e))


# Route to get all travel plans via API
@bp.route('/travel_plans/api', methods=['GET'])
def get_travel_plans_api():
    plans = TravelPlan.query.all()
    return jsonify([plan.__dict__ for plan in plans])


# Route to get a specific travel plan by ID
@bp.route('/travel_plans/<int:plan_id>', methods=['GET'])
def get_travel_plan(plan_id):
    plan = TravelPlan.query.get(plan_id)
    if plan:
        return jsonify(plan.__dict__)
    return jsonify({'message': 'Travel plan not found'}), 404


# Route to create a new travel plan
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


# Route to update an existing travel plan
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


# Route to delete a travel plan
@bp.route('/travel_plans/<int:plan_id>', methods=['DELETE'])
def delete_travel_plan(plan_id):
    plan = TravelPlan.query.get(plan_id)
    if not plan:
        return jsonify({'message': 'Travel plan not found'}), 404

    db.session.delete(plan)
    db.session.commit()

    return jsonify({'message': 'Travel plan deleted successfully'})

# Profile management routes
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

@app.route('/profile', methods=['PUT'])
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

if __name__ == '__main__':
    with app.app_context():
      db.create_all()
    
    app.run(port=5000, debug=True)