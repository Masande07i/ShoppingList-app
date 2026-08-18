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
        <Text variant= "h2"> Welcome Back!!</Text>
       
   
     <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Enter an email"
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
     </section>
  )
}
