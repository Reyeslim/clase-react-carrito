import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCartItem } from "../../api/cart"
import { getProducts } from "../../api/products"
import { toggleWishlist } from "../../api/wishlist"
import ProductCard from "../../components/ProductCard/ProductCard"
import StatusMessage from "../../components/StatusMessage/StatusMessage"
import { addLocalCartItem } from "../../store/slices/cartSlice"
import { toggleLocalWishlist } from "../../store/slices/wishlistSlice"
import styles from "./ProductsPage.module.css"

function ProductsPage() {
  const dispatch = useDispatch()
  const wishlistIds = useSelector((state) => state.wishlist.ids)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (fetchError) {
        setError("No se pudieron cargar los productos.")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  async function handleAddToCart(productId) {
    await addCartItem(productId, 1)
    dispatch(addLocalCartItem({ productId, quantity: 1 }))
  }

  async function handleToggleWishlist(productId) {
    await toggleWishlist(productId)
    dispatch(toggleLocalWishlist(productId))
  }

  if (loading) {
    return (
      <StatusMessage
        title="Cargando productos"
        description="Consultando catalogo..."
      />
    )
  }

  if (error) {
    return <StatusMessage title="Error" description={error} variant="error" />
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Live 1</p>
        <h2 className={styles.title}>Flujo real del cliente</h2>
        <p className={styles.copy}>
          Ver producto, anadir al carrito, persistir en backend y actualizar el
          estado global.
        </p>
      </section>

      <section className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(product.id)}
          />
        ))}
      </section>
    </main>
  )
}

export default ProductsPage
