import styles from "./CartSummary.module.css"

function CartSummary({ items }) {
  const totalItems = 0
  const totalPrice = 0

  return (
    <aside className={styles.box}>
      <p className={styles.label}>Resumen</p>
      <p className={styles.line}>Items: {totalItems}</p>
      <p className={styles.line}>Total: {totalPrice} EUR</p>
      <p className={styles.note}></p>
    </aside>
  )
}

export default CartSummary
