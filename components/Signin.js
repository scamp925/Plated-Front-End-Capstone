/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div>
      <h1
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '500px',
          margin: '20px 0px 0px 0px',
          color: '#a44a3f',
          position: 'fixed',
        }}
      >Welcome to Plated
      </h1>
      {/* <img src="../images/pngegg-mobile.png" alt="Plate with fork and knife" /> */}
      <button
        type="button"
        className="btn btn-outline-light btn-lg copy-btn"
        onClick={signIn}
        style={{
          margin: '490px 0px 0px 160px',
          position: 'fixed',
        }}
      >
        Sign In
      </button>
    </div>
  );
}

export default Signin;
