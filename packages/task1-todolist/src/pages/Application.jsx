import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { context } from '../context/';
import Todo from '../components/Todo/Todo';

import styles from './Application.module.scss';

const cx = classnames.bind(styles);

class Application extends Component {
  state = {
    selected: 'all', // all, doing, done
    taskDescription: ''
  };

  handleRadio = key => event => {
    event.stopPropagation();
    this.setState({ selected: key });
  };

  handleInput = event => {
    event.stopPropagation();
    this.setState({ taskDescription: event.target.value });
  };

  handleEnter = event => {
    const { taskDescription } = this.state;
    const {
      todosState: { actions }
    } = this.props;

    if (event.key !== 'Enter' || !taskDescription) return;

    actions.addTodo(taskDescription);
    this.setState({ taskDescription: '' });
  };

  handleEdit = (id, obj) => () => {
    const {
      todosState: { actions }
    } = this.props;
    actions.editTodo(id, obj);
  };

  getFilteredTodos(type) {
    const {
      todosState: { todos }
    } = this.props;
    switch (type) {
      case 'all':
        return todos;
      case 'doing':
        return todos.filter(todo => !todo.isDone);
      case 'done':
        return todos.filter(todo => todo.isDone);
      default:
        return todos;
    }
  }

  renderHeader() {
    const { selected } = this.state;
    return (
      <header className={cx('header')}>
        <label className={cx('category')}>
          <input
            type="radio"
            value="all"
            checked={selected === 'all'}
            onChange={this.handleRadio('all')}
          />
          <span>My Tasks</span>
        </label>
        <label className={cx('category')}>
          <input
            type="radio"
            value="doing"
            checked={selected === 'doing'}
            onChange={this.handleRadio('doing')}
          />
          <span>In Progress</span>
        </label>
        <label className={cx('category')}>
          <input
            type="radio"
            value="done"
            checked={selected === 'done'}
            onChange={this.handleRadio('done')}
          />
          <span>Completed</span>
        </label>
      </header>
    );
  }

  renderInput() {
    const { taskDescription } = this.state;
    return (
      <div className={cx('add-task')}>
        <input
          type="text"
          placeholder="＋ Add Task"
          value={taskDescription}
          onChange={this.handleInput}
          onKeyPress={this.handleEnter}
        />
      </div>
    );
  }

  renderTodos() {
    return (
      <main className={cx('todos')}>
        {this.getFilteredTodos(this.state.selected).map(todo => (
          <Todo
            key={todo.id}
            id={todo.id}
            isImportant={todo.isImportant}
            isDone={todo.isDone}
            desc={todo.desc}
            dueDate={todo.dueDate}
            attachFile={todo.attachFile}
            comments={todo.comments}
            onCheck={this.handleEdit(todo.id, { isDone: !todo.isDone })}
            onStar={this.handleEdit(todo.id, {
              isImportant: !todo.isImportant
            })}
            // onEdit
          />
        ))}
      </main>
    );
  }

  renderFooter() {
    return (
      <footer className={cx('status', 'footer')}>
        {`${this.getFilteredTodos('doing').length} tasks left`}
      </footer>
    )
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderInput()}
        {this.renderTodos()}
        {this.renderFooter()}
      </>
    );
  }
}

export default props => (
  <context.todos.Consumer>
    {todos => <Application {...props} todosState={todos} />}
  </context.todos.Consumer>
);
