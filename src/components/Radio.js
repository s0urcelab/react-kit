import React from 'react';
import styled, { css, keyframes } from 'styled-components'

const noop = () => {};

class Radio extends React.Component {

  static defaultProps = {
    className: '',
    checked: false,
    disabled: false,
    onChange: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  onChange = (e) => {
    const {
      onChange,
      disabled,
    } = this.props;
    if (disabled) return;

    const checked = e.target.checked;
    this.setState({
      checked: e.target.checked,
    });

    onChange && onChange(checked, e);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.checked !== nextProps.checked) {
  //     this.setState({
  //       checked: !!nextProps.checked
  //     });
  //   }
  // }

  render() {
    const {
      checked,
    } = this.state;
    const {
      children,
      className,
      disabled,
      ...restProps
    } = this.props;

    return (
      <Label checked={checked}
             disabled={disabled}>
        <Input
          {...restProps}
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={this.onChange}
        />
        <SymbolSpan checked={checked}
                    disabled={disabled}>
          <Icon checked={checked}
                disabled={disabled} />
        </SymbolSpan>
        {children && <TitleSpan checked={checked}
                                disabled={disabled}>{children}</TitleSpan>}
      </Label>
    )
  }
}

const Label = styled.label`
  position: relative;
  cursor: pointer;
  line-height: unset;
  
  ${props => props.disabled && css`
    cursor: not-allowed;
  `}
`

const Input = styled.input`
  display: none;
`

const zoom = keyframes`
  from {
      transform: scale(1);
      opacity: 0.8;
    }
    to {
      transform: scale(1.8);
      opacity: 0;
    }
`

const SymbolSpan = styled.span`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  padding: 2px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 50%;
  transition: all .3s;

  ${props => props.checked && css`
    ::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border: 1px solid #ff6b6b;
      border-radius: 50%;
      animation: ${zoom} 0.3s forwards;
      transform-origin: center center;
    }
  `}

  ${props => props.disabled && css`
    background: #eee!important;
    border-color: #ccc!important;
    color: #999!important;
    ::after {
      display: none!important;
    }
  `}
  
  ${Label}:hover & {
    border-color: #ff6b6b;
  }
`

const TitleSpan = styled.span`
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;

  ${props => props.checked && css`
    color: #999;
  `}
`

const Icon = styled.i`
  display: block;
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  border-radius: 50%;
  transform: scale(0);
  transition: all .1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
  
  ${props => props.checked && css`
    transform: scale(1);
  `}

  ${props => props.disabled && css`
    background: #ccc!important;
  `}
`

export default Radio
