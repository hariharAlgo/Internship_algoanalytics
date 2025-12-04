import React, { useState } from 'react';
import Step1UserInfo from './Step1UserInfo';
import Step2Address from './Step2Address';
import Step3Summary from './Step3Summary';
import Modal from './Modal';
import './MultiStepForm.css';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        // Simulate form submission
        console.log('Form Submitted:', formData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Reset form or redirect if needed
        setStep(1);
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zip: '',
        });
    };

    return (
        <div className="multi-step-form">
            <div className="progress-bar">
                <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</div>
                <div className={`line ${step >= 2 ? 'active' : ''}`}></div>
                <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</div>
                <div className={`line ${step >= 3 ? 'active' : ''}`}></div>
                <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</div>
            </div>

            <div className="step-content">
                {step === 1 && <Step1UserInfo formData={formData} handleChange={handleChange} />}
                {step === 2 && <Step2Address formData={formData} handleChange={handleChange} />}
                {step === 3 && <Step3Summary formData={formData} />}
            </div>

            <div className="navigation-buttons">
                {step > 1 && (
                    <button className="btn btn-secondary" onClick={prevStep}>
                        Back
                    </button>
                )}
                {step < 3 && (
                    <button className="btn btn-primary" onClick={nextStep}>
                        Next
                    </button>
                )}
                {step === 3 && (
                    <button className="btn btn-success" onClick={handleSubmit}>
                        Submit
                    </button>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Success!</h2>
                <p>Your information has been successfully submitted.</p>
                <div className="modal-actions">
                    <button className="btn btn-primary" onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default MultiStepForm;
