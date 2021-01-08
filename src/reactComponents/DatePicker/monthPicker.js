/**
 *  @Author  : s0urce <apao@douyu.tv>
 *  @Date    : 2020/6/15
 *  @Declare : MonthPicker
 *
 */
/* eslint-disable */

import React, { Component } from 'react';
import moment from 'moment';

const noop = () => {};

const rx = base => first => Array
    .from({ length: 3 })
    .map((_, i) => ({
        text: first + i,
        date: moment(base)
            .month(first + i - 1),
    }));

function MonthPicker(props) {
    const {
        className,
        disabledDate,
        format,
        base,
        current,
        switchBase,
        dateOnClick,
        transPicker,
    } = props;

    const innerMatrix = Array
        .from({ length: 4 })
        .map((_, i) => rx(base)(i * 3 + 1));

    // render td cell
    const tdRender = curr => ({ date, text }, idx) => {
        const isSelected = date.isSame(curr, 'month');
        const disabled = disabledDate(date);

        return (
            <td
                key={idx}
                className={`picker-cell ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                title={!disabled ? date.format(format) : ''}
                onClick={!disabled ? () => dateOnClick(date) : noop}
            >
                <div className="cell-box">{text}月</div>
            </td>
        );
    };
    return (
        <div className={`r-datepicker-dropdown month-picker ${className}-dropdown`}>
            <header className="date-dropdown-header">
                <button className="opt prev-year" onClick={() => switchBase(moment(base).subtract(1, 'year'))}>«</button>
                <div className="opt title">
                    <span onClick={() => transPicker('year')}>{base.format('YYYY年')}</span>
                </div>
                <button className="opt next-year" onClick={() => switchBase(moment(base).add(1, 'year'))}>»</button>
            </header>
            <div className="date-dropdown-body">
                <table className="picker-table">
                    <tbody className="month">
                    {
                        innerMatrix.map((rowList, idx) => (
                            <tr key={idx}>
                                {
                                    rowList.map(tdRender(current))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MonthPicker;
