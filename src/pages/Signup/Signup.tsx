import { Text } from "../../components/Text/Text";
import style from "./Signup.module.css";
import { Button } from "../../components/Button/Button";
import {FiShoppingBag,FiUser,FiMail,FiPhone,FiLock,FiEyeOff} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";
import type { User } from "../../features/SignupSlice";
import {
  registerUser,
  updateConfirmPasswordInput,
  updateEmailInput,
  updateNameInput,
  updatePasswordInput,
  updatePhoneInput,
  updateSurnameInput,
} from "../../features/SignupSlice";

export const Signup = () => {
  const user: User = useSelector((state: RootState) => state.signup);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      registerUser({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        password: user.password,
        confirmPassword: user.confirmPassword,
      })
    );
    navigate("/login");
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
            value={user.name}
            placeholder="First name"
            onChange={(e) =>dispatch(updateNameInput(e.target.value))}
          />
        </div>

        <div className={style.inputContainer}>
          <FiUser className={style.inputIcon} />
          <input
            type="text"
            id="surname"
            name="surname"
            value={user.surname}
            placeholder="Surname"
            onChange={(e) =>dispatch(updateSurnameInput(e.target.value))}
          />
        </div>

        <div className={style.inputContainer}>
          <FiMail className={style.inputIcon} />
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            placeholder="Email address"
            onChange={(e) =>dispatch(updateEmailInput(e.target.value))}
          />
        </div>

        <div className={style.inputContainer}>
          <FiPhone className={style.inputIcon} />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            placeholder="Phone number"
            onChange={(e) =>dispatch(updatePhoneInput(e.target.value))}
          />
        </div>

        <div className={style.inputContainer}>
          <FiLock className={style.inputIcon} />
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={(e) =>dispatch(updatePasswordInput(e.target.value))}
          />
          <FiEyeOff className={style.eyeIcon} />
        </div>

        <div className={style.inputContainer}>
          <FiLock className={style.inputIcon} />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            placeholder="Confirm password"
            onChange={(e) =>dispatch(updateConfirmPasswordInput(e.target.value))}
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