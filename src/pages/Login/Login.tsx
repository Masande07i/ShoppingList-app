import { Text } from "../../components/Text/Text";
import style from "./Login.module.css";
import { Button } from "../../components/Button/Button";
import {FiShoppingBag,FiMail,FiLock,FiEyeOff} from "react-icons/fi";

export const Login = () => {
  return (
    <section className={style.slate}>
      <div className={style.logo}>
        <FiShoppingBag className={style.logoIcon} />

        <Text
          variant="h1"
          style={{ color: "#FF4EA7" }}
        >
          Shopping List
        </Text>
      </div>

      <div className={style.heading}>
        <Text variant="h2">Welcome Back!!</Text>

        <Text variant="p">
          Log in to continue with your account
        </Text>
      </div>

  
      <div className={style.form}>

     
        <div className={style.inputContainer}>
          <FiMail className={style.inputIcon} />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
          />
        </div>

        <div className={style.inputContainer}>
          <FiLock className={style.inputIcon} />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <FiEyeOff className={style.eyeIcon} />
        </div>

        <div className={style.forgotPassword}>
          <a href="#">Forgot password?</a>
        </div>

        <div className={style.loginButton}>
          <Button label="LOG IN" type="button"/>
        </div>
      </div>

      <div className={style.signup}>
        <Text variant="p">
          Don’t have an account yet?
        </Text>

        <a href="#">Sign up</a>
      </div>
    </section>
  );
};