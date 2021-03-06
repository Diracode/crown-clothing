import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

import "./App.css";

import { Homepage } from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-sign-out/sign-in-and-sign-up.component";
import CheckoutPage from './pages/checkout/checkout.component';
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument, addCollectionAndDocuments } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCollectionForPreview } from './redux/shop/shop.selectors';


function App(props) {
  const { setCurrentUser, currentUser, collectionsArray } = props;

  useEffect(() => {
    const unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
        addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
      }
    });
    return () => unSubscribeFromAuth();
    //why does [] and [setCurrentUser] work?????????
  }, [setCurrentUser, collectionsArray]);

  return (

    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionForPreview
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
