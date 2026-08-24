import { Text } from "../../components/Text/Text";
import style from "./Signup.module.css";
import { Button } from "../../components/Button/Button";
import {FiShoppingBag,FiUser,FiMail,FiPhone,FiLock,FiEyeOff} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState,AppDispatch } from "../../Store/Store";
import {signupUser,updateRegister} from "../../features/SignupSlice";

export const Signup = () => {
  const inputs= useSelector((state: RootState) => state.signup);

 const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   try
    { dispatch(signupUser(inputs.inputs)).unwrap();
      navigate('/login');
    } catch (err)
     {console.error("Failed to sign up:", err);}
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