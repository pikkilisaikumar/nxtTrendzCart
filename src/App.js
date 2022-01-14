import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const remaningList = cartList.filter(each => each.id !== id)
    this.setState({cartList: remaningList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const availableData = cartList.find(each => each.id === product.id)
    console.log(availableData)
    if (availableData === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const quantityincrementdata = cartList.map(eachone => {
        if (eachone.id === product.id) {
          return {...eachone, quantity: availableData.quantity + 1}
        }
        return {...eachone}
      })
      this.setState({
        cartList: quantityincrementdata,
      })
    }
  }

  //   TODO: Update the code here to implement addCartItem

  removeAllCartItems = removeData => {
    this.setState({cartList: removeData})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const incrementcartList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return {...each}
    })
    this.setState({cartList: incrementcartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const isAvailableData = cartList.find(each => each.id === id)
    if (isAvailableData.quantity > 1) {
      const cartListRemains = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return {...eachItem}
      })
      this.setState({cartList: cartListRemains})
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
