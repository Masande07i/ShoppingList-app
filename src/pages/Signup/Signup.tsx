import { Text } from "../../components/Text/Text"
import style from './Signup.module.css'
import { Button } from "../../components/Button/Button"
import { FiShoppingBag } from "react-icons/fi";

export const Signup = () => {
  return (
     <section className= {style.slate}>
        <div className ={style.logo}>
         <FiShoppingBag className={style.icon}/>
         <Text variant= "h1" style={{ color:' #FF4EA7'}}> Shopping List</Text>
        </div>
        <div className ={style.heading}>
        <Text variant= "h2"> Create Account</Text>
        <Text variant= "p">Sign up to get started with shopping list</Text>
         </div>
       
        <div>
        <label htmlFor="text">First Name:</label>
        <input
          type="text"
          name="text"
          placeholder="Enter your first Name"
         />
     </div>
      <div>
        <label htmlFor="text">Surname:</label>
        <input
          type="text"
          name="text"
          placeholder="Enter your surname"
         />
     </div>

   
     <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
         />
     </div>

      <div>
        <label htmlFor="text">Phobe number:</label>
        <input
          type="text"
          name="text"
          placeholder="Enter your phone number"
         />
     </div>
     
     <div>
        <label htmlFor="text">Password:</label>
        <input
          type="password"
          name="text"
          placeholder="Enter your passwword"
         />
     </div>
     <div>
        <label htmlFor="text"> Confirm password:</label>
        <input
          type="password"
          name="text"
          placeholder="Enter your passwword"
         />
     </div>

       <Button label = "SIGN UP" type='button' />

       <Text variant ='p' >Already have an account?</Text>

     </section>
  )
}
