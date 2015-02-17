var hg = require('mercury');
var h = require('mercury').h;
var ee = require('../../flow');

function newTodoComponent() {
  return hg.state({
    addTodo: hg.value('foo'),
    channels: {
      change: function(state, data) {
        console.log(data.newTodo);
        state.addTodo.set(data.newTodo)
      },
      submit: function(state) {
        console.log(state.addTodo());
        ee.emit('post', {
          action: 'create',
          object: {
            type: 'todo',
            todo: state.addTodo()
          }
        });
      }
    }
  });
}

function render(state) {
//   return h('h1', 'New Todo');
  return h('.col-md-12', [
    h('.row', [
      h('form', [
        h('input', { 
          type: 'text', 
          name: 'newTodo', 
          'ev-event': hg.sendChange(state.newTodo.channels.change),
          value: state.newTodo.addTodo
        }),
        h('btn.btn.btn-primary', { 'ev-click': hg.send(state.newTodo.channels.submit) }, 'Add Todo')
      ])
    ])
  ])
}

newTodoComponent.render = render;
module.exports = newTodoComponent;