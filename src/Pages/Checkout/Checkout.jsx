import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);  // Reference to the form

  const handleCheckout = () => {
    const form = formRef.current;  // Access the form element
    if (!form.checkValidity()) {
      form.classList.add('was-validated');  // Add Bootstrap validation styles
      return;  // Exit if form is invalid
    }

    if (!localStorage.getItem('auth-token')) {
      navigate('/login');
    } else {
      toast.info(
        <div>
          <p>Ready to place order?</p>
          <button onClick={() => handleOrderConfirmation(true)}>Yes</button>
          <button onClick={() => handleOrderConfirmation(false)}>No</button>
        </div>,
        { autoClose: false, closeOnClick: false }
      );
    }
  };

  const handleOrderConfirmation = (isConfirmed) => {
    toast.dismiss();  // Dismiss the current toast
    if (isConfirmed) {
      toast.success('Payment Successful', {
        onClose: () => navigate('/'),  // Navigate to home on toast close
      });
    } else {
      toast.error('Payment Failed');
    }
  };

  return (
    <div className='container' style={{ alignItems: "center" }}>
      <ToastContainer />
      <div className="py-5 text-center">
        <h2>Checkout form</h2>
      </div>
      <div className="row">
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3" style={{ textAlign: "left" }}>Billing address</h4>
          <form ref={formRef} className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="Name" required />
                <div className="invalid-feedback">Valid first name is required.</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" required />
                <div className="invalid-feedback">Valid last name is required.</div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <div className="input-group">
                <input type="text" className="form-control" id="username" placeholder="Username" required />
                <div className="invalid-feedback" style={{ width: "100%" }}>
                  Your username is required.
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
              <div className="invalid-feedback">Please enter your shipping address.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
            </div>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100" id="country" required>
                  <option value="">Choose...</option>
                  <option>India</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">Please select a valid country.</div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state" required>
                  <option value="">Choose...</option>
                  <option>Himachal Pradesh</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">Please provide a valid state.</div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" required />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="same-address" readOnly />
              <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="save-info" readOnly />
              <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
            </div>
            <hr className="mb-4" />
            <h4 className="mb-3">Payment</h4>
            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required />
                <label className="custom-control-label" htmlFor="credit">Credit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                <label className="custom-control-label" htmlFor="debit">Debit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                <label className="custom-control-label" htmlFor="paypal">Paypal</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input type="text" className="form-control" id="cc-name" placeholder="" required />
                <small className="text-muted">Full name as displayed on card</small>
                <div className="invalid-feedback">Name on card is required.</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input type="text" className="form-control" id="cc-number" placeholder="" required />
                <div className="invalid-feedback">Credit card number is required.</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                <div className="invalid-feedback">Expiration date required.</div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-cvv">CVV</label>
                <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                <div className="invalid-feedback">Security code required.</div>
              </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="button" onClick={handleCheckout}>
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
