import { Text } from "../../components/Text/Text"
import style from './Signup.module.css'
import { Button } from "../../components/Button/Button"
import { FiShoppingBag } from "react-icons/fi";

export const Signup = () => {
  return (
    <section className={style.slate}>
      <div className={style.logo}>
        <FiShoppingBag className={style.icon}/>
        <Text variant="h1" style={{ color: '#FF4EA7' }}> Shopping List</Text>
      </div>
      
      <div className={style.heading}>
        <Text variant="h2"> Create Account</Text>
        <Text variant="p">Sign up to get started with shopping list</Text>
      </div>
       
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
        />
      </div>

      <div>
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          placeholder="Enter your surname"
        />
      </div>
   
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="phone">Phone number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
        />
      </div>
     
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Enter your password"
        />
      </div>

      <Button label="SIGN UP" type="button" />

      <Text variant="p">Already have an account?</Text>
    </section>
  )
}
