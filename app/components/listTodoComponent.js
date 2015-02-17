var hg = require('mercury');
var h = require('mercury').h;
var anchor = require('mercury-router').anchor;
function listTodoComponent() {
  var state = hg.state({
    todos: hg.value([])
  });
  
  return state;
}

function render(state) {
  return h('.col-md-12', [
    h('.row', h('h1', 'Todo List')),
    h('.row', [
      h('.col-md-2.col-md-offset-10', anchor({ href: '/todo/new' }, 'New Todo'))
    ])
  ]);
  
}

listTodoComponent.render = render;
module.exports = listTodoComponent;