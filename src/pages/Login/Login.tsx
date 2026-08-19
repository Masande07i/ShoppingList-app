import { Text } from "../../components/Text/Text";
import style from "./Login.module.css";
import { Button } from "../../components/Button/Button";
import {FiShoppingBag,FiMail,FiLock,FiEyeOff} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateEmailInput, updatePasswordInput } from "../../features/LoginSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../Store/Store";

export const Login = () => {
 const email = useSelector((state:RootState) => state.login.email)
  const password = useSelector((state:RootState) => state.login.password)

 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   console.log(email, password)
   navigate('/')
  }
  

  return (

    <form onSubmit={handleSubmit} className={style.slate}>
      <div className={style.logo}>
        <FiShoppingBag className={style.logoIcon} />
        <Text variant="h1" style={{ color: "#FF4EA7" }}>Shopping List</Text>
      </div>

      <div className={style.heading}>
        <Text variant="h2">Welcome Back!!</Text>
        <Text variant="p">Log in to continue with your account
        </Text>
      </div>

      <div className={style.form}>
        <div className={style.inputContainer}>
          <FiMail className={style.inputIcon} />

          <input
            type="email"
            id="email"
            name="email"
            value ={email}
            placeholder="Email address"
            onChange={(e) =>  dispatch(updateEmailInput(e.target.value))}
          />
        </div>

        <div className={style.inputContainer}>
          <FiLock className={style.inputIcon} />

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
             onChange={(e) => dispatch(updatePasswordInput(e.target.value))}
          />
          <FiEyeOff className={style.eyeIcon} />
        </div>

        <div className={style.forgotPassword}>
          <a href="#">Forgot password?</a>
        </div>

        <div className={style.loginButton}>
          <Button label="LOG IN" type="submit"/>
        </div>
      </div>

      <div className={style.signup}>
        <Text variant="p">
          Don't have an account yet?
        </Text>

        <a href="#">Sign up</a>
      </div>
        
    </form>
  );
}