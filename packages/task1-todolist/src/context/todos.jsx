import React, { Component } from 'react';
import { noop, isString, merge, uniqueId, pick, isObject } from 'lodash';

export const cx = React.createContext('todos');

function pruneTodo(todo) {
  return pick(todo, [
    'id',
    'desc',
    'dueDate',
    'attachFile',
    'comments',
    'isImportant',
    'isDone',
    'timestamp'
  ]);
}

function getDefaultTodo() {
  return {
    id: uniqueId('todo_'),
    desc: '',
    dueDate: '',
    attachFile: null,
    comments: [],
    isImportant: false,
    isDone: false,
    timestamp: new Date()
  };
}

class Provider extends Component {
  constructor(props) {
    super(props);

    // The state can be accessed by
    // <cx.Consumer>{state => {}}</cx.Consumer>
    this.state = {
      todos: [],
      actions: {
        addTodo: this.addTodo,
        removeTodo: this.removeTodo,
        editTodo: this.editTodo,
      }
    };
  }

  // Define state updaters (actions) by class methods
  // TBD: complete state updaters

  addTodo = desc => {
    if (!desc || !isString(desc)) return;
    const newTodo = merge(getDefaultTodo(), { desc });
    this.setState(prev => ({ todos: prev.todos.concat(newTodo) }));
  }

  removeTodo = id => {
    const newTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos });
  }

  editTodo = (id, obj) => {
    if (!id || !isObject(obj)) return;
    const newTodos = this.state.todos.map(todo => {
      if (todo.id !== id) return todo;
      return merge(todo, pruneTodo(obj));
    });
    this.setState({ todos: newTodos });
  }

  render() {
    return <cx.Provider value={this.state}>{this.props.children}</cx.Provider>;
  }
}

// The name will be shown in devtool
Provider.displayName = 'TodosContextProvider';

export default {
  Provider,
  Consumer: cx.Consumer
};
