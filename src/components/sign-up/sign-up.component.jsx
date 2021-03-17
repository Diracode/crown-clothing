import React, { useState } from "react";
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";

import { signUpStart } from '../../redux/user/user.actions';

import "./sign-up.styles.scss";

const SignUp = ({signUpStart}) => {
  const [signUpForm, setSignUpForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { displayName, email, password, confirmPassword } = signUpForm;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signUpStart({email, displayName, password});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          value={displayName}
          label="Display Name"
          required
          handleChange={handleChange}
        />

        <FormInput
          name="email"
          type="email"
          value={email}
          label="Email"
          required
          handleChange={handleChange}
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          label="Password"
          required
          handleChange={handleChange}
        />

        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          label="Confirm Password"
          required
          handleChange={handleChange}
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);