/* eslint-disable */

import React, { Component } from 'react';
import Pagination from '../Pagination';
import Loading from '../Loading';
import Checkbox from '../Checkbox';
import './index.scss';

const noop = () => { };

class Table extends Component {
    static ALIGN = {
        CENTER: 'align-center',
        LEFT: 'align-left',
        RIGHT: 'align-right',
    }
    static defaultProps = {
        rowKey: 'id',
        className: '',
        emptyPlaceholder: '暂无数据',
        expandable: {},
        contrastBgc: false,
        bordered: false,
        loading: false,
        pagination: {},
        onChange: noop,
        rowClassName: () => '',
    }

    constructor(props) {
        super(props);
        const pageSize = props.pagination ? (props.pagination.pageSize || props.pagination.defaultPageSize || 10) : 10
        const current = props.pagination ? (props.pagination.current || props.pagination.defaultCurrent || 1) : 1
        this.state = {
            expandedIds: [],
            expandLoadingIds: [],
            sorter: {},
            selectedRowKeys: new Set([]),
            pageSize,
            current,
        };
    }

    _isRowSelControlled = () => {
        return this.props.rowSelection && this.props.rowSelection.hasOwnProperty('selectedRowKeys')
    }

    // get vital params by control mode
    _getParam = () => {
        const {
            rowSelection: {
                selectedRowKeys: pValue,
            } = {},
        } = this.props;
        const {
            selectedRowKeys: sValue,
        } = this.state;

        return {
            selectedRowKeys: this._isRowSelControlled() ? new Set(pValue) : sValue
        }
    }

    // remote or local
    _isRemote = () => {
        return this.props.pagination && this.props.pagination.hasOwnProperty('total')
    }

    // calculate render dataSource
    _getDataSource = () => {
        const {
            dataSource,
            pagination
        } = this.props
        const {
            pageSize,
            current,
        } = this.state;

        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        return (this._isRemote() || !pagination) ? dataSource : dataSource.slice(start, end);
    }

    _shouldRenderExpand = (record, trKey) => {
        const {
            expandable: {
                expandedRowRender,
                rowExpandable = () => true,
            },
        } = this.props;
        const stateExpanded = !!expandedRowRender && this.state.expandedIds.includes(trKey);
        const expandLoading = !!expandedRowRender && this.state.expandLoadingIds.includes(trKey);
        const configExpanded = !!expandedRowRender && rowExpandable(record);
        return {
            configExpanded,
            stateExpanded,
            expandLoading,
        };
    }

    expandBtnClick = (trKey, expanded, record, e) => {
        e.stopPropagation();
        const {
            expandable: {
                onExpand = noop,
            },
        } = this.props;
        const { expandedIds, expandLoadingIds } = this.state;
        const retrieve = onExpand(!expanded, record);
        if (typeof retrieve === 'object' && typeof retrieve.then === 'function') {
            // toggle expand ids
            this.setState({
                expandLoadingIds: expandLoadingIds.includes(trKey)
                    ? expandLoadingIds.filter(v => v !== trKey)
                    : [...expandLoadingIds, trKey],
                expandedIds: expandedIds.includes(trKey)
                    ? expandedIds.filter(v => v !== trKey)
                    : [...expandedIds, trKey],
            });
            retrieve.then(() => this.setState({
                expandLoadingIds: expandLoadingIds.includes(trKey)
                    ? expandLoadingIds.filter(v => v !== trKey)
                    : [...expandLoadingIds],
            }));
        } else {
            // toggle expand ids
            this.setState({
                expandedIds: expandedIds.includes(trKey)
                    ? expandedIds.filter(v => v !== trKey)
                    : [...expandedIds, trKey],
                expandLoadingIds: expandedIds.includes(trKey)
                    ? expandLoadingIds.filter(v => v !== trKey)
                    : [...expandLoadingIds],
            });
        }
    }

    _onChange = (params = {}) => {
        const {
            current,
            pageSize,
            sorter: { order, field },
        } = this.state;
        const {
            columns,
            onChange,
            pagination: { total },
            dataSource,
        } = this.props;
        const pager = {
            current,
            pageSize,
            total: this._isRemote() ? total : dataSource.length
        }
        const { pagination, sorter } = params
        // TODO: implement filters
        onChange({ ...pager, ...pagination }, 'WIP: filters', { order, field, column: columns.find(v => v.dataIndex === field), ...sorter });
    }

    _pagerSizeChange = (current, pageSize) => {
        const {
            pagination: {
                onShowSizeChange = noop,
            },
        } = this.props;
        this.setState({ current, pageSize }, () => this._onChange({ pagination: { current, pageSize } }));
        onShowSizeChange(current, pageSize);
    }

