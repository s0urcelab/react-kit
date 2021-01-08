/* eslint-disable */

import React, { Component } from 'react';
import Button from '../Button';
import Portal from './portal'
import './index.scss';

const noop = () => {};

class Modal extends Component {
    static defaultProps = {
        visible: false,
        title: '',
        maskClosable: false,
        okText: '确定',
        cancelText: '取消',
        onOk: noop,
        onCancel: noop,
        destroyOnClose: true,
    }

    onOk = (e) => {
        e.stopPropagation();
        this.props.onOk();
    }

    onCancel = (e) => {
        e.stopPropagation();
        this.props.onCancel();
    }

    componentDidUpdate(previousProps, previousState, snapshot) {
        // remove scroll bar to fix body position
        if (previousProps.visible !== this.props.visible) {
            if (this.props.visible) {
                document.body.style.overflow = 'hidden';
                document.body.style.width = 'calc(100% - 17px)';
            } else {
                document.body.style.removeProperty('overflow')
                document.body.style.removeProperty('width')
            }
        }
    }

    render() {
        const {
            title,
            visible,
            maskClosable,
            footer,
            okText,
            cancelText,
            destroyOnClose,
        } = this.props;

        return (
          <Portal
              className="r-modal"
              visible={visible}
              destroyOnClose={destroyOnClose}
          >
              <div className={`modal-mask ${visible ? '' : 'hide'}`}/>
              <div
                className={`modal-wrap modal-centered ${visible ? '' : 'hide'}`}
                onClick={maskClosable ? this.onCancel : noop}
              >
                  <div className="modal-content">
                      <div className="modal-content-head">
                          <p className="head-title">{title}</p>
                          <button
                            className="close-btn"
                            onClick={this.onCancel}
                          >×</button>
                      </div>
                      <div className="modal-content-body">
                          {
                              this.props.children
                          }
                          {
                              footer !== null && (footer || (
                                <div className="modal-footer">
                                    <Button className="modal-btn ok-btn" onClick={this.onOk}>{okText}</Button>
                                    <Button hollow className="modal-btn cancel-btn" onClick={this.onCancel}>{cancelText}</Button>
                                </div>
                              ))
                          }
                      </div>
                  </div>
              </div>
          </Portal>
        )
    }
}

export default Modal;
