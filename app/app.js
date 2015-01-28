var hg = require('mercury');
var h = require('mercury').h;

function App() {
  var state = hg.state({
    addTodo: hg.value('foo'),
    channels: {
      change: setText
    }
  });
  return state;
}

function setText(state, data) {
  state.addTodo.set(data.addTodo);
}

App.render = function render(state) {
  return h('div.container', [
    h('div.row', [
      h('h1', 'Hello World')
    ]),
    h('div.row'), [
      h('div-col-md-12', [
        h('input', {
          value: state.addTodo,
          name: 'addTodo',
          type: 'text',
          'ev-event': hg.sendChange(state.channels.change)
        }),
        h('p', state.addTodo)
      ])
    ]
  ]);
};

hg.app(document.body, App(), App.render);