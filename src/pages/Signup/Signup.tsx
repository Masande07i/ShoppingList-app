import { Text } from "../../components/Text/Text"
import style from './Signup.module.css'
import { Button } from "../../components/Button/Button"
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";
import type { User } from "../../features/SignupSlice";
import { registerUser, 
  updateConfirmPasswordInput, 
  updateEmailInput, 
  updateNameInput, 
  updatePasswordInput,
   updatePhoneInput,
    updateSurnameInput } from "../../features/SignupSlice";


export const Signup = () => {

  
  const user :User = useSelector((state: RootState) => state.signup)
 

  const dispatch = useDispatch();
  const navigate = useNavigate();


   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
    dispatch(
      registerUser({
       name:user.name,
       surname:user.surname,
       email:user.email,
       phone:user.phone,
       password:user.password,
       confirmPassword:user.confirmPassword
      }));
      console.log(user.name,user.surname,user.email,user.phone)
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
          value ={user.name}
          placeholder="Enter your first name"
          onChange={(e) =>  dispatch(updateNameInput(e.target.value))}
        />
      </div>

      <div>
       
        <input
          type="text"
          id="surname"
          name="surname"
          value={user.surname}
          placeholder="Enter your surname"
         onChange={(e) =>  dispatch(updateSurnameInput(e.target.value))}
        />
      </div>
   
      <div>
       
        <input
          type="email"
          id="email"
          name="email"
          value = {user.email}
          placeholder="Enter your email"
          onChange={(e) =>  dispatch(updateEmailInput(e.target.value))}
        />
      </div>

      <div>
       
        <input
          type="tel"
          id="phone"
          name="phone"
          value ={user.phone}
          placeholder="Enter your phone number"
          onChange={(e) =>  dispatch(updatePhoneInput(e.target.value))}
        />
      </div>
     
      <div>
       
        <input
          type="password"
          id="password"
          name="password"
          value ={user.password}
          placeholder="Enter your password"
           onChange={(e) =>  dispatch(updatePasswordInput(e.target.value))}
        />
      </div>

      <div>
        
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value ={user.confirmPassword}
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
