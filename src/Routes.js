import React, { useContext } from 'react'
import Home from './Pages/Home';
import Header from './Components/Header';
import Login from './Pages/Login';
import { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import Profile from './Pages/Profile';
import { FireContext } from './Config/Firebase';

const Routes = () => {
  const { user } = useContext(FireContext)
  return (
    <BrowserRouter>
      {
        user ? (
          <Switch>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Switch>
        )
      }
    </BrowserRouter>
  )
}

export default Routes