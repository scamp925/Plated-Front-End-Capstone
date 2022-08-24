/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <Sidebar />
        <Link passHref href="/">
          <h1>Plated</h1>
        </Link>
      </div>
    </nav>
  );
}
