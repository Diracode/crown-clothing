import React, { useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import {Homepage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-sign-out/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';


function App() {
  const [appState, setAppState] = useState({
    currentUser: null
  });

  useEffect(() => {
    const unSubscribeFromAuth = auth.onAuthStateChanged(user => {
      setAppState({currentUser: user});
    });
    return () => {
      unSubscribeFromAuth();
    };
  });

  return (
    <div>
    <Header currentUser={appState.currentUser}/>
    <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/shop' component={ShopPage}/>
      <Route exact path='/signin' component={SignInAndSignUpPage}/>
    </Switch>
    </div>
  );
}

export default App;
