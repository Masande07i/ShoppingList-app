import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/Store";
import {
  updateItemInputs,
  clearItemForm,
  addShoppingItem
} from "../../features/ShoppingItemSlice";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import styles from "./Addpopup.module.css";

interface AddItemProps {
  onClose: () => void;
  listId: string;
}

export const AddItem = ({
  onClose,
  listId
}: AddItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const shoppingItemState = useSelector(
    (state: RootState) => state.shoppingItem
  );

  const user = useSelector(
    (state: RootState) => state.login.user
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { name, category, notes } =
      shoppingItemState.inputs;

    if (!name || !category) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    try {
      await dispatch(
        addShoppingItem({
          name,
          category,
          notes,
          userId: String(user.id),
          listId
        })
      ).unwrap();

      dispatch(clearItemForm());
      onClose();
    } catch (error) {
      alert("Failed to add item.");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <Text variant="h1" className={styles.title}>
          Add New Item
        </Text>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.formGroup}>
            <Text
              variant="span"
              className={styles.label}
            >
              Item Name <span>*</span>
            </Text>

            <input
              type="text"
              className={styles.input}
              value={shoppingItemState.inputs.name}
              onChange={(e) =>
                dispatch(
                  updateItemInputs({
                    name: e.target.value
                  })
                )
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Text
              variant="span"
              className={styles.label}
            >
              Category <span>*</span>
            </Text>

            <input
              type="text"
              className={styles.input}
              value={shoppingItemState.inputs.category}
              onChange={(e) =>
                dispatch(
                  updateItemInputs({
                    category: e.target.value
                  })
                )
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Text
              variant="span"
              className={styles.label}
            >
              Notes{" "}
              <span className={styles.optional}>
                (optional)
              </span>
            </Text>

            <input
              type="text"
              className={styles.input}
              value={shoppingItemState.inputs.notes}
              onChange={(e) =>
                dispatch(
                  updateItemInputs({
                    notes: e.target.value
                  })
                )
              }
            />
          </div>

          <div className={styles.actions}>
            <Button type="submit"
              label="SAVE"
              className={styles.saveButton}
            />

            <Button
              type="button"
              label="CANCEL"
              className={styles.cancelButton}
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </section>
  );
};