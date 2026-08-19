import { Text } from '../../components/Text/Text'
import style from './Landing.module.css'
import { FiShoppingBag } from 'react-icons/fi'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'



export const Landing = () => {

    const navigate= useNavigate();

const handleStart =() =>{
    navigate ('/login');
}

const handleSign = () =>{
    navigate('/signup')
}
    return (
        <section className={style.landing}>

            <div className={style.navh}>
                <div className={style.logo}>
                    <FiShoppingBag className={style.icon} />
                    <Text variant="h1"style={{ color: '#FF4EA7' }}>
                        Shopping List
                    </Text>
                </div>

                <div className={style.navButtons}>
                    <Button label="LOGIN" type="button" onClick={handleStart}/>
                    <Button label="SIGNUP"type="button" onClick={handleSign}/>
                </div>
            </div>

            <div className={style.hero}>
                <div className={style.heroText}>
                    <Text variant="h1">Your Shopping<br />
                        Organized<br />
                        <span>Beautifully</span>
                    </Text>
                </div>

                <div className={style.shoppingBag}>
                    <FiShoppingBag className={style.bagIcon} />
                </div>

            </div>

            <div className={style.cta}>
                <Text variant="p">
                    Want to manage your shopping lists?
                </Text>

                <Button label="Get Started" type="button" onClick={handleStart}/>
            </div>
        </section>
    )
}