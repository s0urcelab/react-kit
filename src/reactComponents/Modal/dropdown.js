/* eslint-disable */

import React, { Component } from 'react';
import Portal from "./portal";
import contains from "../../common/utils/contains";

const COMMON_STYLE = {
    position: 'absolute',
    zIndex: 200,
}

class Dropdown extends Component {
    static defaultProps = {
        baseRef: null,
        className: '',
        visible: false,
    }

    constructor(props) {
        super(props);
        this.root = null
    }

    calPos(baseRef) {
        const { left, top, width, height } = baseRef
            ? baseRef.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        const offsetX = window.scrollX
        const offsetY = window.scrollY
        return {
            left: left + offsetX,
            top: top + offsetY,
            width,
            height,
        }
    }

    isInside = (evt) => {
        if (contains(this.root, evt.target)) {
            evt.preventDefault()
        }
    };

    componentDidMount() {
        window.addEventListener('mousedown', this.isInside, false)
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.isInside, false);
    }

    render() {
        const {
            baseRef,
            className,
            visible,
          ...rest
        } = this.props;

        const position = this.calPos(baseRef)
        return (
            <Portal
                style={{...COMMON_STYLE, ...position}}
                visible={visible}
                className={`r-dropdown ${className} ${visible ? 'visible' : ''}`}
                {...rest}
            >
                <div ref={ref => this.root = ref}>
                    { this.props.children }
                </div>
            </Portal>
        );
    }
}

export default Dropdown;
