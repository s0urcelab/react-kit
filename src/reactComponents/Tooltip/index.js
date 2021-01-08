/* eslint-disable */

import React, { Component, Fragment } from 'react';
import contains from "../../common/utils/contains"
import Portal from "../Modal/portal";
import './index.scss'

const COMMON_STYLE = {
    position: 'absolute',
    zIndex: 200,
}

class Tooltip extends Component {
    static defaultProps = {
        className: '',
        title: '',
        placement: 'top',
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
        this.root = null
        this.portal = null
    }

    _calPos = () => {
        const { placement } = this.props
        const { left, top, width, height } = this.root
            ? this.root.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };

        const scrollX = window.scrollX
        const scrollY = window.scrollY
        const offsetX = width / 2
        const offsetY = placement === 'top' ? 0 : height
        return {
            left: left + scrollX + offsetX,
            top: top + scrollY + offsetY,
        }
    }

    mouseOnEnter = () => {
        this.setState({ visible: true })
    }

    mouseOnLeave = (evt) => {
        if (contains(this.portal, evt.relatedTarget) || contains(this.root, evt.relatedTarget)) {
            return;
        }
        this.setState({ visible: false })
    }

    render() {
        const {
            title,
            className,
          ...rest
        } = this.props;
        const {
            visible,
        } = this.state

        const position = this._calPos()

        return (
            <Fragment>
                <span
                    ref={ref => this.root = ref}
                    onMouseEnter={this.mouseOnEnter}
                    onMouseLeave={this.mouseOnLeave}
                >
                    { this.props.children }
                </span>
                <Portal
                    style={{...COMMON_STYLE, ...position}}
                    visible={visible}
                    className={`r-tooltip-root ${className} ${visible ? 'visible' : ''}`}
                    {...rest}
                >
                    <div
                        className="r-tooltip"
                        ref={ref => this.portal = ref}
                        onMouseLeave={this.mouseOnLeave}
                    >
                        <div className="r-tooltip-arrow">
                            <span className="r-tooltip-arrow-icon" />
                        </div>
                        <div className="r-tooltip-content">{title}</div>
                    </div>
                </Portal>
            </Fragment>
        );
    }
}

export default Tooltip;
