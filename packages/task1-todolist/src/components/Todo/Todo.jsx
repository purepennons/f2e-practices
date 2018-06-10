import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import FA from '@fortawesome/react-fontawesome';
import { noop } from 'lodash';

import styles from './Todo.module.scss';

const cx = classnames.bind(styles);

class Todo extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isImportant: PropTypes.bool,
    isDone: PropTypes.bool,
    desc: PropTypes.string,
    dueDate: PropTypes.string,
    attachFile: PropTypes.any,
    comments: PropTypes.array,
    onCheck: PropTypes.func,
    onStar: PropTypes.func,
    onEdit: PropTypes.func
  };

  static defaultProps = {
    className: '',
    isImportant: false,
    isDone: false,
    desc: '',
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
    const {
      className,
      id,
      isImportant,
      isDone,
      desc,
      dueDate,
      attachFile,
      comments
    } = this.props;
    return (
      <div
        className={cx(
          'todo',
          { important: isImportant, done: isDone },
          className
        )}
      >
        <div className={cx('main')}>
          <h2 className={cx('title', 'todo-title')}>{desc}</h2>
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
            {dueDate && (
              <span className={cx('icon', 'calendar-icon')}>
                <FA icon={['fa', 'calendar-alt']} />
                <span>{dueDate}</span>
              </span>
            )}
            {attachFile && (
              <span className={cx('icon', 'file-icon')}>
                <FA icon={['fa', 'file']} />
              </span>
            )}
            {comments.length > 0 && (
              <span className={cx('icon', 'comment-dots-icon')}>
                <FA icon={['fa', 'comment-dots']} />
              </span>
            )}
          </div>
        )}
        <div className={cx('todo-checkbox')}>
          <input
            type="checkbox"
            id={`todo-check_${id}`}
            checked={isDone}
            onChange={this.handleCheck}
          />
          <label htmlFor={`todo-check_${id}`} className={cx('checkbox')}>
            <FA icon={['fa', 'check']} />
          </label>
        </div>
      </div>
    );
  }
}

export default Todo;
