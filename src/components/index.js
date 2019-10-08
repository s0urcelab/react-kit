import styled, { css } from 'styled-components'
import Radio from './Radio'

const Button = styled.button`
  cursor: pointer;
  outline: none;
  background: palevioletred;
  color: white;
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  
  &:hover {
    background: rgba(219 ,112, 147, 0.6);
  }
  
  ${props => props.hollow && css`
    background: transparent;
    color: palevioletred;
  `}
`

export { Radio, Button }
