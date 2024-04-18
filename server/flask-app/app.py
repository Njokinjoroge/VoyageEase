from flask import Flask, render_template, url_for, flash, redirect
from flask_migrate import Migrate
from flask_cors import CORS
from forms import RegistrationForm, LoginForm
from models import db, Destination

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_app.db'
app.config['SQLALCHEMY_TRACK CHANGES'] = False
app.config['SECRET_KEY'] = 'sisiniwanoma'

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)


@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html', destinations=Destination.query.all() )


@app.route("/about")
def about():
    return render_template('about.html', title='About')


@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == 'admin@blog.com' and form.password.data == 'password':
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html', title='Login', form=form)


if __name__ == '__main__':
    with app.app_context():
      db.create_all()
    
    app.run(port=5000, debug=True)