from flask import Flask, jsonify, request, render_template, Blueprint
from .models import db, TravelPlan

# Create a Flask Blueprint
bp = Blueprint('api', __name__, url_prefix='/api')

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

# Create Flask app and register the Blueprint
app = Flask(__name__)
app.register_blueprint(bp)

if __name__ == '__main__':
    app.run(debug=True)
