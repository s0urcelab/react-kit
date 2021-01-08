/**
 *  @Author  : s0urce <apao@douyu.tv>
 *  @Date    : 2020/6/15
 *  @Declare : DayPicker
 *
 */
/* eslint-disable */

import React, { Component } from 'react';
import moment from 'moment';

const TODAY = moment();
const noop = () => {};

// tool function
const dateMonth = base => ({
    prev: moment(base).subtract(1, 'month'),
    curr: moment(base),
    next: moment(base).add(1, 'month'),
});

const fixer = base => (over, monthDays, isPre = true) => {
    const lt = Array
        .from({ length: over })
        .map((_, i) => ({
            text: monthDays - over + 1 + i,
            date: dateMonth(base)[isPre ? 'prev' : 'curr'].date(monthDays - over + 1 + i),
        }));

    const rt = Array
        .from({ length: 7 - over })
        .map((_, i) => ({
            text: 1 + i,
            date: dateMonth(base)[isPre ? 'curr' : 'next'].date(1 + i),
        }));
    return [...lt, ...rt];
};

const rx = base => first => Array
    .from({ length: 7 })
    .map((_, i) => ({
        text: first + i,
        date: moment(base)
            .date(first + i),
    }));

class DayPicker extends Component {
    static weekDays = ['一', '二', '三', '四', '五', '六', '日']

    _getParam = (base) => {
        return {
            currWeekday: moment(base).date(1).isoWeekday(), // 当月第1天星期数
            lastMonthDays: moment(base).subtract(1, 'month').daysInMonth(), // 上月天数
            currMonthDays: moment(base).daysInMonth(), // 当月天数
        };
    }

    render() {
        const {
            className,
            disabledDate,
            format,
            base,
            current,
            switchBase,
            dateOnClick,
            transPicker,
        } = this.props;
        const {
            currWeekday,
            lastMonthDays,
            currMonthDays,
        } = this._getParam(base);

        const head = currWeekday - 1;
        const totalDays = head + currMonthDays;
        const innerRow = Math.floor(totalDays / 7) - 1;
        const tail = totalDays % 7;

        const prefix = fixer(base)(head, lastMonthDays, true);
        const suffix = fixer(base)(tail, currMonthDays, false);

        const innerMatrix = Array
            .from({ length: innerRow })
            .map((_, i) => rx(base)(9 - currWeekday + i * 7));

        // render td cell
        const tdRender = curr => ({ date, text }, idx) => {
            const isSelected = date.isSame(curr, 'day');
            const isToday = date.isSame(TODAY, 'day');
            const belong = date.isSame(base, 'month');
            const disabled = disabledDate(date);

            return (
                <td
                    key={idx}
                    className={`picker-cell ${belong ? 'belong' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                    title={!disabled ? date.format(format) : ''}
                    onClick={!disabled ? () => dateOnClick(date) : noop}
                >
                    <div className="cell-box">{text}</div>
                </td>
            );
        };

        return (
            <div className={`r-datepicker-dropdown day-picker ${className}-dropdown`}>
                <header className="date-dropdown-header">
                    <button className="opt prev-year" onClick={() => switchBase(moment(base).subtract(1, 'year'))}>«</button>
                    <button className="opt prev-month" onClick={() => switchBase(moment(base).subtract(1, 'month'))}>‹</button>
                    <div className="opt title">
                        <span onClick={() => transPicker('year')}>{base.format('YYYY年')}</span>
                        <span onClick={() => transPicker('month')}>{base.format('M月')}</span>
                    </div>
                    <button className="opt next-month" onClick={() => switchBase(moment(base).add(1, 'month'))}>›</button>
                    <button className="opt next-year" onClick={() => switchBase(moment(base).add(1, 'year'))}>»</button>
                </header>
                <div className="date-dropdown-body">
                    <table className="picker-table">
                        <thead className="week-bar">
                        <tr>
                            {
                                DayPicker.weekDays.map((text, idx) => <th key={idx}>{text}</th>)
                            }
                        </tr>
                        </thead>
                        <tbody>
                        <tr>{ prefix.map(tdRender(current)) }</tr>
                        {
                            innerMatrix.map((rowList, idx) => <tr key={idx}>{ rowList.map(tdRender(current)) }</tr>)
                        }
                        <tr>{ suffix.map(tdRender(current)) }
                        </tr>
                        </tbody>
                    </table>
                </div>
                <footer className="date-dropdown-footer">
                    <button className={`today-btn ${disabledDate(TODAY) ? 'disabled' : ''}`} onClick={() => dateOnClick(TODAY)} disabled={disabledDate(TODAY)}>今天</button>
                </footer>
            </div>
        )
    }
}

export default DayPicker;
