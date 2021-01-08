/* eslint-disable */

import React, { Component } from 'react';
import moment from 'moment';
import Input from '../Input';
import Dropdown from '../Modal/dropdown';
import DayPicker from "./dayPicker"
import MonthPicker from "./monthPicker"
import YearPicker from "./yearPicker"
import './index.scss';

// constant
const TODAY = moment();
const CONFIG = {
    day: {
        component: DayPicker,
        gra: ['year', 'month', 'date'],
        format: 'YYYY-MM-DD',
        name: '日期',
    },
    month: {
        component: MonthPicker,
        gra: ['year', 'month'],
        format: 'YYYY-MM',
        name: '月份',
    },
    year: {
        component: YearPicker,
        gra: ['year'],
        format: 'YYYY',
        name: '年份',
    },
}
const noop = () => {};
const fallbackFormat = (date, format) => moment(date).isValid() ? date.format(format) : ''

class DatePicker extends Component {
    static defaultProps = {
        className: '',
        defaultValue: null,
        disabled: false,
        onChange: noop,
        disabledDate: noop,
    }

    constructor(props) {
        super(props);
        const init = (props) => ({
            picker: props.picker,
            currDate: props.hasOwnProperty('value') ? props.value : props.defaultValue,
            currInput: props.hasOwnProperty('value')
                ? fallbackFormat(props.value, props.format)
                : fallbackFormat(props.defaultValue, props.format),
        });
        this.state = {
            pickerVisible: false,
            currBase: null,
            ...init(props),
        };
        this.input = null;
        this.lastDate = null;
    }

    _isControlled = () => {
        return this.props.hasOwnProperty('value')
    }

    _getParam = () => {
        return this._isControlled() ? this.props.value : this.state.currDate
    }

    showPicker = (visible = true) => {
        this.setState({
            ...!visible && { picker: this.props.picker },
            pickerVisible: visible
        })
    }

    // 变换基准日期
    switchBase = (currBase) => {
        this.setState({ currBase });
    }

    setLastDate = (date) => {
        this.lastDate = date
    }

    selectDate = (date, granularity = this.state.picker) => {
        this.setState(({ currDate }) => {
            const nextDate = CONFIG[granularity].gra.reduce((acc, unit) => {
                return acc.set(unit, date.get(unit))
            }, moment(currDate || {}))
            return {
                currDate: nextDate,
                currInput: fallbackFormat(nextDate, this.props.format),
                picker: this.props.picker,
            }
        });
    }

    pickerItemOnClick = (date) => {
        const {
            format,
            onChange,
            picker,
        } = this.props;

        if (!this._isControlled()) {
            this.switchBase(null)
            this.selectDate(date);
            this.setLastDate(date)
        }

        const value = this._getParam()
        if (!date.isSame(value, picker)) {
            onChange(date, fallbackFormat(date, format));
        }

        // restore control value
        if (this._isControlled()) {
            this.setState({
                currDate: value ? moment(value) : null,
                currInput: fallbackFormat(value, format),
            });
            this.setLastDate(value ? moment(value) : null)
        }
        // this.setLastDate(null)
        this.showPicker(false)
    }

    checkInput = () => {
        const { format, disabledDate } = this.props;
        const { currInput } = this.state;
        const strictInput = moment(currInput, format, true);

        return strictInput.isValid() && !disabledDate(strictInput);
    }

    syncPicker = () => {
        const { format } = this.props;
        const { currInput } = this.state;
        this.switchBase(null)
        this.setState({
            currDate: moment(currInput, format, true)
        })
    }

    inputOnFocus = () => {
        const value = this._getParam()
        this.showPicker(true)
        this.setLastDate(value ? moment(value) : null)
    }

    inputOnBlur = () => {
        const { format,
            onChange,
            picker,
            value: propsValue,
        } = this.props;
        const value = this._isControlled() ? propsValue : this.lastDate
        const isInputValid = this.checkInput()
        // remove invalid input
        if (!isInputValid) {
            this.setState(({ currDate }) => ({
                currInput: fallbackFormat(currDate, format)
            }))
        }

        // onchange
        const isAllNull = value === null && this.state.currDate === null
        const isSame = moment(value).isSame(moment(this.state.currDate), picker)
        if (!(isAllNull || isSame)) {
            onChange(this.state.currDate, fallbackFormat(this.state.currDate, format));
        }

        // restore control value
        if (this._isControlled()) {
            this.setState({
                currDate: value ? moment(value) : null,
                currInput: fallbackFormat(value, format),
            });
        }
        this.setLastDate(null)
        this.showPicker(false)
    }

    clearInput = () => {
        if (!this._isControlled()) {
            this.setState({
                currDate: null,
                currInput: '',
            })
        }
        this.props.onChange(null, '');
    }

    inputOnChange = (input) => {
        this.setState({ currInput: input }, () => {
            this.checkInput() && this.syncPicker()
        })
    }

    enterOnPress = (e) => {
        if (e.keyCode === 13) {
            this.input.blur()
        }
    }

    render() {
        const {
            className,
            disabledDate,
            format,
            placeholder,
            disabled,
            onChange,
            picker: originPickerType,
        } = this.props;
        const {
            currDate,
            currBase,
            picker: nowPickerType,
        } = this.state

        const pickerProps = {
            className,
            disabledDate,
            format,
            current: currDate,
            base: currBase || (currDate ? moment(currDate) : TODAY),
            switchBase: this.switchBase,
            dateOnClick: nowPickerType === originPickerType ? this.pickerItemOnClick : this.selectDate,
            transPicker: type => this.setState({ picker: type }),
            onChange,
        }
        const Picker = CONFIG[nowPickerType].component
        return (
            <div
                className={`r-datepicker ${className}`}
            >
                <div className="picker-input">
                    <Input
                        innerRef={ref => this.input = ref}
                        className="input"
                        value={this.state.currInput}
                        onChange={this.inputOnChange}
                        onBlur={this.inputOnBlur}
                        onClick={this.inputOnFocus}
                        onKeyDown={this.enterOnPress}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                    <span className="suffix-icon">
                        <svg viewBox="64 64 896 896" focusable="false" className="calendar-icon" data-icon="calendar" fill="currentColor" aria-hidden="true">
                            <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"/>
                        </svg>
                    </span>
                    {
                        !!this.state.currInput && <span className="clear-btn" onClick={this.clearInput}>×</span>
                    }
                </div>
                <Dropdown
                    baseRef={this.input}
                    visible={this.state.pickerVisible}
                >
                   <Picker
                       {...pickerProps}
                   />
                </Dropdown>
            </div>
        );
    }
}

const PreWrapper = (props) => {
    const defaultFormat = CONFIG[props.picker].format
    const defaultPlaceholder = `请选择${CONFIG[props.picker].name}`
    const placeholder = props.hasOwnProperty('placeholder') ? props.placeholder : defaultPlaceholder
    const format = props.hasOwnProperty('format') ? props.format : defaultFormat
    return <DatePicker {...props} format={format} placeholder={placeholder}/>
}

PreWrapper.defaultProps = {
    picker: 'day',
}

export default PreWrapper;
