/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
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
      <Image src="/pngegg-mobile.png" alt="Plate with fork and knife" width="700" height="615" />
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
