import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import style from "./Profile.module.css";
import { useNavigate } from "react-router-dom";




export const Profile = () => {

  const navigate = useNavigate();

  const handleBack = () =>{
    navigate('/home')
}
    return (
        <section className={style.profilePage}>

            <button className={style.backButton} onClick={handleBack}>
                <FiArrowLeft />
            </button>

            <div className={style.profileHeader}>
                <div className={style.icon}>
                    M
                </div>
                <div className={style.profileDetails}>
                    <h1>Masande Magoso</h1>
                    <p>nondumo@gmail.com</p>
                    <p>+27 82 548 5678</p>
                </div>
            </div>

            <div className={style.card}>
                <div className={style.cardHeader}>
                    <h2>Personal information</h2>
                    <button className={style.editButton}><FiEdit2 /> </button>
                </div>

                <div className={style.personalInfo}>
                    <div className={style.infoItem}>
                        <span>First Name</span>
                        <p>Masande</p>
                    </div>

                    <div className={style.infoItem}>
                        <span>Last Name</span>
                        <p>Magoso</p>
                    </div>

                    <div className={style.infoItem}>
                        <span>Email Address</span>
                        <p>nondumo@gmail.com</p>
                    </div>

                    <div className={style.infoItem}>
                        <span>Phone number</span>
                        <p>082 548 5678</p>
                    </div>
                </div>
            </div>
           
            <div className={style.passwordCard}>
                <h2>Change Password</h2>
                <button className={style.editButton}><FiEdit2 /> </button>
            </div>
        </section>
    );
};
