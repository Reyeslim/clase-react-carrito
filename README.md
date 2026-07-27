# Sprint 16 · Live 1 — Flujo Completo del Cliente: Carrito y Wishlist Persistentes

> **Objetivo de la Clase**
> Entender el flujo completo del cliente dentro de un e-commerce real, conectando carrito y wishlist con backend, calculando totales y diferenciando qué estado debe ser global y cuál local.

En esta clase conectaremos la arquitectura completa de un e-commerce real. Dejamos atrás las listas temporales en memoria para construir un **Carrito de Compras y una Wishlist sincronizados con la Base de Datos (Supabase / Prisma)** mediante una API REST en Node.js/Express y Redux Toolkit.

---

## Requisitos Previos (Checklist)

Antes de iniciar, verifica que ambas partes de la aplicación estén listas:

- [ ] Redux Store configurado con `@reduxjs/toolkit` y `react-redux`.

- [ ] Sistema de Autenticación funcionando (JWT almacenado en cliente).

- [ ] Servidor Backend levantado en `http://localhost:3000` (`npm run dev` en `backend/`).

- [ ] Base de datos PostgreSQL operativa en **Supabase**.

- [ ] Instancia de Axios con interceptor inyectando la cabecera `Authorization: Bearer <token>`.

---

## Estructura del Proyecto Full Stack

```bash
16 LIVE 1/
├── frontend/
│   ├── package.json
│   └── src/
│       ├── api/                             # Módulos de peticiones HTTP
│       │   ├── axios.js                     # Instancia con interceptor JWT
│       │   ├── cart.js                      # Endpoints /api/cart
│       │   ├── products.js                  # Endpoints /api/products
│       │   └── wishlist.js                  # Endpoints /api/wishlist
│       ├── components/
│       │   ├── Header/                      # Contador global de carrito
│       │   ├── Footer/
│       │   ├── Layout/
│       │   ├── ProductCard/                 # Botones "Añadir" y "Favorito"
│       │   ├── CartSummary/                 # Resumen y cálculo de totales
│       │   └── StatusMessage/
│       ├── pages/
│       │   ├── ProductsPage/                # Catálogo interactivo
│       │   ├── CartPage/                    # Vista detallada del carrito
│       │   └── NotFoundPage/
│       ├── router/
│       │   └── AppRouter.jsx                # Enrutado react-router-dom
│       └── store/
│           ├── store.js                     # Centralización de Redux
│           └── slices/
│               ├── authSlice.js             # Estado de autenticación
│               ├── cartSlice.js             # Slice con Thunks de carrito
│               └── wishlistSlice.js         # Slice con Thunks de wishlist
│
└── backend/
    ├── package.json
    ├── prisma/
    │   └── schema.prisma                    # Modelos User, Product, CartItem, Wishlist
    └── src/
        ├── server.js                        # Servidor Express
        ├── lib/
        │   └── prisma.js                    # Cliente de Prisma
        ├── middlewares/
        │   └── authMiddleware.js            # Validación de JWT
        ├── routes/                          # Definición de endpoints HTTP
        │   ├── cart.routes.js
        │   ├── products.routes.js
        │   └── wishlist.routes.js
        ├── controllers/                     # Controladores de la API
        │   ├── cart.controller.js
        │   ├── products.controller.js
        │   └── wishlist.controller.js
        └── services/                        # Lógica de Negocio con Prisma
            ├── cart.service.js              # Persistencia de carrito
            ├── products.service.js
            └── wishlist.service.js          # Operaciones toggle de wishlist

```

---

## Flujo de Datos End-to-End

Entender el ciclo de vida completo de un producto al interactuar en la UI:

```txt
┌────────────────┐      dispatch(addToCart)       ┌─────────────────────────┐
│  ProductCard   │ ─────────────────────────────► │ cartSlice.js (Thunk)    │
└────────────────┘                                └────────────┬────────────┘
        ▲                                                      │ POST /api/cart
        │                                                      ▼
┌────────────────┐                                ┌─────────────────────────┐
│  Redux Store   │ ◄───────────────────────────── │ Express + Prisma        │
│ (items, count) │  Respuesta {cartItem, product} │ (Supabase Database)     │
└───────┬────────┘                                └─────────────────────────┘
        │
        ├───► Actualiza el Badge del <Header />
        │
        └───► Recalcula subtotales en <CartSummary /> en tiempo real

```

---

## Objetivos de Aprendizaje

1. **Persistencia Backend Real:** Conectar el carrito y la wishlist a Supabase mediante servicios de Prisma.

2. **Sincronización de Estado Global:** Mantener actualizado el Store de Redux tras responder la API.

3. **Cálculo de Datos Derivados:** Obtener subtotales, impuestos y costes de envío sin duplicar variables en el estado.

4. **Criterio de Estado Global vs Local:** Saber cuándo usar Redux (`items`, `user`) y cuándo `useState` (`isOpen`, `inputQuantity`).

5. **Manejo de Estados de Carga y Error:** Implementar `pending`, `fulfilled` y `rejected` para mejorar la UX.

---

## Reglas de Oro y Puntos Clave

> **1. Persistencia Real sobre Apariencia**
> La Wishlist no es solo cambiar el color de un icono de corazón en CSS; debe guardar una relación `userId <-> productId` en la base de datos.

> **2. Cero Duplicidad de Estado**
> NUNCA guardes en Redux o `useState` algo que pueda calcularse a partir de otros datos (ej. el **Total del Carrito** es simplemente un `.reduce()` sobre los `items`).

> **3. Separación de Responsabilidades**
>
> - **Redux:** Datos compartidos entre vistas (usuario, carrito, wishlist).
> - **useState:** Estados visuales o temporales de un único componente (inputs, modales).

---

## Prompt de Asistencia con IA

Copia este prompt en tu asistente de IA para validar tu arquitectura durante el ejercicio:

```txt
Estoy gestionando un Carrito de Compras y Wishlist en React con Redux Toolkit conectado a un Backend en Node/Prisma.

Quiero que revises la estructura de mi código para verificar si estoy separando correctamente:
1. Estado global (Redux) vs Estado local (useState).
2. Llamadas a la API (Thunks/Axios) vs Componentes de UI.
3. Cálculo de datos derivados (Totales/Subtotales) sin guardar variables innecesarias en el estado.

No me des el código solucionado, solo explícame analíticamente si conceptualmente estoy aplicando buenas prácticas.

```

---

## Checklist de Validación Final

Confirma que la aplicación responde a las siguientes pruebas antes de dar por finalizado el Live coding:

- [ ] **Persistencia:** Al añadir un producto y refrescar la página ($F5$), el carrito se mantiene.

- [ ] **Sincronización:** Modificar la cantidad en `CartPage` actualiza el contador del `Header` al instante.

- [ ] **Wishlist:** El botón de favoritos persiste su estado activo/inactivo en la base de datos.

- [ ] **Cálculos:** El desglose del pedido (Subtotal, Envío y Total) se recalcula correctamente.

- [ ] **Feedback UX:** Se muestran indicadores visuales de carga (`loading`) y avisos de error.

---
