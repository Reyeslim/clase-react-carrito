import { useSelector } from 'react-redux';
import CartSummary from '../../components/CartSummary/CartSummary';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './CartPage.module.css';

function CartPage() {
  const items = useSelector((state) => state.cart.items);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Carrito</p>
        <h2 className={styles.title}>Resumen de compra</h2>
      </section>

      {items.length === 0 ? (
        <StatusMessage
          title="Carrito vacio"
          description="Anade productos para comprobar el flujo completo."
        />
      ) : (
        <section className={styles.layout}>
          <div className={styles.list}>
            {items.map((item) => (
              <article key={item.productId} className={styles.item}>
                <p className={styles.name}>Producto: {item.productId}</p>
                <p className={styles.quantity}>Cantidad: {item.quantity}</p>
              </article>
            ))}
          </div>

          <CartSummary items={items} />
        </section>
      )}
    </main>
  );
}

export default CartPage;
