from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_plans.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the app
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import your models here
from .models import TravelPlan

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

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)
