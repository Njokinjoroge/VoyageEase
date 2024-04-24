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

    # # Add destinations to the database
    destination_1 = Destination(name='Nairobi',
                                location='Kenya',
                                image='https://media.istockphoto.com/id/1299026534/photo/nairobi-kenya.jpg?s=612x612&w=0&k=20&c=xwCQ441cTHFBTZpb8ihvVwqqtTZjmees1C3xdJc_nfw=',
                                currency='KES')

    destination_2 = Destination(name='Kampala',
                                location='Uganda',
                                image='https://media.istockphoto.com/id/1299026534/photo/nairobi-kenya.jpg?s=612x612&w=0&k=20&c=xwCQ441cTHFBTZpb8ihvVwqqtTZjmees1C3xdJc_nfw=',
                                currency='UGX')

    destination_3 = Destination(name='Kinshasa',
                                location='Democratic Republic of the Congo',
                                image='https://media.istockphoto.com/id/1299026534/photo/nairobi-kenya.jpg?s=612x612&w=0&k=20&c=xwCQ441cTHFBTZpb8ihvVwqqtTZjmees1C3xdJc_nfw=',
                                currency='CDF')

    destination_4 = Destination(name='Addis Ababa',
                                location='Ethiopia',
                                image='https://media.istockphoto.com/id/1299026534/photo/nairobi-kenya.jpg?s=612x612&w=0&k=20&c=xwCQ441cTHFBTZpb8ihvVwqqtTZjmees1C3xdJc_nfw=',
                                currency='ETB')

    db.session.add_all([destination_1, destination_2, destination_3, destination_4])
    db.session.commit()


    # Add activities to the database
    activity_1 = Activity(name='Sightseeing',
                          cost=50,
                          destination_id=destination_1.id)

    activity_2 = Activity(name='Museum Visit',
                          cost=30,
                          destination_id=destination_2.id)

    activity_3 = Activity(name='Shopping',
                          cost=100,
                          destination_id=destination_3.id)

    activity_4 = Activity(name='Food Tour',
                          cost=80,
                          destination_id=destination_4.id)

    db.session.add_all([activity_1, activity_2, activity_3, activity_4])
    db.session.commit
    



destinations_data = [
    {
        'name': 'Eiffel Tower',
        'location': 'France',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Statue of Liberty',
        'location': 'USA',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Tokyo Tower',
        'location': 'Japan',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Colosseum',
        'location': 'Italy',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Big Ben',
        'location': 'England',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Sydney Opera House',
        'location': 'Australia',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Sagrada Família',
        'location': 'Spain',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Great Wall of China',
        'location': 'China',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Taj Mahal',
        'location': 'India',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Christ the Redeemer',
        'location': 'Brazil',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Pyramids of Giza',
        'location': 'Egypt',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Neuschwanstein Castle',
        'location': 'Germany',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': "Saint Basil's Cathedral",
        'location': 'Russia',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Maasai Mara National Reserve',
        'location': 'Kenya',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Kruger National Park',
        'location': 'South Africa',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    },
    {
        'name': 'Marrakech Medina',
        'location': 'Morocco',
        'image': 'https://static.toiimg.com/thumb/msid-38487526,width-748,height-499,resizemode=4,imgsize-248462/11-stunning-city-skylines-around-the-world.jpg',
        'currency': 'USD'
    }
]

# Function to seed destinations and activities data into the database
def seed_destinations():

    # Iterate over each dictionary in the list
    for destination_data in destinations_data:

        # Create a new Destination instance
        destination = Destination(
            name=destination_data['name'],
            location=destination_data['location'],
            image=destination_data['image'],
            currency=destination_data['currency']
        )
        # Add the destination to the session
        db.session.add(destination)
        # Commit the changes to the database
        db.session.commit()