    _pagerOnChange = (current, pageSize) => {
        const {
            pagination: {
                onChange = noop,
            },
        } = this.props;
        this.setState({ current, pageSize }, () => this._onChange({ pagination: { current, pageSize } }));
        onChange(current, pageSize);

        // clear selected list if remote dataSource
        this._isRemote() && this.setState({ selectedRowKeys: new Set([]) })
    }

    // TODO: local sorter
    _sorterOnClick = (col) => {
        const POOL = [undefined, 'ascend', 'descend']
        this.setState(({ sorter: { order, field } }) => {
            const nextIdx = field !== col.dataIndex
                ? 1
                : POOL.indexOf(order) !== 2
                    ? (POOL.indexOf(order) + 1)
                    : 0
            return { sorter: { order: POOL[nextIdx], field: col.dataIndex } }
        }, this._onChange)
    }

    _getCheckboxProps = (record) => {
        const {
            rowSelection: {
                getCheckboxProps
            }
        } = this.props
        return typeof getCheckboxProps === 'function'
            ? getCheckboxProps(record)
            : {}
    }

    _onSelectAll = () => {
        const dataSource = this._getDataSource()
        const {
            rowKey,
            rowSelection: {
                onSelectAll = noop,
                onChange = noop,
            },
        } = this.props
        const { selectedRowKeys } = this._getParam()
        const validSource = dataSource.filter((record) => {
            const { disabled } = this._getCheckboxProps(record)
            return !disabled
        })
        const isAllSelected = (selectedRowKeys.size >= validSource.length) && validSource
            .every((record, idx) => {
                const trKey = record[rowKey] || idx;
                return selectedRowKeys.has(trKey)
            })

        const nextKeys = new Set(selectedRowKeys)
        validSource.forEach((record, idx) => {
            const trKey = record[rowKey] || idx;
            isAllSelected ? nextKeys.delete(trKey) : nextKeys.add(trKey)
        })

        const nextRows = validSource.filter((record, idx) => {
            const trKey = record[rowKey] || idx;
            return nextKeys.has(trKey)
        })

        !this._isRowSelControlled() && this.setState({
            selectedRowKeys: nextKeys
        })

        // onSelectAll callback
        onSelectAll(!isAllSelected, nextRows)
        onChange(Array.from(nextKeys), nextRows)
    }

    _onSelect = (record, trKey) => {
        const dataSource = this._getDataSource()
        const {
            rowKey,
            rowSelection: {
                onSelect = noop,
                onChange = noop,
            },
        } = this.props
        const { selectedRowKeys } = this._getParam()
        const isSelected = selectedRowKeys.has(trKey)
        const nextKeys = new Set(selectedRowKeys)
        isSelected ? nextKeys.delete(trKey) : nextKeys.add(trKey)

        const nextRows = dataSource.filter((record, idx) => {
            const trKey = record[rowKey] || idx;
            return nextKeys.has(trKey)
        })

        !this._isRowSelControlled() && this.setState({
            selectedRowKeys: nextKeys
        })

        // onSelect callback
        onSelect(record, !isSelected, nextRows)
        onChange(Array.from(nextKeys), nextRows)
    }

