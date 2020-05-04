import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

function Demo() {
  const [foo, setFoo] = useState('nothing...')

  return [1,2,4].map((v, i) => (
    <p key={2222}>{v}</p>
  ))
}
export default Demo;
