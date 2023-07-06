import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      const totalPriceOfItem = item => {
        const {price, quantity} = item
        return price * quantity
      }

      const allTotal = () => {
        const actualPrice = cartList.map(item => totalPriceOfItem(item))
        const totalPrice = actualPrice.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        )

        return totalPrice
      }

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
                  type="button"
                  className="remove-all-button"
                  onClick={onClickRemoveAll}
                >
                  Remove all
                </button>
                <CartListView />
                <div className="summary-container">
                  <h1 className="order-total">
                    Order Total{' '}
                    <span className="total-price">Rs {allTotal()}</span>
                  </h1>
                  <p className="no-of-items">{cartList.length}Items in cart</p>
                  <button type="button" className="checkout-button">
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
