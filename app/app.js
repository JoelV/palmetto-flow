var hg = require('mercury');
var h = require('mercury').h;
var page = require('page');
var RouterComponent = require('mercury-router');
var anchor = RouterComponent.anchor;
var Router = RouterComponent; 
var listTodoComponent = require('./components/listTodoComponent');
var newTodoComponent = require('./components/newTodoComponent');
var ee = require('./flow');

ee.emit('post', { foo: 'bar' });
function App() {
  var state = hg.state({
    ref: hg.value('/'),
    todos: listTodoComponent(),
    newTodo: newTodoComponent(),
    route: Router()
  });
  
  return state;
}


// function setText(state, data) {
//   state.addTodo.set(data.addTodo);
// }

App.render = function render(state) {
  var content;
 
  return h('div.container', [
    h('div.row', [
      h('ul.nav.nav-tabs', [
        h('li', anchor({ href: '/' }, 'Home')),
        h('li', anchor({ href: '/todo/list' }, 'Todos'))
      ])
    ]),
    h('div.row'), [
      RouterComponent.render(state, {
        '/': function() {
          return h('h1', 'Welcome To the App');
        },
        '/todo/list': function() {
          return listTodoComponent.render(state);
        },
        '/todo/new': function() {
          return newTodoComponent.render(state);
        }
      })
    ]
  ]);
};

hg.app(document.body, App(), App.render);