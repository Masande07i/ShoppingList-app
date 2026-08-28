import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/Store";
import {fetchShoppingItems,deleteShoppingItem,setEditingItem,} from "../../features/ShoppingItemSlice";
import { AddItem } from "../../components/Addpopup/AddItem";
import { Search } from "../../components/Search/Search";
import { Text } from "../../components/Text/Text";
import styles from "./ShoppingList.module.css";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

export const ShoppingList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [showAddItem, setShowAddItem] = useState(false);

  const loading = useSelector((state: RootState) => state.shoppingItem.loading);
  const items = useSelector((state: RootState) => state.shoppingItem.items);
  const searchQuery = useSelector((state: RootState) => state.shoppingItem.searchQuery);

  useEffect(() => {
    if (id) {
      dispatch(fetchShoppingItems(id));
    }
  }, [dispatch, id]);

  const onSearch = (newValue: string) => {
    dispatch({type: "shoppingItem/updateSearchQuery",payload: newValue, });
  };

  const search = searchQuery.toLowerCase().trim();

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search)
    )
  );

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backButton}onClick={() => navigate("/home")}>
          <FiArrowLeft />
        </button>

        <Text variant="h1" className={styles.title}>
          Shopping List
        </Text>

        <div className={styles.headerActions}>
          <button className={styles.addButton}onClick={() => setShowAddItem(true)}>
            + Add Item
          </button>
        </div>
      </div>

      <div className={styles.toolbar}>
        <Search searchQuery={searchQuery}onSearch={onSearch}/>

        <select>
          <option value="">All Categories</option>
        </select>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <Text variant="p">Item</Text>
          <Text variant="p">Category</Text>
          <Text variant="p">Quantity</Text>
          <Text variant="p">Notes</Text>
          <Text variant="p">Image</Text>
          <Text variant="p">Actions</Text>
        </div>

        {loading && (
          <div className={styles.row}>
            <Text variant="p">
              Loading items...
            </Text>
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className={styles.row}>
            <Text variant="p">
              {searchQuery? "No items found.": "No items in this list yet."}
            </Text>
          </div>
        )}

        {!loading && filteredItems.map((item) => (
            <div
              className={styles.row} key={item.id}>
              <Text variant="p">
                {item.name}
              </Text>

              <Text variant="p">
                {item.category}
              </Text>

              <Text variant="p">
                {item.quantity}
              </Text>

              <Text variant="p">
                {item.notes || "-"}
              </Text>

              {item.image ? (
                <img src={item.image} alt={item.name}className={styles.itemImage}/>
              ) : (
                <Text variant="p">
                  No image
                </Text>
              )}

              <div className={styles.buttons}>
                <button
                  onClick={() => {dispatch(setEditingItem(item));
                    setShowAddItem(true);}}>
                  <FiEdit2 />
                </button>

                <button
                  onClick={() => {
                    if (item.id) {
                      dispatch(deleteShoppingItem(item.id));
                    }
                  }}
                  style={{ color: "red" }}
                > <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
      </div>

      {showAddItem && id && (
        <AddItem
          listId={id}
          onClose={() => setShowAddItem(false)}
        />
      )}
    </section>
  );
};