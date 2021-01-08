import React, { Component, cloneElement } from 'react';
import Input from "../Input";
import Dropdown from "../Modal/dropdown";

import './index.scss';

const noop = () => {};

function Option(props) {
    const {
        className = '',
        value,
        disabled,
        title,
        children,
        selectedValue,
        onClick,
    } = props
    return (
        <li
            key={value || children}
            className={`select-option ${className} ${selectedValue === value ? 'selected' : ''}`}
            onClick={e => onClick(e, {
                value,
                children,
                key: value || children,
            })}
        >
            {children}
        </li>
    )
}

class Select extends Component {
    // make it easy to call Option
    static Option = Option
    static defaultProps = {
        className: '',
        defaultValue: '',
        placeholder: '请选择',
        notFoundContent: '暂无数据',
        showSearch: false,
        onSelect: noop,
        onDropdownVisibleChange: noop,
    }

    constructor(props) {
        super(props);
        this._isControlled = props.hasOwnProperty('value')
        this._hasOptions = props.hasOwnProperty('options')
        this.state = {
            selectedValue: props.defaultValue,
            expand: false,
            inputValue: '',
            holder: props.placeholder,
        };
        this.input = null
    }

    _getParam() {
        const {
            value: pValue,
        } = this.props;
        const {
            selectedValue: sValue,
        } = this.state;

        return this._isControlled ? pValue : sValue;
    }

    optOnClick = (e, opt) => {
        e.stopPropagation();

        this.setState({
            selectedOpt: opt,
            selectedValue: opt.value,
            expand: false,
            inputValue: opt.children,
        });
        this.props.onDropdownVisibleChange(false)
        this.props.onSelect(opt.value, opt);
    }

    backfill = () => {
        this.setState(({ inputValue }) => ({
            inputCache: selected.label || ''
        }))
    }

    inputOnBlur = () => {
        this.backfill()
        this.setState({ expand: false })
        this.props.onDropdownVisibleChange(false)
    }

    inputOnChange = (val) => {
        this.setState({ inputCache: val })
    }

    inputOnClick = () => {
        if (!this.state.inputValue) {
            this.setState({ expand: true })
            this.props.onDropdownVisibleChange(true)
        }
        if (!this.state.expand) {
            // this.intoDeep()
            this.setState({ expand: true })
            this.props.onDropdownVisibleChange(true)
        } else {
            // this.backfill()
            this.setState({ expand: false })
            this.props.onDropdownVisibleChange(false)
        }
    }

    renderOptions = () => {
        const selectedValue = this._getParam();
        const {
            options,
            notFoundContent,
        } = this.props
        return (
            <ul className="options-list">
                {
                    options.map(item => {
                        const { value, label } = item
                        return (
                            <Option
                                key={value || label}
                                value={value}
                                selectedValue={selectedValue}
                                onClick={this.optOnClick}
                            >
                                {label}
                            </Option>
                        )
                    })
                }
                {
                    !options.length && (
                        <li className="not-found">{notFoundContent}</li>
                    )
                }
            </ul>
        )
    }

    renderChildren = () => {
        const selectedValue = this._getParam();
        const {
            children,
            notFoundContent,
        } = this.props
        return (
            <ul className="options-list">
                {
                    React.Children.map(children, (child) => {
                        if (child.type === Option) {
                            return cloneElement(child, {
                                selectedValue,
                                onClick: this.optOnClick,
                            })
                        }
                        return child
                    })
                }
                {
                    !React.Children.count(children) && (
                        <li className="not-found">{notFoundContent}</li>
                    )
                }
            </ul>
        )
    }

    render() {
        const {
            inputCache,
            expand,
            holder,
        } = this.state
        const {
            className,
            showSearch,
            placeholder,
        } = this.props

        return (
            <div
                className={`r-select ${className} ${expand ? 'opt-expand' : 'opt-collapse'}`}
            >
                <Input
                    className={`select-input ${showSearch ? '' : 'readonly'}`}
                    innerRef={ref => this.input = ref}
                    readonly={!showSearch}
                    value={inputCache}
                    placeholder={holder || placeholder}
                    // onFocus={this.inputOnFocus}
                    onClick={this.inputOnClick}
                    onChange={this.inputOnChange}
                    onBlur={this.inputOnBlur}
                >
                    <i className="select-icon"/>
                </Input>
                <Dropdown
                    baseRef={this.input}
                    className={`r-select-dropdown ${className}-dropdown`}
                    visible={expand}
                >
                    {
                        this._hasOptions
                            ? this.renderOptions()
                            : this.renderChildren()
                    }
                </Dropdown>
            </div>
        )
    }
}

export default Select
