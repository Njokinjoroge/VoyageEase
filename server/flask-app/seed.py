from app import app, db
from models import Traveler, Destination, Activity, TravelPlan

# Create database tables if they do not exist
with app.app_context():
    db.create_all()

    # Clear existing data in tables
    db.session.query(Activity).delete()
    db.session.query(TravelPlan).delete()
    db.session.query(Destination).delete()
    db.session.query(Traveler).delete()

    # Add travelers to the database
    traveler_1 = Traveler(username='John Doe', email='johndoe@123.com', password='passmeaword')
    traveler_2 = Traveler(username='Jane Doe', email='janedoe@123.com', password='unhandmefiend')
    traveler_3 = Traveler(username='Gray Joe', email='grayjoe@123.com', password='lockinbruh')
    traveler_4 = Traveler(username='Ryan Reynolds', email='ryanreynolds@123.com', password='deadpoolisntreal')

    db.session.add_all([traveler_1, traveler_2, traveler_3, traveler_4])
    db.session.commit()


    destination_1 = Destination(
        name='Eiffel Tower',
        location='France',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='EUR'
    )

    destination_2 = Destination(
        name='Statue of Liberty',
        location='USA',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='USD'
    )

    destination_3 = Destination(
        name='Tokyo Tower',
        location='Japan',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='JPY'
    )

    destination_4 = Destination(
        name='Colosseum',
        location='Italy',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='EUR'
    )

    destination_5 = Destination(
        name='Big Ben',
        location='England',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='GBP'
    )

    destination_6 = Destination(
        name='Sydney Opera House',
        location='Australia',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='AUD'
    )

    destination_7 = Destination(
        name='Sagrada Família',
        location='Spain',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='EUR'
    )

    destination_8 = Destination(
        name='Great Wall of China',
        location='China',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='CNY'
    )

    destination_9 = Destination(
        name='Taj Mahal',
        location='India',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='INR'
    )

    destination_10 = Destination(
        name='Christ the Redeemer',
        location='Brazil',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='BRL'
    )

    destination_11 = Destination(
        name='Pyramids of Giza',
        location='Egypt',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='EGP'
    )

    destination_12 = Destination(
        name='Neuschwanstein Castle',
        location='Germany',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='EUR'
    )

    destination_13 = Destination(
        name="Saint Basil's Cathedral",
        location='Russia',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='RUB'
    )

    destination_14 = Destination(
        name='Maasai Mara National Reserve',
        location='Kenya',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='KES'
    )

    destination_15 = Destination(
        name='Kruger National Park',
        location='South Africa',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='ZAR'
    )

    destination_16 = Destination(
        name='Marrakech Medina',
        location='Morocco',
        image='https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        currency='MAD'
    )

    # Add destinations to the database session and commit
    destinations = [destination_1, destination_2, destination_3, destination_4, destination_5, destination_6,
                    destination_7, destination_8, destination_9, destination_10, destination_11, destination_12,
                    destination_13, destination_14, destination_15, destination_16]
    db.session.add_all(destinations)
    db.session.commit()

    # Define activities for each destination
    destination_1_activities = [
        Activity(name='Guided Tour', cost=50, destination_id=destination_1.id),
        Activity(name='Picnic at Champ de Mars', cost=20, destination_id=destination_1.id),
        Activity(name='Seine River Cruise', cost=30, destination_id=destination_1.id)
    ]

    destination_2_activities = [
        Activity(name='Statue of Liberty Tour', cost=25, destination_id=destination_2.id),
        Activity(name='Ellis Island Museum Visit', cost=30, destination_id=destination_2.id),
        Activity(name='Helicopter Tour of NYC', cost=200, destination_id=destination_2.id)
    ]

    destination_3_activities = [
        Activity(name='Tokyo Tower Observation Deck', cost=25, destination_id=destination_3.id),
        Activity(name='Shinjuku Gyoen National Garden Visit', cost=10, destination_id=destination_3.id),
        Activity(name='Akihabara Anime Shopping', cost=50, destination_id=destination_3.id)
    ]

    destination_4_activities = [
        Activity(name='Colosseum Guided Tour', cost=30, destination_id=destination_4.id),
        Activity(name='Roman Forum Visit', cost=20, destination_id=destination_4.id),
        Activity(name='Trevi Fountain Throw a Coin', cost=5, destination_id=destination_4.id)
    ]

    destination_5_activities = [
        Activity(name='Big Ben Clock Tower Tour', cost=20, destination_id=destination_5.id),
        Activity(name='London Eye Ride', cost=30, destination_id=destination_5.id),
        Activity(name='River Thames Cruise', cost=15, destination_id=destination_5.id)
    ]

    destination_6_activities = [
        Activity(name='Sydney Opera House Guided Tour', cost=40, destination_id=destination_6.id),
        Activity(name='Bondi Beach Surfing Lesson', cost=50, destination_id=destination_6.id),
        Activity(name='Sydney Harbour Bridge Climb', cost=100, destination_id=destination_6.id)
    ]

    destination_7_activities = [
        Activity(name='Sagrada Família Basilica Guided Tour', cost=35, destination_id=destination_7.id),
        Activity(name='Park Güell Visit', cost=15, destination_id=destination_7.id),
        Activity(name='Barcelona Tapas Tour', cost=30, destination_id=destination_7.id)
    ]

    destination_8_activities = [
        Activity(name='Great Wall Hiking Tour', cost=50, destination_id=destination_8.id),
        Activity(name='Forbidden City Visit', cost=40, destination_id=destination_8.id),
        Activity(name='Beijing Duck Dinner', cost=20, destination_id=destination_8.id)
    ]

    destination_9_activities = [
        Activity(name='Taj Mahal Guided Tour', cost=30, destination_id=destination_9.id),
        Activity(name='Agra Fort Visit', cost=15, destination_id=destination_9.id),
        Activity(name='Boat Ride on Yamuna River', cost=10, destination_id=destination_9.id)
    ]

    destination_10_activities = [
        Activity(name='Christ the Redeemer Statue Visit', cost=20, destination_id=destination_10.id),
        Activity(name='Sugarloaf Mountain Cable Car Ride', cost=25, destination_id=destination_10.id),
        Activity(name='Rio de Janeiro Beach Day', cost=10, destination_id=destination_10.id)
    ]

    destination_11_activities = [
        Activity(name='Pyramids of Giza Guided Tour', cost=40, destination_id=destination_11.id),
        Activity(name='Sphinx Viewing', cost=20, destination_id=destination_11.id),
        Activity(name='Camel Ride in the Desert', cost=30, destination_id=destination_11.id)
    ]

    destination_12_activities = [
        Activity(name='Neuschwanstein Castle Guided Tour', cost=25, destination_id=destination_12.id),
        Activity(name='Bavarian Alps Hiking', cost=20, destination_id=destination_12.id),
        Activity(name='Linderhof Palace Visit', cost=15, destination_id=destination_12.id)
    ]

    destination_13_activities = [
        Activity(name="Saint Basil's Cathedral Visit", cost=15, destination_id=destination_13.id),
        Activity(name='Kremlin and Red Square Tour', cost=30, destination_id=destination_13.id),
        Activity(name='Moscow Metro Tour', cost=10, destination_id=destination_13.id)
    ]

    destination_14_activities = [
        Activity(name='Maasai Mara Safari Tour', cost=100, destination_id=destination_14.id),
        Activity(name='Hot Air Balloon Safari', cost=200, destination_id=destination_14.id),
        Activity(name='Maasai Village Cultural Experience', cost=50, destination_id=destination_14.id)
    ]

    destination_15_activities = [
        Activity(name='Kruger National Park Safari', cost=80, destination_id=destination_15.id),
        Activity(name='Panorama Route Tour', cost=40, destination_id=destination_15.id),
        Activity(name='Elephant Interaction Experience', cost=60, destination_id=destination_15.id)
    ]

    destination_16_activities = [
        Activity(name='Marrakech Medina Walking Tour', cost=20, destination_id=destination_16.id),
        Activity(name='Atlas Mountains Day Trip', cost=50, destination_id=destination_16.id),
        Activity(name='Traditional Moroccan Cooking Class', cost=30, destination_id=destination_16.id)
    ]

    # Add activities to the database session and commit
    activities = [destination_1_activities, destination_2_activities, destination_3_activities,
                destination_4_activities, destination_5_activities, destination_6_activities,
                destination_7_activities, destination_8_activities, destination_9_activities,
                destination_10_activities, destination_11_activities, destination_12_activities,
                destination_13_activities, destination_14_activities, destination_15_activities,
                destination_16_activities]

    for activity_list in activities:
        db.session.add_all(activity_list)
    db.session.commit()