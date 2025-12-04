import React from 'react';

const Step2Address = ({ formData, handleChange }) => {
    return (
        <div className="form-step">
            <h2>Step 2: Address Details</h2>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                />
            </div>
            <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                />
            </div>
            <div className="form-group">
                <label htmlFor="zip">Zip Code:</label>
                <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Enter your zip code"
                />
            </div>
        </div>
    );
};

export default Step2Address;
