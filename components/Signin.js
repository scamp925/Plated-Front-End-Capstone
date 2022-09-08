/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="sign-in-container">
      <Image src="/pngegg-mobile.png" alt="Plate with fork and knife" width="740" height="615" />
      <div className="overlay-on-img">
        <h1 className="welcome-header">Welcome to Plated</h1>
        <button
          type="button"
          className="btn btn-outline-light btn-lg copy-btn"
          onClick={signIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Signin;
