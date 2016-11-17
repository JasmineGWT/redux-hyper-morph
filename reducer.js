var clone = require('clone')

module.exports = function reducer (state, action) {
  var newState = clone(state)
  var cart = newState.cart
  var productId = action.payload

  switch (action.type) {
    case 'INIT':
      return newState
    case 'REMOVE_FROM_CART':

      cart[productId] = cart[productId] - 1
      if (!cart[productId]) {
        delete cart[productId]
      }
      return newState

    case 'ADD_TO_CART':

      cart[productId] = cart[productId] + 1 || 1
      return newState
    case 'TOGGLE_DETAILS':
      var product = newState.products.find(product => product.id === action.payload)
      product.showDetails = !product.showDetails
      return newState
  }
  return newState
}
