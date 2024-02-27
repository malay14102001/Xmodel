import React, { useState } from "react";
import "./App.css";

function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    let isValid = true;

    // Validation checks
    if (!formData.username.trim()) {
      errors.username = "Please enter a username";
      isValid = false;
    }
    if (!formData.email.includes("@")) {
      errors.email = "Invalid email. Please check your email address.";
      isValid = false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone =
        "Invalid phone number. Please enter a 10-digit phone number.";
      isValid = false;
    }
    const dobDate = new Date(formData.dob);
    if (dobDate > new Date()) {
      errors.dob = "Invalid date of birth. Please enter a past date.";
      isValid = false;
    }

    setErrors(errors);

    if (isValid) {
      closeModal();
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
      alert("Form submitted successfully!");
    }
  };

  return (
    <div>
      <h1>User Details Model</h1>
      <button onClick={openModal} className="btn">
        Open Form
      </button>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Modal Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <p className="error-message">{errors.username}</p>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <p className="error-message">{errors.dob}</p>}
              </div>
              <div className="input-container">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <p className="error-message">{errors.phone}</p>
                )}
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default XModal;
