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

  useEffect(() => {
    window.fetch("/api/todos/1")
      .then(response => response.json())
      .then(setFoo)
  }, [])

  return (
    <>
      <p>Data：{JSON.stringify(foo)}</p>
      <Button>red button</Button>
    </>
  )
}
export default Demo;
