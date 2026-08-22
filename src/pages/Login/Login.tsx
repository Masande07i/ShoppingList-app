import { Text } from "../../components/Text/Text";
import style from "./Login.module.css";
import { Button } from "../../components/Button/Button";
import {
  FiShoppingBag,
  FiMail,
  FiLock,
  FiEyeOff,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/Store";

import {
  loginUser,
  updateEmailInput,
  updatePasswordInput,
} from "../../features/LoginSlice";

export const Login = () => {
  const user = useSelector((state: RootState) => state.login);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email: user.email,
        password: user.password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      navigate('/home');
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
        <Text variant="h2">Welcome Back</Text>

        <Text variant="p">
          Log in to continue to your shopping list
        </Text>
      </div>

      <div className={style.form}>

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

        <div className={style.loginButton}>
          <Button
            label="LOG IN"
            type="submit"
          />
        </div>

      </div>

      <div className={style.signup}>
        <Text variant="p">
          Don't have an account?
        </Text>

        <a
          href="#"onClick={(e) => {e.preventDefault();navigate("/signup");
          }}
        > Sign up </a>
      </div>

    </form>
  );
};