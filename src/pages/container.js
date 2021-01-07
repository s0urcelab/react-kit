import { hot } from 'react-hot-loader/root'
import React from "react"

import Playground from "@/pages/playground"
// import Antd from "@/pages/antd"

import { Button } from 'rcom'

import './container.css'

const Container = () => {
    return (
        <div className="container">
            <Playground />
            {/*<Antd />*/}
            {/*<Button>4234</Button>*/}
        </div>
    )
}

export default hot(Container)
