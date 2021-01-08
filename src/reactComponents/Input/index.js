/* eslint-disable */

import React, { Component } from 'react';
import './index.scss';

const noop = () => {};

class Input extends Component {
    static defaultProps = {
        className: '',
        defaultValue: '',
        onChange: noop,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
        }
    }

    _isControlled = () => {
        return this.props.hasOwnProperty('value')
    }

    // handler
    handleChange = (e) => {
        const nextVal = e.target.value
        this.setState({ value: nextVal })
        this.props.onChange(nextVal)
    }

    render() {
        const {
            value: sValue,
        } = this.state
        const {
            className,
            value: pValue,
            innerRef,
            defaultValue,
            type,
            placeholder,
            readonly,
            disabled,
            children,
            onClick,
            onKeyDown,
            onInput,
            onBlur,
            onChange,
            onFocus,
            onKeyUp,
            onKeyPress,
        } = this.props

        const value = this._isControlled() ? pValue : sValue;

        // render
        return (
          <div className={`r-input ${className}`}>
              <input
                type="text"
                value={value}
                ref={innerRef}
                placeholder={placeholder}
                readOnly={readonly}
                disabled={disabled}
                onClick={onClick}
                onChange={this.handleChange}
                onKeyDown={onKeyDown}
                onInput={onInput}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyUp={onKeyUp}
                onKeyPress={onKeyPress}
              />
              {children}
          </div>
        )
    }
}

export default Input;
