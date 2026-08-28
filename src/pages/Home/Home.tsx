import {FiShoppingBag,FiHome,FiShoppingCart,FiUser,FiLogOut} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import { Text } from "../../components/Text/Text";
import { Button } from "../../components/Button/Button";
import { AddList } from "../../components/Addpopup/AddList";
import type { RootState } from "../../Store/Store";
import style from "./Home.module.css";
import { fetchShoppingLists,deleteShoppingList,openAddList,closeAddList,setEditingList,updateSearchQuery,setSortOption} from "../../features/ShoppingListSlice";
import { useDispatch,useSelector } from "react-redux";
import type { AppDispatch } from "../../Store/Store";
import { logout } from "../../features/LoginSlice";
import { MdDeleteForever } from "react-icons/md";
import {  FiEdit2 } from "react-icons/fi";
import { FaShareAlt } from "react-icons/fa";
import { fetchAllShoppingItems } from "../../features/ShoppingItemSlice";
import { Search } from "../../components/Search/Search";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { shoppingLists } = useSelector((state: RootState) => state.shoppingList );
  const user = useSelector((state: RootState) => state.login.user);
  const showAddList = useSelector((state: RootState) =>state.shoppingList.showAddList);
  const { items } = useSelector((state: RootState) => state.shoppingItem);
  const sortOption = useSelector((state: RootState) =>state.shoppingList.sortOption)

  console.log(items.length)
  
  useEffect(() => {
    dispatch(fetchShoppingLists());
    dispatch(fetchAllShoppingItems());
  }, []);
  const searchQuery = useSelector((state: RootState) =>state.shoppingList.searchQuery);
 const userLists = shoppingLists
  .filter(
    (list) =>
      String(list.userId) === String(user?.id) &&
      (
        list.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        list.category.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        list.notes?.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
  )
  .sort((a, b) => {
    if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
    }

    if (sortOption === "oldest") {
      return Number(a.id) - Number(b.id);
    }

    return Number(b.id) - Number(a.id);
  });
   
  const onSearch=(newValue: string)=>{
  dispatch(updateSearchQuery (newValue))
 }

 const handleShare = async (event: React.MouseEvent<HTMLButtonElement>,
  listId: string,listName: string) => {event.stopPropagation();

  const shareUrl = `${window.location.origin}/shopping-list/${listId}`;
  try {
    if (navigator.share) {
      await navigator.share({
        title: listName,
        text: `Check out my shopping list: ${listName}`,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Shopping list link copied!");
    }
  } catch (error) {
    console.log("Share cancelled", error);
  }
};

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
              navigate("/");
            }}>
        <FiLogOut className={style.logoutIcon} />
         <Text variant="p">Logout</Text>
        </button>
      </aside>
      <main className={style.mainContent}>
         <div  className={style.search}>
           <Search searchQuery={searchQuery} onSearch={onSearch}/> 
         
          <select
             value={sortOption}
                 onChange={(event) => dispatch(setSortOption(event.target.value))} >
                 <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name-asc">Name A-Z</option>
                 <option value="name-desc">Name Z-A</option>
                </select>
             </div>
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
          {userLists.map((list) => {

            const itemCount = items.filter(
              (item) => String(item.listId) === String(list.id)).length;
              return(
            <div
              className={style.listCard}
              key={list.id}>
              <div
              onClick={() =>
                navigate(`/shopping-list/${list.id}`)}>
              <Text variant="h2">
                {list.name}
              </Text>

              <div className= {style.items}>
                <Text variant="p" >{itemCount} {itemCount === 1? "item" : "items"} </Text>
                </div>

              <Text variant="p">
                Category: {list.category}
              </Text>

              {list.notes && 
                <Text variant="p">
                  {list.notes}
                </Text>}

                
            </div>
            <div  className={style.buttons}>
            <button onClick={(event) => {event.stopPropagation();
                  dispatch(setEditingList(list));
                }}  >
                <FiEdit2 />
              </button>
            <button onClick={(event) => {event.stopPropagation();
                  if (list.id) {dispatch(
                      deleteShoppingList(list.id));
                  }}}style={{color:"red"}} >
                <MdDeleteForever />
              </button>
              <button style={{ color: "#f32b91" }}onClick={(event) => {
                  if (list.id) {
                  handleShare(event, list.id, list.name);
                  }}}>
                  <FaShareAlt />
                </button>
           
              </div>

              

          </div>
              );
           })}
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