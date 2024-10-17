
import React, { useState } from 'react';
import './Feedback.css';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './config.env'; //no need to import and it is necessary to have .env file in the root and key name start with Vite and here use this with import.meta.env.keyname;
const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', { name, email, message });
    setResult("Sending....");
    const formData=new FormData(e.target);
    formData.append("access_key", import.meta.env.VITE_ACCESS_KEY);
    const response=await fetch("https://api.web3forms.com/submit",{
      method:"POST",
      body: formData,
    });
    const data=await response.json();
    if(data.success){
    toast.success('Thank you for your feedback!');
setResult("Form Submitted Successfully");
e.target.reset();
setTimeout(()=>{
  navigate('/');
},3000);
     // Redirect after 3 seconds
}else{
  console.log("Error", data);
      setResult(data.message);
  toast.error(data.message);

}
  };

  return (
    <>
      <h1>Feedback Form</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="message">Suggestions:</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Form</button>
        </form>
        <span>{result}</span>
      </div>
      <div className="back-to-home">
        <Link to="/">
          Back to Home{' '}
          <HiOutlineArrowNarrowRight />
        </Link>
      </div>
      <ToastContainer />
    </>
  );
};

export default Feedback;
