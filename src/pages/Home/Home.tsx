import {FiShoppingBag,FiHome,FiShoppingCart,FiUser,FiLogOut} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import { Text } from "../../components/Text/Text";
import { Button } from "../../components/Button/Button";
import { AddList } from "../../components/Addpopup/AddList";
import type { RootState } from "../../Store/Store";
import style from "./Home.module.css";
import { fetchShoppingLists,deleteShoppingList,openAddList,closeAddList,setEditingList} from "../../features/ShoppingListSlice";
import { useDispatch,useSelector } from "react-redux";
import type { AppDispatch } from "../../Store/Store";
import { logout } from "../../features/LoginSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { shoppingLists } = useSelector((state: RootState) => state.shoppingList );
  const user = useSelector((state: RootState) => state.login.user);
  const showAddList = useSelector((state: RootState) =>state.shoppingList.showAddList);
 

  useEffect(() => {
    dispatch(fetchShoppingLists());
  }, [dispatch]);

  const userLists = shoppingLists.filter((list) =>String(list.userId) === String(user?.id));

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
            <Text variant="p">Home</Text>
          </button>

          <button
            className={style.navItem}
            onClick={() => navigate("/home")}
          >
            <FiShoppingCart className={style.navIcon} />
            <Text variant="p">My List</Text>
          </button>

          <button
            className={style.navItem}
            onClick={() => navigate("/profile")}
          >
            <FiUser className={style.navIcon} />
            <Text variant="p">Profile</Text>
          </button>
        </nav>

        <button className={style.logout} onClick={() => {
           dispatch(logout());
              navigate("/login");
            }}>

  <FiLogOut className={style.logoutIcon} />
  <Text variant="p">Logout</Text>
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

          <Button label="+ Add New List" className={style.addButton} onClick={() => dispatch(openAddList())}/>
        </div>

        <div className={style.listContainer}>
          {userLists.map((list) => (
            <div
              className={style.listCard}
              key={list.id}>
              <div
              onClick={() =>
                navigate(`/shopping-list/${list.id}`)}>
              <Text variant="h2">
                {list.name}
              </Text>

              <Text variant="p">
                Category: {list.category}
              </Text>

              {list.notes && (
                <Text variant="p">
                  {list.notes}
                </Text>
              )}
            </div>
            <button onClick={(event) => {event.stopPropagation();
                  dispatch(setEditingList(list));
                }} >
                Edit
              </button>
            <button onClick={(event) => {event.stopPropagation();
                  if (list.id) {dispatch(
                      deleteShoppingList(list.id));
                  }}}>
                Delete
              </button>
          </div>
          ))}
        </div>
      </main>

      {showAddList && (
        <div className={style.popup}>
          <AddList
            onClose={() => dispatch(closeAddList())}
          />
        </div>
      )}
    </section>
  );
};