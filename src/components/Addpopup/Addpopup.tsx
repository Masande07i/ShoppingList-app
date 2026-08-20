import styles from './AddItem.module.css'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import { FiUpload } from 'react-icons/fi'

export const AddItem = () => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>

        <Text variant="h1" className={styles.title}>Add New Item</Text>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <Text variant="span" className={styles.label}>
              Item Name <span>*</span>
            </Text>

             <input
              id="itemName"
              type="text"
              className={styles.input}
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
            />
          </div>

          <div className={styles.formGroup}>
            <Text variant="span" className={styles.label}>
              Quantity<span>*</span>
            </Text>

            <div className={styles.quantity}>
              <Button
                label="−"
                className={styles.quantityButton}
              />

              <div className={styles.quantityValue}>
                1
              </div>

              <Button
                label="+"
                className={styles.quantityButton}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <Text variant="span" className={styles.label}>
              Notes<span className={styles.optional}> (optional)</span>
            </Text>

           <input
              id="notes"
              type="text"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <Text variant="span" className={styles.label}>
              Image<span className={styles.optional}> (optional)</span>
            </Text>

            <div className={styles.uploadBox}>
              <FiUpload className={styles.uploadIcon} />

              <Text variant="span" className={styles.uploadText}>
                Click to upload picture
              </Text>
            </div>
          </div>

          <div className={styles.buttons}>
            <Button
              label="CANCEL"
              className={styles.actionButton}
            />

            <Button
              label="SAVE"
              className={styles.actionButton}
            />
          </div>

        </div>
      </div>
    </section>
  )
}