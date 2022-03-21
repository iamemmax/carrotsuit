import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      text = '',
      type,
      placeholder = text,
      handleChange,
      name,
      value,
      id = name,
      required = false,
      style
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name} style={{ float: 'left', fontSize: 'small' }}>
          {placeholder} <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          style={style}
          required={required}
          name={name}
          value={value}
          id={id}
          type={type}
          onChange={handleChange}
          className="form-control"
        />
      </div>
    );
  }
}

export default Input;
