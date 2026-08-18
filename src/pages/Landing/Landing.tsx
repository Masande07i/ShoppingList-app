import { Text } from '../../components/Text/Text'
import style from './Landing.module.css'
import { FiShoppingBag } from "react-icons/fi";
import { Button } from '../../components/Button/Button';

export const Landing = () => {
  return (
    <section>
        <div className={style.navh}>
    <div className={style.logo}>
        <FiShoppingBag className={style.icon}/>
        <Text variant='h1' style={{ color: '#FF4EA7'}} > Shopping List</Text>
    </div>
    <div >
        <Button label = "LOGIN" type='button' />
        <Button label = "SIGNUP" type='button' />
    </div>
    </div>
    
   <FiShoppingBag className={style.icon}/>
    </section>


   
    
   
  )
}
