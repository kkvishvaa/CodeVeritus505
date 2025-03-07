import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ReactTyped as Typed } from "react-typed";
import Video from "../../components/Video";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./SelectUsers.css";

const SelectUsersPage = ({ videoSrc, currentUser }) => { // Add currentUser as prop
  const [codeInput, setCodeInput] = useState("");
  const [submittedCode, setSubmittedCode] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCodeChange = (event) => {
    setCodeInput(event.target.value);
    setSubmittedCode(null); 
  };

  const handleSubmit = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      setErrorMessage("You must be logged in to submit code.");
      return;
    }
    
    setIsSubmitting(true); // Start submitting
    setErrorMessage("");
  
    try {
      const userCode = {
        username: username,
        code_samples: [codeInput],
      };
  
      await axios.post("https://codeveritus-1.onrender.com/api/users/submit", userCode);
      setSubmittedCode(codeInput); 
      setCodeInput(""); 
    } catch (error) {
      console.error("Error submitting code:", error);
      setErrorMessage("Failed to submit the code. Please try again.");
    } finally {
      setIsSubmitting(false); // End submitting
    }
  };
  
  return (
    <div className="full-page-container">
      <div className="content animate-fade-in">
        <h1 className="title animate-slide-down">Code Entry Portal</h1>
        <Video videoSrc="184815-874271897_medium.mp4" />

        <Typed
          className="tagline animate-typed"
          strings={["Empowering Your Coding Journey!"]}
          typeSpeed={50}
          backSpeed={30}
          loop={false}
        />

        <div className="code-entry">
          <textarea
            className="form-control"
            value={codeInput}
            onChange={handleCodeChange}
            placeholder="Enter your code here..."
            rows="5"
          />
          <button 
  className="btn btn-primary submit-button" 
  onClick={handleSubmit}
  disabled={isSubmitting}
>
  {isSubmitting ? (
    <div className="submitting-content">
      <span>Submitting...</span>
    </div>
  ) : (
    'Submit Code'
  )}
</button>

          {submittedCode && (
          <div className="mt-4 p-3 bg-light text-dark rounded">
            <h5>Submitted Code:</h5>
            <pre className="submitted-code">{submittedCode}</pre>
          </div>
        )}

          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary back-button">
            <FaArrowLeft className="me-2" /> Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectUsersPage;
