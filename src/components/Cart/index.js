import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const onclickremoveBtn = () => {
        removeAllCartItems([])
      }

      const totalBillData = () => {
        let total = 0
        cartList.forEach(each => {
          total += each.price * each.quantity
        })
        return total
      }

      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>

                <button
                  className="remove-all-paragraph"
                  type="button"
                  onClick={onclickremoveBtn}
                >
                  Remove All
                </button>
                <CartListView />
                <div className="order-total-bill-collects-by-consumer">
                  <h1 className="order-total-bill-heading">
                    <span className="spanorder-total">Order Total :</span>Rs
                    {totalBillData()}/-
                  </h1>
                  <p className="len-of-cart-list">
                    {cartList.length} items in cart
                  </p>
                  <button type="button" className="checkoutbtn">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
