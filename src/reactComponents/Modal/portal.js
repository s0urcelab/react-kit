import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import contains from "../../common/utils/contains";

const portalRoot = document.body;

class Portal extends Component {
    static defaultProps = {
        visible: false,
        className: '',
        destroyOnClose: true,
    }

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        const { visible } = this.props
        if (visible) {
            portalRoot.appendChild(this.el);
        }
    }

    componentDidUpdate(prevProps) {
        const { visible: preVisible } = prevProps
        const { visible } = this.props
        if ((preVisible !== visible) && visible) {
            portalRoot.appendChild(this.el);
        }
    }

    componentWillUnmount() {
        if (contains(portalRoot, this.el)) {
            portalRoot.removeChild(this.el);
        }
    }

    render() {
        const {
            visible,
            className,
            destroyOnClose,
            ...rest
        } = this.props;
        const shouldRender = !destroyOnClose || visible
        return shouldRender && createPortal((
          <div
              className={`r-portal ${className} ${visible ? '' : 'hide'}`}
              {...rest}
          >
              {
                  this.props.children
              }
          </div>
        ), this.el);
    }
}

export default Portal;
