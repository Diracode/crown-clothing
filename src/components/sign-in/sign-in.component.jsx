import React, { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import { CustomButton } from "../../components/custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

const SignIn = () => {
  const [signInForm, setSignInForm] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignInForm({ email: "", password: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInForm({ [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={signInForm.email}
          label="Email"
          required
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          value={signInForm.password}
          label="Password"
          required
          handleChange={handleChange}
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
