import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/Store";
import { fetchShoppingItems } from "../../features/ShoppingItemSlice";
import { AddItem } from "../../components/Addpopup/Addpopup";
import { Text } from "../../components/Text/Text";
import styles from "./ShoppingList.module.css";
import { FiArrowLeft } from "react-icons/fi";

export const ShoppingList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [showAddItem, setShowAddItem] = useState(false);

  const items = useSelector(
    (state: RootState) => state.shoppingItem.items
  );

  const loading = useSelector(
    (state: RootState) => state.shoppingItem.loading
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchShoppingItems(id));
    }
  }, [id, dispatch]);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/home")}
        >
         <FiArrowLeft />
        </button>

        <Text variant="h1" className={styles.title}>
          Shopping List
        </Text>

        <div className={styles.headerActions}>
          <button
            className={styles.addButton}
            onClick={() => setShowAddItem(true)}
          >
            + Add Item
          </button>
        </div>
      </div>

      <div className={styles.toolbar}>
        <select>
          <option value="">All Categories</option>
        </select>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <Text variant="p">Item</Text>
          <Text variant="p">Category</Text>
          <Text variant="p">Notes</Text>
          <Text variant="p">Actions</Text>
        </div>

        {loading && (
          <div className={styles.row}>
            <Text variant="p">
              Loading items...
            </Text>
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className={styles.row}>
            <Text variant="p">
              No items in this list yet.
            </Text>
          </div>
        )}

        {!loading &&
          items.map((item) => (
            <div
              className={styles.row}
              key={item.id}
            >
              <Text variant="p">
                {item.name}
              </Text>

              <Text variant="p">
                {item.category}
              </Text>

              <Text variant="p">
                {item.notes || "-"}
              </Text>


          

              <div>
                <button>Edit</button>
                <button>Delete</button>
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