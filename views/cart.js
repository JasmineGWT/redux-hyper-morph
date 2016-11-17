var h = require('hyperscript')

module.exports = ({cart, products}, dispatch) => {
  var cartQty = Object.keys(cart).reduce((sum, id) => sum + cart[id], 0)

  var productsInCart = Object.keys(cart).map(productFinder(products))

  var cartTotal = Object.keys(cart).reduce((sum, id) => {
    var product = productFinder(products)(id)
    return sum + (cart[id] * product.price)
  }, 0)

  return h('div#cart', {}, 'Your cart:', [
    h('ul#productsInCart', {}, productsInCart.map(product => h('li', product.name))),
    h('div#cartQty', {}, `Qty in cart: ${cartQty}`),
    h('div#cartTotal', {}, `Total: $ ${cartTotal.toFixed(2)}`)
  ])
}

var productFinder = (products) => (id) => {
  return products.find(product => Number(id) === product.id)
}
