/* eslint-disable */

import React, { Component } from 'react';
import Select from '../Select';
import './index.scss';

const noop = () => {};

const range = (start, end, step = 1) =>
    Array(Math.ceil((end - start + 1) / step)).fill(start).map((x, y) => x + y * step);

const JUMP_CONFIG = {
    'jump-prev': {
        text: '向前5页',
        step: -5,
    },
    'jump-next': {
        text: '向后5页',
        step: 5,
    },
};

class Pagination extends Component {
    static defaultProps = {
        total: 0,
        defaultCurrent: 1,
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50],
        pageRenderRange: 5,
        showSizeChanger: false,
        showQuickJumper: false,
        hideOnSinglePage: false,
        showTotal: () => '',
        onChange: noop,
        onShowSizeChange: noop,
    }

    constructor(props) {
        super(props);
        this.state = {
            current: props.defaultCurrent,
            pageSize: props.defaultPageSize,
        };
    }

    // get param by method(control, uncontrol)
    _getParam() {
        const {
            pageSize: pPsize,
            current: pCurr,
            total,
        } = this.props;
        const {
            current: sCurr,
            pageSize: sPsize,
        } = this.state;

        const current = pCurr || sCurr;
        const pageSize = pPsize || sPsize;
        const pageTotal = Math.ceil(total / pageSize);

        return {
            current,
            pageSize,
            pageTotal,
        };
    }

    pageClick = (page) => {
        const { pageSize, pageTotal } = this._getParam();
        const nowPage = page < 1
            ? 1
            : (page > pageTotal)
                ? pageTotal
                : page;
        this.props.onChange(nowPage, pageSize);
        this.setState({ current: nowPage });
    }

    pageSizeChange = (pSize) => {
        this.setState({ pageSize: pSize }, () => {
            const { current, pageTotal } = this._getParam();
            const nowCurr = current > pageTotal ? pageTotal : current;
            this.props.onShowSizeChange(nowCurr, pSize);
            this.setState({ current: nowCurr });
        });
    }

    goPageClick = () => {
        const goSeq = +this.goPage.value;
        this.pageClick(goSeq);
    }

    goPageEnter = (e) => {
        if (e.keyCode === 13) {
            this.goPageClick();
        }
    }

    render() {
        const {
            total,
            showSizeChanger,
            showQuickJumper,
            showTotal,
            pageSizeOptions,
            pageRenderRange,
            hideOnSinglePage,
        } = this.props;

        // no data for render!
        if (!total) return null;

        const {
            current,
            pageTotal,
            pageSize,
        } = this._getParam();

        const sideRange = Math.ceil((pageRenderRange - 1) / 2);
        const overFloor = current - sideRange <= 0;
        const overCeil = current + sideRange >= pageTotal;
        const floor = (current - sideRange) < 2 ? 2 : (current - sideRange);
        const ceil = (current + sideRange) > (pageTotal - 1) ? (pageTotal - 1) : (current + sideRange);

        // generate page array
        const core = overFloor
            ? range(2, pageRenderRange)
            : overCeil
                ? range(pageTotal - pageRenderRange + 1, pageTotal - 1)
                : range(floor, ceil);
        if (floor - 1 > 1) {
            core.unshift('jump-prev');
        }
        if (pageTotal - ceil > 1) {
            core.push('jump-next');
        }

        const pager = pageTotal <= pageRenderRange ? range(1, pageTotal) : [1, ...core, pageTotal];

        const pOpts = pageSizeOptions.map(v => ({ label: `${v} 条/页`, value: v }))

        if (pageTotal === 0 || (hideOnSinglePage && pageTotal === 1)) return null
        return (
            <ul className="pagination-wrapper">
                <li className="pagination-item total-text">{showTotal(total, pageTotal, current)}</li>
                <li
                    className={`pagination-item prev ${current === 1 ? 'disabled' : ''}`}
                    onClick={() => this.pageClick(current - 1)}
                >
                    上一页
                </li>
                {
                    pager.map(page => (
                        !+page
                            ? <li
                                key={page}
                                className={`pagination-item ${page}`}
                                onClick={() => this.pageClick(current + JUMP_CONFIG[page].step)}
                                title={JUMP_CONFIG[page].text}
                            />
                            : <li
                                key={page}
                                className={`pagination-item page-item ${current === page ? 'page-item-active' : ''}`}
                                onClick={() => this.pageClick(page)}
                            >
                                {page}
                            </li>
                    ))
                }
                <li
                    className={`pagination-item next ${current === pageTotal ? 'disabled' : ''}`}
                    onClick={() => this.pageClick(current + 1)}
                >
                    下一页
                </li>
                <li className="pagination-item page-options">
                    {
                        showSizeChanger && (
                            <Select
                                className="size-changer"
                                options={pOpts}
                                value={pageSize}
                                onSelect={this.pageSizeChange}
                            />
                        )
                    }
                    {
                        showQuickJumper && (
                            <div className="quick-jumper">
                                跳转到
                                <input
                                    type="number"
                                    ref={ref => this.goPage = ref}
                                    onKeyPress={this.goPageEnter}
                                />
                                <button
                                    onClick={this.goPageClick}
                                >GO</button>
                            </div>
                        )
                    }
                </li>
            </ul>
        );
    }
}

export default Pagination;
