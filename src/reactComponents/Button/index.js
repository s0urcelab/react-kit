/* eslint-disable */

import React, { Component } from 'react';
import './index.scss';

const noop = () => { };

class Button extends Component {
    static defaultProps = {
        hollow: false,
        big: false,
        className: '',
        disabled: false,
        onClick: noop,
    }

    render() {
        const {
            big,
            hollow,
            className,
            disabled,
            onClick,
            style,
        } = this.props;
        return (
            <button
                style={style}
                className={`r-button ${hollow ? 'hollow' : 'fill'} ${big ? 'size-big' : 'size-normal'} ${disabled ? 'disabled' : ''} ${className}`}
                onClick={onClick}
                disabled={disabled}
            >
                {this.props.children}
            </button>
        );
    }
}

export default Button;
