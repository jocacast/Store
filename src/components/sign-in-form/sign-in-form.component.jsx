import Button from "../../components/button/button.component";
import "./sign-in-form.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormValues] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup();
      const { user } = response;
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);
    } catch (error) {
      console.log(`Error while signing in with google ${error}`);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await signInUserWithEmailAndPassword(email, password);
      console.log(response);
      setFormValues(defaultFormFields);
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(`${e.code}`);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-in-container">
      <h2>Have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSignIn}>
        <FormInput
          label="Email"
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit"> Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
