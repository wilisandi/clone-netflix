"use client"
import React, { useEffect } from 'react'
import Scrollbar from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

const SmoothScroll = () => {
    useEffect(() => {
        const overscrollOptions = {
            enable: true,
            effect: 'bounce',
            damping: 0.15,
            maxOverscroll: 150,
            glowColor: '#fff',
        };
        const options = {
            damping: 0.01,
            plugins: {
                overscroll: { ...overscrollOptions },
            },
        }
        Scrollbar.use(OverscrollPlugin);
        Scrollbar.init(document.getElementById("main"), options);
        return () => {
            if (Scrollbar) Scrollbar.destroy(document.body)
          }
    }, [])
    return null
}

export default SmoothScroll