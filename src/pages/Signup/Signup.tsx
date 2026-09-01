import { Text } from "../../components/Text/Text";
import style from "./Signup.module.css";
import { Button } from "../../components/Button/Button";
import {FiShoppingBag,FiUser,FiMail,FiPhone,FiLock,FiEyeOff} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState,AppDispatch } from "../../Store/Store";
import {signupUser,updateRegister,clearForm} from "../../features/SignupSlice";
import type { UserData } from "../../features/SignupSlice";

export const Signup = () => {
  const inputs= useSelector((state: RootState) => state.signup);

 const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const validateForm = (inputs: UserData) => {
  if (!inputs.name.trim()) {
    alert("Please enter your first name");
    return false;
  }

  if (!inputs.surname.trim()) {
    alert("Please enter your surname");
    return false;
  }

  if (!inputs.email.trim()) {
    alert("Please enter your email address");
    return false;
  }

  if (!inputs.phone.trim()) {
    alert("Please enter your phone number");
    return false;
  }

  const phoneRegex = /^[0-9+\-\s()]{10,15}$/;

  if (!phoneRegex.test(inputs.phone)) {
    alert("Please enter a valid phone number");
    return false;
  }

  if (!inputs.password.trim()) {
    alert("Please enter a password");
    return false;
  }

  if (!inputs.confirmPassword.trim()) {
    alert("Please confirm your password");
    return false;
  }

  if (inputs.password !== inputs.confirmPassword) {
    alert("Passwords do not match");
    return false;
  }

  return true;
};
  
  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validateForm(inputs.inputs)) {
    return;
  }

  try {
    await dispatch(signupUser(inputs.inputs)).unwrap();

    dispatch(clearForm());

    navigate("/login");
  } catch (err) {
    alert("Failed to sign up");
    console.error(err);
  }
};

  return (
    <form onSubmit={handleSubmit} className={style.slate}>

      <div className={style.logo}>
        <FiShoppingBag className={style.logoIcon} />

        <Text variant="h1" style={{ color: "#FF4EA7" }}>
          Shopping List
        </Text>
      </div>

      <div className={style.heading}>
        <Text variant="h2">Create Account</Text>
        <Text variant="p">Sign up to get started with shopping list</Text>
      </div>

      <div className={style.form}>
        <div className={style.inputContainer}>
          <FiUser className={style.inputIcon} />
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={inputs.inputs.name}
            placeholder="First name"
            onChange={(e) =>dispatch(updateRegister({name: e.target.value}))
          }
          />
        </div>

        <div className={style.inputContainer}>
          <FiUser className={style.inputIcon} />
          <input
            type="text"
            id="surname"
            name="surname"
            value={inputs.inputs.surname}
            placeholder="Surname"
            onChange={(e) =>dispatch(updateRegister({surname:e.target.value}))}
          />
        </div>

        <div className={style.inputContainer}>
          <FiMail className={style.inputIcon} />
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.inputs.email}
            placeholder="Email address"
            onChange={(e) =>dispatch(updateRegister({email:e.target.value}))}
          />
        </div>

        <div className={style.inputContainer}>
          <FiPhone className={style.inputIcon} />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={inputs.inputs.phone}
            placeholder="Phone number"
            onChange={(e) =>dispatch(updateRegister({phone:e.target.value}))}
          />
        </div>

        <div className={style.inputContainer}>
          <FiLock className={style.inputIcon} />
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.inputs.password}
            placeholder="Password"
            onChange={(e) =>dispatch(updateRegister({password:e.target.value}))}
          />
          <FiEyeOff className={style.eyeIcon} />
        </div>

        <div className={style.inputContainer}>
          <FiLock className={style.inputIcon} />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={inputs.inputs.confirmPassword}
            placeholder="Confirm password"
            onChange={(e) =>dispatch(updateRegister({confirmPassword:e.target.value}))}
          />
          <FiEyeOff className={style.eyeIcon} />
        </div>

        <div className={style.signupButton}>
          <Button label="SIGN UP" type="submit"/>
        </div>
      </div>

      <div className={style.login}>
        <Text variant="p">Already have an account?</Text>

        <a href="#" onClick={(e) => {e.preventDefault();
           navigate("/login");}}>Log in</a>
      </div>
    </form>
  );
};