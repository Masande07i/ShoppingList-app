import {FiShoppingBag,FiHome,FiShoppingCart,FiUser,FiLogOut} from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Text } from "../../components/Text/Text";
import { Button } from "../../components/Button/Button";
import { AddItem } from "../../components/Addpopup/Addpopup";
import style from "./Home.module.css";

export const Home = () => {

  const navigate = useNavigate();

  const [showAddItem, setShowAddItem] = useState(false);

  return (
    <section className={style.home}>


      <aside className={style.sidebar}>

        <div className={style.logo}>
          <FiShoppingBag className={style.logoIcon} />

          <Text variant="h2" className={style.logoText}>
            Shopping List
          </Text>
        </div>


   
        <nav className={style.navigation}>

          <button
            className={style.navItem}
            onClick={() => navigate("/home")}
          >
            <FiHome className={style.navIcon} />

            <Text variant="p">
              Home
            </Text>
          </button>


          <button
            className={style.navItem}
            onClick={() => navigate("/my-list")}
          >
            <FiShoppingCart className={style.navIcon} />

            <Text variant="p">
              My List
            </Text>
          </button>


          <button
            className={style.navItem}
            onClick={() => navigate("/profile")}
          >
            <FiUser className={style.navIcon} />

            <Text variant="p">
              Profile
            </Text>
          </button>

        </nav>


        <button
          className={style.logout}
          onClick={() => navigate("/login")}
        >
          <FiLogOut className={style.logoutIcon} />

          <Text variant="p">
            Logout
          </Text>
        </button>

      </aside>



      <main className={style.mainContent}>

        <div className={style.header}>

          <div>
            <Text
              variant="h1"
              className={style.heading}
            >
              My Shopping List
            </Text>

            <Text
              variant="p"
              className={style.description}
            >
              All your lists in one place
            </Text>
          </div>


          <Button
            label="+ Add New List"
            className={style.addButton}
            onClick={() => setShowAddItem(true)}
          />

        </div>

      </main>

      {showAddItem && (
        <div className={style.popup}>
          <AddItem />
        </div>
      )} 

    </section>
  );
};