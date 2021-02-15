import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import {Homepage} from './pages/homepage/homepage.component';

const Hatspage = () => (
  <div>
    <h1>
      HATS PAGES
    </h1>
  </div>
);

function App() {
  return (
    <div>
    <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/hats' component={Hatspage}/>
    </Switch>
    </div>
  );
}

export default App;
