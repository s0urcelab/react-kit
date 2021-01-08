/* eslint-disable */

import React, { Component } from 'react';
import './index.scss';

const ICON_SVG = {
    checked: <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M10.707,16.707 c-0.391,0.391-1.024,0.391-1.414,0L6,13.414C5.61,13.024,5.61,12.39,6,12l0,0c0.39-0.39,1.024-0.39,1.414,0L10,14.586L16.586,8 C16.976,7.61,17.61,7.61,18,8v0c0.39,0.39,0.39,1.024,0,1.414L10.707,16.707z"/>,
    incomplete: <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M16,13H8 c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"/>,
    unchecked: <path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 5 C 21 3.9069372 20.093063 3 19 3 L 5 3 z M 5 5 L 19 5 L 19 19 L 5 19 L 5 5 z"/>,
}
const noop = () => {};

class Checkbox extends Component {
    static defaultProps = {
        defaultChecked: false,
        incomplete: false,
        disabled: false,
        className: '',
        onClick: noop,
    }

    constructor(props) {
        super(props);
        this.state = {
            checked: props.defaultChecked
        }
    }

    _isControlled = () => {
        return this.props.hasOwnProperty('checked')
    }

    onClick = (lastChecked) => {
        if (!this._isControlled()) {
            this.setState({
                checked: !lastChecked
            })
        }

        this.props.onChange(!lastChecked)
    }

    render() {
        const {
            checked: sValue,
        } = this.state
        const {
            checked: pValue,
            incomplete,
            disabled,
            className,
        } = this.props;

        const checked = this._isControlled() ? pValue : sValue
        return (
            <div
                className={`r-checkbox ${className}`}
                onClick={disabled ? noop : () => this.onClick(checked)}
            >
                <div
                    className={`checkbox-item ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} ${className}`}
                >
                    <svg viewBox="3 3 18 18" fill="currentColor">
                        {
                            checked
                                ? incomplete
                                    ? ICON_SVG.incomplete
                                    : ICON_SVG.checked
                                : ICON_SVG.unchecked
                        }
                    </svg>
                </div>
                {
                    this.props.children && (
                        <div className="checkbox-label">
                            { this.props.children }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Checkbox;
