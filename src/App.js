import logo from './logo.svg';
import './App.css';
import Firebase from './Config/Firebase';
import Routes from './Routes';
import { useEffect, useState } from 'react';

function App() {

  return (
    <div className="App">
      <Firebase>
        <Routes currentuser={user} />
      </Firebase>
    </div>
  );
}

export default App;