    render() {
        const {
            rowKey,
            className,
            dataSource: originData,
            columns,
            expandable: { expandedRowRender, expandRowByClick },
            emptyPlaceholder,
            contrastBgc,
            bordered,
            loading,
            pagination,
            rowClassName,
        } = this.props;

        const {
            sorter: { order, field },
        } = this.state;

        if (!(columns instanceof Array)) return console.error('columns should be a array');
        if (!(originData instanceof Array)) return console.error('dataSource should be a array');

        const dataSource = this._getDataSource();

        const { selectedRowKeys } = this._getParam()
        const pageSelected = dataSource.filter((record, idx) => {
            const trKey = record[rowKey] || idx;
            return selectedRowKeys.has(trKey)
        })

        return (
            <div className={`r-table-wrapper ${className}`}>
                {
                    !!loading && (
                        <div className="loading-mask">
                            <Loading className="table-loading-icon" />
                        </div>
                    )
                }
                <div className={`table-list-body ${contrastBgc ? 'contrast-bgc' : ''} ${bordered ? 'bordered' : ''}`}>
                    <table>
                        <thead className="table-list-thead">
                        <tr>
                            {
                                this.props.hasOwnProperty('rowSelection') && (
                                    <th className="thead-cell row-selection-column">
                                        <Checkbox
                                            checked={pageSelected.length !== 0}
                                            incomplete={pageSelected.length < dataSource.length}
                                            onChange={this._onSelectAll}
                                        />
                                    </th>
                                )
                            }
                            {
                                !!expandedRowRender && (
                                    <th className="thead-cell row-expand-icon-cell" />
                                )
                            }
                            {
                                columns
                                    .map((col, idx) => {
                                        const { dataIndex = idx, title, sorter } = col
                                        const tContent = typeof title === 'function' ? title() : title
                                        return (
                                            <th
                                                key={dataIndex}
                                                className={`thead-cell th-${dataIndex} ${sorter ? 'sortable' : ''}`}
                                                onClick={sorter ? () => this._sorterOnClick(col) : noop}
                                            >
                                                <span>{tContent}</span>
                                                {
                                                    !!sorter && (
                                                        <span className={`sorter-icon ${dataIndex === field ? order : ''}`}>
                                                                <span className="sorter-icon-up">
                                                                    <svg
                                                                        viewBox="0 0 1024 1024" focusable="false"
                                                                        data-icon="sorter-icon-up" width="1em" height="1em" fill="currentColor"
                                                                        aria-hidden="true"
                                                                    >
                                                                        <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
                                                                    </svg>
                                                                </span>
                                                                <span className="sorter-icon-down">
                                                                    <svg
                                                                        viewBox="0 0 1024 1024" focusable="false"
                                                                        data-icon="sorter-icon-down" width="1em" height="1em" fill="currentColor"
                                                                        aria-hidden="true"
                                                                    >
                                                                        <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                    )
                                                }
                                            </th>
                                        )
                                    })
                            }
                        </tr>
                        </thead>
                        <tbody className="table-list-tbody">
                        {
                            dataSource.map((record, idx) => {
                                const trKey = record[rowKey] || idx;
                                const {
                                    configExpanded,
                                    stateExpanded,
                                    expandLoading,
                                } = this._shouldRenderExpand(record, trKey);
                                const seletedState = selectedRowKeys.has(trKey) ? 'selected' : ''
                                return [
                                    <tr
                                        key={trKey}
                                        className={`table-row ${seletedState} ${rowClassName(record, idx)}`}
                                        onClick={expandRowByClick ? (e) => this.expandBtnClick(trKey, stateExpanded, record, e) : noop}
                                    >
                                        {
                                            this.props.hasOwnProperty('rowSelection') && (
                                                <td className="table-row-cell selection-icon-cell">
                                                    <Checkbox
                                                        checked={selectedRowKeys.has(trKey)}
                                                        onChange={() => this._onSelect(record, trKey)}
                                                        {...this._getCheckboxProps(record)}
                                                    />
                                                </td>
                                            )
                                        }
                                        {
                                            !!expandedRowRender && (
                                                <td className="table-row-cell expand-icon-cell">
                                                    {
                                                        configExpanded && (
                                                            <div
                                                                className={`expand-icon ${stateExpanded ? 'expanded' : 'collapsed'}`}
                                                                onClick={(e) => this.expandBtnClick(trKey, stateExpanded, record, e)}
                                                            />
                                                        )
                                                    }
                                                </td>
                                            )
                                        }
                                        {
                                            columns
                                                .map(({
                                                    align = Table.ALIGN.CENTER,
                                                    dataIndex = '',
                                                    render = String,
                                                    sorter = noop,
                                                    key,
                                                }, i) => {
                                                    if (typeof render !== 'function') return console.error('render should be a function');
                                                    const { [dataIndex]: text = '' } = record
                                                    return (
                                                        <td
                                                            key={key || dataIndex || i}
                                                            className={`table-row-cell ${align}`}
                                                            // onClick={this._stopChildrenPropagation}
                                                        >
                                                            {render(text, record, trKey)}
                                                        </td>
                                                    );
                                                })
                                        }
                                    </tr>,
                                    configExpanded && stateExpanded && (
                                        <tr
                                            key={`${trKey}-exp`}
                                            className="table-expanded-row"
                                        >
                                            <td
                                                colSpan={columns.length + 1}
                                                // onClick={this._stopChildrenPropagation}
                                            >
                                                <div className="expanded-row-wrapper">
                                                    {
                                                        expandLoading
                                                            ? <Loading className="table-loading-icon" />
                                                            : expandedRowRender(record, trKey, configExpanded)
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ),
                                ];
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="table-list-placeholder">
                    {
                        !loading && !dataSource.length && (
                            <div className="table-list-empty">
                                {
                                    typeof emptyPlaceholder === 'string'
                                        ? <span className="default-tips">{emptyPlaceholder}</span>
                                        : emptyPlaceholder
                                }
                            </div>
                        )
                    }
                </div>

                {/*  pagination  */}
                {
                    !!pagination && !!Object.keys(pagination).length && (
                        <Pagination
                            total={originData.length}
                            {...pagination}
                            onChange={this._pagerOnChange}
                            onShowSizeChange={this._pagerSizeChange}
                        />
                    )
                }
            </div>
        );
    }
}

export default Table;
