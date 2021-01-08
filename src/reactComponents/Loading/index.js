/* eslint-disable */

import React, { Component } from 'react';
import './index.scss';

function createArray(num) {
    const arr = [];
    for(let i = 0; i < num; i ++) {
        arr.push(i);
    }

    return arr;
}

class Loading extends Component {
    static defaultProps = {
        className: '',
        barClassName: '',
        barNumber: 5,
        barColor: '#f70'
    }

    render() {
        const {
            className,
            barClassName,
            barNumber,
            barColor,
            ...rest
        } = this.props;
        return (
            <div className={`loading-container ${className}`}>
                <div className="line-scale-pulse-out">
                    {
                        createArray(barNumber)
                            .map(() => (
                                <div className={barClassName} style={{ backgroundColor: barColor }} />
                            ))
                    }
                </div>
            </div>
        );
    }
}

export default Loading;
