var redux = require('redux')
var h = require('hyperscript')
var morphdom = require('morphdom')

var reducer = require('./reducer')
var productsTemplate = require('./views/products')
var cartTemplate = require('./views/cart')

var main = document.querySelector('main')
var app = document.createElement('div')
main.appendChild(app)

var initialState = {
  products: [
    {id: 1, name: 'The Punisher', price: 120.50, details: 'For wen some1s been real naughty'},
    {id: 2, name: 'Big Stan', price: 1100.29, details: 'Really Robs your Schneider'},
    {id: 3, name: 'Kingdom of Rear', price: 69.69, details: 'Song of the Sausage Creature'},
    {id: 4, name: 'Bangers and Mash', price: 4.20, details: 'A full english breakfast'}
  ],
  cart: { }
}

var store = redux.createStore(reducer, initialState)

store.subscribe(function () {
  var state = store.getState()
  var view = render(state, store.dispatch)
  morphdom(app, view)
})

store.dispatch({type: 'INIT'})

function render (state, dispatch) {
  return h('div#app', {}, [
    productsTemplate(state.products, dispatch),
    cartTemplate(state, dispatch)
  ])
}
