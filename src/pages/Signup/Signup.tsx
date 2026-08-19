import { Text } from "../../components/Text/Text"
import style from './Signup.module.css'
import { Button } from "../../components/Button/Button"
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";
import { updateNameInput,updateSurnameInput,updateEmailInput,updatePhoneInput,updatePasswordInput,updateConfirmPasswordInput } from "../../features/SignupSlice";

export const Signup = () => {
  const name = useSelector((state:RootState) => state.signup.name)
  const surname = useSelector((state:RootState) => state.signup.surname)
  const email= useSelector((state:RootState) => state.signup.email)
  const phone = useSelector((state:RootState) => state.signup.phone)
  const password = useSelector((state:RootState) => state.signup.password)
  const confirmPasssword = useSelector((state:RootState) => state.signup.confirmPassword)

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   console.log(email, password,name,surname,confirmPasssword,phone)
   navigate('/login')
  }
  


  return (
    <form onSubmit={handleSubmit} className={style.slate}>
      <div className={style.logo}>
        <FiShoppingBag className={style.icon}/>
        <Text variant="h1" style={{ color: '#FF4EA7' }}> Shopping List</Text>
      </div>
      
      <div className={style.heading}>
        <Text variant="h2"> Create Account</Text>
        <Text variant="p">Sign up to get started with shopping list</Text>
      </div>
       
      <div className={style.form}>
       <div className={style.inputConatiner}>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value ={name}
          placeholder="Enter your first name"
          onChange={(e) =>  dispatch(updateNameInput(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={surname}
          placeholder="Enter your surname"
          onChange={(e) =>  dispatch(updateSurnameInput(e.target.value))}
        />
      </div>
   
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value = {email}
          placeholder="Enter your email"
          onChange={(e) =>  dispatch(updateEmailInput(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="phone">Phone number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value ={phone}
          placeholder="Enter your phone number"
          onChange={(e) =>  dispatch(updatePhoneInput(e.target.value))}
        />
      </div>
     
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value ={password}
          placeholder="Enter your password"
          onChange={(e) =>  dispatch(updatePasswordInput(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value ={confirmPasssword}
          placeholder="Enter your password"
          onChange={(e) =>  dispatch(updateConfirmPasswordInput(e.target.value))}
        />
      </div>

      <Button label="SIGN UP" type="submit" />

      <Text variant="p">Already have an account?</Text>
      </div>
    </form>
  )
}
