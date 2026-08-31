import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/Store";
import { fetchShoppingLists } from "../../features/ShoppingListSlice";
import { fetchShoppingItems } from "../../features/ShoppingItemSlice";
import { Text } from "../../components/Text/Text";
import style from "./SharedList.module.css";

export const SharedList = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { shoppingLists } = useSelector((state: RootState) => state.shoppingList);

  const { items } = useSelector((state: RootState) => state.shoppingItem);

  useEffect(() => {
    dispatch(fetchShoppingLists());

    if (id) {
      dispatch(fetchShoppingItems(id));
    }
  }, [dispatch, id]);

  const list = shoppingLists.find(
    (list) => String(list.id) === String(id)
  );

  const listItems = items.filter(
    (item) => String(item.listId) === String(id)
  );

  if (!list) {
    return (
      <section className={style.page}>
        <div className={style.message}>
          <Text variant="h2">List not found</Text>
          <Text variant="p">
            This shopping list could not be found.
          </Text>
        </div>
      </section>
    );
  }

  return (
    <section className={style.page}>
      <div className={style.container}>

        <div className={style.header}>

          <div>
            <Text variant="h1" className={style.title}>
              {list.name}
            </Text>

            <Text variant="p" className={style.subtitle}>
              Shared shopping list
            </Text>
          </div>
        </div>

        <div className={style.info}>
          <div className={style.category}>
            <span>Category</span>
            <strong>{list.category}</strong>
          </div>

          <div className={style.count}>
            <span>Items</span>
            <strong>
              {listItems.length}
            </strong>
          </div>
        </div>

        {list.notes && (
          <div className={style.notes}>
            <Text variant="p">
              <strong>Notes:</strong> {list.notes}
            </Text>
          </div>
        )}

        <div className={style.itemsSection}>
          <Text variant="h2" className={style.itemsTitle}>
            Shopping Items
          </Text>

          {listItems.length === 0 ? (
            <div className={style.empty}>
              <Text variant="p">
                This list has no items yet.
              </Text>
            </div>
          ) : (
            <div className={style.items}>
              {listItems.map((item, index) => (
                <div
                  key={item.id}
                  className={style.item}
                >
                  <div className={style.number}>
                    {index + 1}
                  </div>
                   {item.image && (
                 <img
                  src={item.image}
                  alt={item.name}
                  className={style.itemImage}/>)}

                  <div className={style.itemInfo}>
                    <Text
                      variant="h3"
                      className={style.itemName}
                    >
                      {item.name}
                    </Text>

                    <Text
                      variant="p"
                      className={style.itemCategory}
                    >
                      {item.category}
                    </Text>

                    {item.notes && (
                      <Text
                        variant="p"
                        className={style.itemNotes}
                      >
                        {item.notes}
                      </Text>
                    )}
                  </div>

                  <div className={style.quantity}>
                    x{item.quantity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      
      </div>
    </section>
  );
};

