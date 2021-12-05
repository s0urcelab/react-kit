import React, { useEffect, useState } from 'react'
import useWindowSize from '@/hooks/useWindowSize'

import './index.scss'

export default () => {
    const [ratio, setRatio] = useState(0)
    const { width, height } = useWindowSize();

    useEffect(() => {
        const ratio = 45 / (width / height)
        setRatio(ratio)
    }, [width, height])

    return (
        <div className="page-404">
            <a className="back-btn" href="/">返回</a>
            <div className="background-wrapper">
                <h1
                    className="visual"
                    style={{ transform: `translate(-50%, -50%) rotate(-${ratio}deg)` }}
                >
                    404
                </h1>
            </div>
            <p className="page-desc">你要找的页面并不存在</p>
        </div>
    )
}