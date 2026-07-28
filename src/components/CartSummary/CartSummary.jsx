import { useMemo } from "react"
import styles from "./CartSummary.module.css"

const PRICE_PER_UNIT = 10

function CartSummary({ items }) {
  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  )

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity * PRICE_PER_UNIT, 0), // * item.price en proyecto real
    [items],
  )

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
