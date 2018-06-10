import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import FA from '@fortawesome/react-fontawesome';
import { noop } from 'lodash';

import styles from './Todo.module.scss';

const cx = classnames.bind(styles);

class Todo extends Component {
  static propTypes = {
    isImportant: PropTypes.bool,
    isDone: PropTypes.bool,
    dueDate: PropTypes.string,
    attachFile: PropTypes.any,
    comments: PropTypes.array,
    onCheck: PropTypes.func,
    onStar: PropTypes.func,
    onEdit: PropTypes.func
  };

  static defaultProps = {
    isImportant: false,
    isDone: false,
    dueDate: '',
    attachFile: null,
    comments: [],
    onCheck: noop,
    onStar: noop,
    onEdit: noop
  };

  handleCheck = event => {
    event.stopPropagation();
    this.props.onCheck();
  };

  handleStar = event => {
    event.stopPropagation();
    this.props.onStar();
  };

  handleEdit = event => {
    event.stopPropagation();
    this.props.onEdit();
  };

  render() {
    const { isImportant, isDone } = this.props;
    return (
      <div className={cx('todo', { important: isImportant, done: isDone })}>
        <div className={cx('main')}>
          <h2 className={cx('title', 'todo-title')}>
            這是我的一個測試的代辦事項
          </h2>
          <div className={cx('todo-operations')}>
            <span className={cx('star')} onClick={this.handleStar}>
              {isImportant ? '★' : '☆'}
            </span>
            <span
              className={cx('icon', 'pencil-icon')}
              onClick={this.handleEdit}
            >
              <FA icon={['fa', 'pencil-alt']} />
            </span>
          </div>
        </div>
        {!isDone && (
          <div className={cx('hint')}>
            <span className={cx('icon', 'calendar-icon')}>
              <FA icon={['fa', 'calendar-alt']} />
            </span>
            <span className={cx('icon', 'file-icon')}>
              <FA icon={['fa', 'file']} />
            </span>
            <span className={cx('icon', 'comment-dots-icon')}>
              <FA icon={['fa', 'comment-dots']} />
            </span>
          </div>
        )}
        <div className={cx('todo-checkbox')}>
          <input
            type="checkbox"
            id="todo-check"
            checked={isDone}
            onChange={this.handleCheck}
          />
          <label htmlFor="todo-check" className={cx('checkbox')}>
            <FA icon={['fa', 'check']} />
          </label>
        </div>
      </div>
    );
  }
}

export default Todo;
