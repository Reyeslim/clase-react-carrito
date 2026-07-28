import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import styles from "./Header.module.css"
import { useEffect } from "react"

function Header() {
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistIds = useSelector((state) => state.wishlist.ids)
  const cartCount = cartItems.reduce(
    (total, item) => (total += item.quantity),
    0,
  )

  useEffect

  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Sprint 16</p>
        <h1 className={styles.title}>Shop Flow</h1>
      </div>

      <nav className={styles.nav}>
        <Link className={styles.link} to="/">
          Productos
        </Link>
        <Link className={styles.link} to="/cart">
          Carrito
        </Link>
      </nav>

      <div className={styles.status}>
        <span>Cart: {cartCount}</span>
        <span>Wishlist: {wishlistIds.length}</span>
      </div>
    </header>
  )
}

export default Header
