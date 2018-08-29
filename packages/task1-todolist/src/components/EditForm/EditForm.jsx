import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import FA from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { isValid, format } from 'date-fns';

import styles from './EditForm.module.scss';

const cx = classnames.bind(styles);

class EditForm extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dueDate:
      PropTypes.oneOfType[(PropTypes.string, PropTypes.instanceOf(Date))],
    attachFile: PropTypes.any,
    comment: PropTypes.string
  };

  static defaultProps = {
    dueDate: '',
    attachFile: '',
    comment: ''
  };

  handleInputChange = null;
  handleBlur = null;

  _handleInputChange = props => key => event => {
    props.setFieldValue(key, event.target.value);
  };

  _handleBlur = props => key => event => {
    props.setFieldTouched(key, true, true);
  };

  parseDate = date => {
    const d = new Date(date);
    if (!isValid(d)) return false;
    return {
      date: format(d, 'YYYY-MM-DD'),
      time: format(d, 'HH:mm')
    };
  };

  render() {
    const { id, dueDate, attachFile, comment } = this.props;
    const formID = `todo-form-${id}`;
    const parsedDate = this.parseDate(dueDate);

    return (
      <Formik
        initialValues={{
          date: parsedDate ? parsedDate.date : '',
          time: parsedDate ? parsedDate.time : '',
          file: attachFile || '',
          comment: ''
        }}
      >
        {formikProps => {
          const {
            values,
            errors,
            touched,
            dirty,
            isSubmitting,
            handleSubmit,
            handleReset
          } = formikProps;
          this.handleInputChange = this._handleInputChange(formikProps);
          this.handleBlur = this._handleBlur(formikProps);

          return (
            <div key={formID} className={cx('form-container')}>
              <form
                className={cx('edit-form')}
                id={formID}
                onSubmit={handleSubmit}
              >
                <fieldset>
                  <div className={cx('title')}>
                    <span className={cx('icon', 'calendar-icon')}>
                      <FA icon={['fa', 'calendar-alt']} />
                    </span>
                    <label
                      htmlFor="form-date"
                      className={cx('sub-title', 'due-time')}
                    >
                      Deadline
                    </label>
                  </div>
                  <div className={cx('input-area')}>
                    <input
                      type="date"
                      id="form-date"
                      className={cx('text')}
                      value={values.date}
                      onChange={this.handleInputChange('date')}
                      onBlur={this.handleBlur('date')}
                    />
                    <input
                      type="time"
                      className={cx('text')}
                      value={values.time}
                      onChange={this.handleInputChange('time')}
                      onBlur={this.handleBlur('time')}
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <div className={cx('title')}>
                    <span className={cx('icon', 'file-icon')}>
                      <FA icon={['fa', 'file']} />
                    </span>
                    <label htmlFor="form-file" className={cx('sub-title')}>
                      File
                    </label>
                  </div>
                  <div className={cx('input-area')}>
                    <label htmlFor="form-file">
                      <input
                        type="file"
                        id="form-file"
                        value={values.file}
                        onChange={this.handleInputChange('file')}
                        onBlur={this.handleBlur('file')}
                      />
                      <div className={cx('form-file-desc')}>
                        <p className="filename">filename</p>
                        <em className={cx('remark')}>uploaded yesterday</em>
                      </div>
                      <div className={cx('upload-btn')}>
                        <FA icon={['fa', 'plus']} />
                      </div>
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <div className={cx('title')}>
                    <span className={cx('icon', 'comment-dots-icon')}>
                      <FA icon={['fa', 'comment-dots']} />
                    </span>
                    <label htmlFor="form-comment" className={cx('sub-title')}>
                      Comment
                    </label>
                  </div>
                  <div className={cx('input-area')}>
                    <textarea
                      id="form-comment"
                      className={cx('text')}
                      value={values.comment}
                      onChange={this.handleInputChange('comment')}
                      onBlur={this.handleBlur('comment')}
                    />
                  </div>
                </fieldset>
              </form>
              <div className={cx('button-group')}>
                <button type="button" className={cx('cancel')}>
                  <FA icon={['fa', 'times']} />
                  <span>Cancel</span>
                </button>
                <button type="submit" className={cx('save')} form={formID}>
                  <FA icon={['fa', 'plus']} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }
}

export default EditForm;
