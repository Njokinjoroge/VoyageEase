from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth

app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('path/to/firebase_credentials.json')
firebase_admin.initialize_app(cred)

# Profile management routes
@app.route('/api/profile', methods=['GET'])
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

@app.route('/api/profile', methods=['PUT'])
def update_profile():
    try:
        user = auth.get_user(request.headers.get('Authorization'))
        new_display_name = request.json.get('displayName')
        auth.update_user(user.uid, display_name=new_display_name)
        return jsonify({'message': 'Profile updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/profile', methods=['DELETE'])
def delete_profile():
    try:
        user = auth.get_user(request.headers.get('Authorization'))
        auth.delete_user(user.uid)
        return jsonify({'message': 'Profile deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
