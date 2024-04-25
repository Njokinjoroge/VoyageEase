import React, { useState } from 'react';
import axios from 'axios';

const ProfilePicture = ({ userId }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(`/api/profile/${userId}/upload`, formData);
    };

    // Placeholder image URL
    const placeholderImage = 'https://img.freepik.com/premium-vector/blue-blue-image-man-with-blue-circle-around-his-face_136558-83321.jpg?size=626&ext=jpg';

    return (
        <div>
            {/* Display the placeholder image if no previewUrl is available */}
            <img src={previewUrl || placeholderImage} alt="Profile" />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
};

export default ProfilePicture;
