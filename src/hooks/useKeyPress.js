import React, { useEffect, useState } from 'react'


const debounce = (func, millsec) => {
    let tid
    return (...arg) => {
        clearTimeout(tid)
        tid = setTimeout(() => func(...arg), millsec)
    }
}

export default function useKeyPress(expKeys, action) {
    const [keyHis, setHis] = useState([])

    const clearHistory = debounce(() => setHis([]), 2000)

    const handle = ({ key }) => {
        setHis(o => [...o, key])
        clearHistory()
    }

    useEffect(() => {
        // 长度够了命中/清空
        if (keyHis.length === expKeys.length) {
            if (keyHis.join(',') === expKeys.join(',')) {
                action()
            }
            setHis([])
        }
    }, [keyHis])


    useEffect(() => {
        // window.addEventListener("keydown", downHandler)
        window.addEventListener("keyup", handle)
        return () => {
            // window.removeEventListener("keydown", downHandler)
            window.removeEventListener("keyup", handle)
        };
    }, [])
}