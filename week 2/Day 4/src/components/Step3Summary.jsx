import React from 'react';

const Step3Summary = ({ formData }) => {
    return (
        <div className="form-step">
            <h2>Step 3: Summary</h2>
            <div className="summary-details">
                <h3>User Information</h3>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>

                <h3>Address Details</h3>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>City:</strong> {formData.city}</p>
                <p><strong>Zip Code:</strong> {formData.zip}</p>
            </div>
            <p className="confirmation-text">Please review your information before submitting.</p>
        </div>
    );
};

export default Step3Summary;
