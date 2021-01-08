/**
 *  @Author  : s0urce <apao@douyu.tv>
 *  @Date    : 2020/6/15
 *  @Declare : YearPicker
 *
 */
/* eslint-disable */

import React, { Component } from 'react';
import moment from 'moment';

const noop = () => {};

const rx = base => first => Array
    .from({ length: 3 })
    .map((_, i) => {
        const date = moment(base).add(first + i - 2, 'year');
        return {
            date,
            text: date.format('YYYY'),
        };
    });

function YearPicker(props) {
    const {
        className,
        disabledDate,
        format,
        base,
        current,
        switchBase,
        dateOnClick,
    } = props;

    const period = {
        start: moment(base),
        end: moment(base).add(9, 'year'),
    };

    const innerMatrix = Array
        .from({ length: 4 })
        .map((_, i) => rx(base)(i * 3 + 1));

    // render td cell
    const tdRender = curr => ({ date, text }, idx) => {
        const isSelected = date.isSame(curr, 'month');
        const disabled = disabledDate(date);
        const belong = date.isBetween(period.start, period.end, 'year', '[]');
        return (
            <td
                key={idx}
                className={`picker-cell ${belong ? '' : 'outside'} ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                title={!disabled ? date.format(format) : ''}
                onClick={!disabled ? () => dateOnClick(date) : noop}
            >
                <div className="cell-box">{text}</div>
            </td>
        );
    };

    return (
        <div className={`r-datepicker-dropdown year-picker ${className}-dropdown`}>
            <header className="date-dropdown-header">
                <button className="opt prev-year" onClick={() => switchBase(moment(base).subtract(10, 'year'))}>«</button>
                <div className="title">{period.start.format('YYYY')}~{period.end.format('YYYY')}</div>
                <button className="opt next-year" onClick={() => switchBase(moment(base).add(10, 'year'))}>»</button>
            </header>
            <div className="date-dropdown-body">
                <table className="picker-table">
                    <tbody>
                    {
                        innerMatrix.map((rowList, idx) => (
                            <tr key={idx}>{rowList.map(tdRender(current))}</tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default YearPicker;
