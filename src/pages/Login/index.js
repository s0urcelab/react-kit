import React, {useState} from 'react';
import { Button, Radio } from '@/components'

function Login() {
  const [checked, toggleChecked] = useState(false)

  const [isCom, toggleCom] = useState(false)
  return (
    <>
      <Button onClick={() => toggleChecked(true)}>选中</Button>
      <Button hollow onClick={() => toggleChecked(false)}>取消</Button>
      <Radio checked={checked}>Radio</Radio>


      <h1>{String(isCom)}</h1>
      <Button onClick={() => toggleCom(!isCom)}>Btnnnnn</Button>
    </>
  )
}

export default Login;