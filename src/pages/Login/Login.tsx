import { Text } from "../../components/Text/Text"
import style from './Login.module.css'
import { Button } from "../../components/Button/Button"
import { FiShoppingBag } from "react-icons/fi";

export const Login = () => {
  return (
   <section className= {style.slate}>
        <div className ={style.logo}>
         <FiShoppingBag className={style.icon}/>
         <Text variant= "h1" style={{ color:' #FF4EA7'}}> Shopping List</Text>
        </div>
        <div className ={style.heading}>
        <Text variant= "h2"> Welcome Back!!</Text>
        <Text variant= "p">Log in to continue with your account</Text>
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
        <label htmlFor="text">Password:</label>
    
        <input
          type="password"
          name="text"
          placeholder="Enter your passwword"
         />
     </div>
       <Button label = "LOGIN" type='button' />

       <Text variant="p" >Don't have an account yet?</Text>
     </section>
  )
}
