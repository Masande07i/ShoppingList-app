import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/Store";
import {
  updateInputs,
  clearForm,
  addShoppingList
} from "../../features/ShoppingListSlice";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import styles from "./Addpopup.module.css";

interface AddListProps {
  onClose: () => void;
}

export const AddList = ({ onClose }: AddListProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const shoppingListState = useSelector(
    (state: RootState) => state.shoppingList
  );

  const user = useSelector(
    (state: RootState) => state.login.user
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { name, category, notes } =
      shoppingListState.inputs;

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
        addShoppingList({
          name,
          category,
          notes,
          userId: user.id
        })
      ).unwrap();

      dispatch(clearForm());
      onClose();
    } catch (error) {
      alert("Failed to add shopping list.");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <Text variant="h1" className={styles.title}>
          Add New List
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
              List Name <span>*</span>
            </Text>

            <input
              type="text"
              className={styles.input}
              value={shoppingListState.inputs.name}
              onChange={(e) =>
                dispatch(
                  updateInputs({
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
              value={shoppingListState.inputs.category}
              onChange={(e) =>
                dispatch(
                  updateInputs({
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
              value={shoppingListState.inputs.notes}
              onChange={(e) =>
                dispatch(
                  updateInputs({
                    notes: e.target.value
                  })
                )
              }
            />
          </div>

          <div className={styles.actions}>
            <Button
              type="submit"
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