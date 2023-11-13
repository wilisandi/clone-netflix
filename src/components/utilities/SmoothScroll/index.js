"use client"
import React, { useEffect } from 'react'
import Scrollbar, { ScrollbarPlugin }  from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
export class DisableScrollPlugin extends ScrollbarPlugin {
    static pluginName = 'disableScroll';
  
    static defaultOptions = {
      direction: null,
    };
  
    transformDelta(delta) {
      if (this.options.direction) {
        delta[this.options.direction] = 0;
      }
  
      return { ...delta };
    }
  }
const SmoothScroll = () => {
    useEffect(() => {
        const overscrollOptions = {
            enable: true,
            effect: 'bounce',
            damping: 0.1,
            maxOverscroll: 150,
            glowColor: '#000000',
        };
        const options = {
            damping: 0.01,
            plugins: {
                disableScroll: { direction: 'x' },
                overscroll: { ...overscrollOptions },
            },
        }
          
        Scrollbar.use(DisableScrollPlugin);
        Scrollbar.use(OverscrollPlugin);
        Scrollbar.init(document.getElementById("main"), options);
        
        return () => {
            if (Scrollbar) Scrollbar.destroy(document.body)
        }
    }, [])
    return null
}

export default SmoothScroll