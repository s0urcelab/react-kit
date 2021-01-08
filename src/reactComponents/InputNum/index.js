/* eslint-disable */

import React, { Component } from 'react';
import './index.scss';

const noop = () => {};

class InputNum extends Component {
    static defaultProps = {
        className: '',
        defaultValue: '',
        allowDecimal: false,
        min: -Infinity,
        max: +Infinity,
        onChange: noop,
    }

    static isNumber = num => num === +num

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
        }
    }

    checkInputValid = (input) => {
        const { min, max } = this.props
        return InputNum.isNumber(+input) && (+input <= max && +input >= min)
    }

    _getParam() {
        const {
            value: pValue,
        } = this.props;
        const {
            value: sValue,
        } = this.state;

        const value = (pValue === undefined) ? sValue : pValue;

        return {
            value,
        };
    }

    // handler
    handleChange = (e) => {
        const { allowDecimal } = this.props
        const { value } = this._getParam()
        const nextVal = e.target.value
        const isPass = this.checkInputValid(nextVal)
        if (isPass) {
            this.setState({ value: allowDecimal ? nextVal : nextVal.replace(/\./g, '') })
        }
        this.props.onChange(isPass ? nextVal : value)
    }

    render() {
        const {
            className,
            onChange,
            innerRef,
            defaultValue,
            type,
            allowDecimal,
            ...rest
        } = this.props

        const { value } = this._getParam()

        // render
        return (
          <div className={`input-number-wrapper ${className}`}>
              <input
                type="text"
                {...rest}
                value={value}
                onChange={this.handleChange}
                ref={innerRef}
              />
          </div>
        )
    }
}

export default InputNum;
