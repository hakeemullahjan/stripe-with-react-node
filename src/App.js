import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'

function App() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: 'facebook'
  })

  const makePayment = async (token) => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout
          stripeKey='pk_test_s2HYDAXrBrXm5r0SxpKfyZBq00xezRXhFn'
          token={makePayment}
          amount={product.price * 100}
          name='Buy React'
          shippingAddress
          billingAddress
        >
          <button className='btn-large pink'>Buy react course in {product.price}$</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
