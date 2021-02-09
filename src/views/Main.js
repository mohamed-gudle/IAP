import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainSection from './MainSection';
import AccountPage from './AccountPage'

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={MainSection}></Route>
      <Route exact path='/profile' component={AccountPage}></Route>
    </Switch>
  );
}

export default Main;