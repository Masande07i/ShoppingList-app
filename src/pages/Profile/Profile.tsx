import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { Text } from "../../components/Text/Text";
import style from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import type { RootState ,AppDispatch } from "../../Store/Store";
import { signupUser } from "../../features/SignupSlice";

export const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.signup);

    dispatch(signupUser({  name: user.name,
          surname: user.surname,
          email: user.email,
          phone: user.phone,
          password: user.password,
          confirmPassword: user.confirmPassword, }));

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <section className={style.profilePage}>

      <button
        onClick={handleBack}
        className={style.backButton}
      >
        <FiArrowLeft />
      </button>

      <div className={style.profileHeader}>

        <div className={style.icon}>
          <Text variant="h1">
            {user?.name?.charAt(0).toUpperCase()}
          </Text>
        </div>

        <div className={style.profileDetails}>

          <Text variant="h2">
            {user?.name} {user?.surname}
          </Text>

          <Text variant="p">
            {user?.email}
          </Text>

          <Text variant="p">
            {user?.phone}
          </Text>

        </div>
      </div>

      <div className={style.card}>

        <div className={style.cardHeader}>

          <Text variant="h2">
            Personal information
          </Text>

          <button className={style.editButton}>
            <FiEdit2 />
          </button>

        </div>

        <div className={style.personalInfo}>

          <div>
            <Text variant="p">First Name</Text>
            <Text variant="p">{user?.name}</Text>
          </div>

          <div>
            <Text variant="p">Last Name</Text>
            <Text variant="p">{user?.surname}</Text>
          </div>

          <div>
            <Text variant="p">Email Address</Text>
            <Text variant="p">{user?.email}</Text>
          </div>

          <div>
            <Text variant="p">Phone number</Text>
            <Text variant="p">{user?.phone}</Text>
          </div>

        </div>
      </div>

      <div className={style.passwordCard}>

        <Text variant="h2">
          Change Password
        </Text>

        <button className={style.editButton}>
          <FiEdit2 />
        </button>

      </div>

    </section>
  );
};