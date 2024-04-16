from flask import Flask, make_response, jsonify
from flask_migrate import Migrate
from models import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABAASE_URI'] = 'sqlite:///travel_app.db'
app.config['SQLALCHEMY_TRACK CHANGES'] = False

db.init_app(app)
migrate = Migrate(app, db)



if __name__ == '__main__':
    with app.app_context():
      db.create_all()
    
    app.run(port=5000, debug=True)