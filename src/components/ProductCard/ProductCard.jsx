import styles from "./ProductCard.module.css"

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isAddingToCart,
}) {
  return (
    <article className={styles.card}>
      <p className={styles.category}>{product.category}</p>
      <h2 className={styles.title}>{product.name}</h2>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{product.price} EUR</p>

      <div className={styles.actions}>
        <button
          className={styles.primary}
          type="button"
          onClick={() => onAddToCart(product.id)}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? "Añadiendo..." : "Añadir al carrito"}
        </button>
        <button
          className={styles.secondary}
          type="button"
          onClick={() => onToggleWishlist(product.id)}
        >
          {isWishlisted ? "Quitar wishlist" : "Añadir wishlist"}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
