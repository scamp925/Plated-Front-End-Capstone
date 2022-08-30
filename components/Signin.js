/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="sign-in-logo">
      <h1>Welcome to Plated</h1>
      <button type="button" className="btn btn-outline-light btn-lg copy-btn" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
