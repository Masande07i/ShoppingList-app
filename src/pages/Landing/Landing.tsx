import { Text } from '../../components/Text/Text'
import style from './Landing.module.css'
import { FiShoppingBag} from 'react-icons/fi'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {

    const navigate = useNavigate()

    const handleStart = () => {
        navigate('/login')
    }

    const handleSign = () => {
        navigate('/signup')
    }

    return (
        <section className={style.landing}>

            <div className={style.navh}>

                <div className={style.logo}>
                    <div className={style.logoIcon}>
                        <FiShoppingBag />
                    </div>

                    <Text variant="h1" style={{ color: '#FF4EA7' }}>
                        Shopping List
                    </Text>
                </div>

                <div className={style.navButtons}>
                    <Button
                        label="LOGIN"
                        type="button"
                        onClick={handleStart}
                    />

                    <Button
                        label="SIGN UP"
                        type="button"
                        onClick={handleSign}
                    />
                </div>

            </div>

            <div className={style.hero}>

                <div className={style.heroText}>

                    <Text variant="h1">
                        Your Shopping
                        <br />
                        Organized
                        <br />
                        <span>Beautifully.</span>
                    </Text>

                    <p className={style.description}>
                        Create, manage and organize your shopping lists
                        with ease. Keep everything you need in one simple place.
                    </p>

                    <div className={style.heroButtons}>
                        <Button
                            label="Get Started"
                            type="button"
                            onClick={handleStart}
                        />

                        <button
                            className={style.learnButton}
                            onClick={handleSign}
                        >
                            Create an Account
                        </button>
                    </div>

                   

                </div>


                <div className={style.shoppingBagArea}>

                    <div className={style.circle}></div>

                    <div className={style.shoppingBag}>
                        <FiShoppingBag className={style.bagIcon} />
                    </div>

                </div>

            </div>

        </section>
    )
}