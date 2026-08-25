import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/Store";
import {updateInputs,addShoppingList} from "../../features/ShoppingListSlice";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import styles from "./Addpopup.module.css";

interface AddItemProps {
  onClose: () => void;
}

export const AddItem = ({ onClose }: AddItemProps) => {

  const shoppingListState = useSelector((state: RootState) => state.shoppingList);
  const user = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !shoppingListState.inputs.name ||!shoppingListState.inputs.category
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!user) {
     alert("You must be logged in.");
    return;
    }


    dispatch(
      addShoppingList({
        name: shoppingListState.inputs.name,
        category: shoppingListState.inputs.category,
        notes: shoppingListState.inputs.notes,
       userId: user.id,
      })
    );

    onClose();
  };

  return (
    <section className={styles.container}>

      <div className={styles.card}>

        <Text variant="h1" className={styles.title}>
          Add New Item
        </Text>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.formGroup}>
            <Text variant="span" className={styles.label}>
              Item Name <span>*</span>
            </Text>

            <input
              id="itemName"
              type="text"
              className={styles.input}
              value={shoppingListState.inputs.name}
              onChange={(e) =>
                dispatch(updateInputs({ name: e.target.value }))}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Text variant="span" className={styles.label}>
              Category <span>*</span>
            </Text>

            <input
              id="category"
              type="text"
              className={styles.input}
              value={shoppingListState.inputs.category}
              onChange={(e) =>
                dispatch(updateInputs({ category: e.target.value }))
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Text variant="span" className={styles.label}>
              Notes <span className={styles.optional}>(optional)</span>
            </Text>

            <input
              id="notes"
              type="text"
              className={styles.input}
              value={shoppingListState.inputs.notes}
              onChange={(e) =>
                dispatch(updateInputs({ notes: e.target.value }))}
            />
          </div>

          <div className={styles.actions}>
            <Button type="submit" label="SAVE"className={styles.saveButton}/>
            <Button type="button" label="CANCEL"className={styles.cancelButton} onClick={onClose}/>
          </div>

        </form>

      </div>

    </section>
  );
};