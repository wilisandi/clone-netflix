'use client'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'

const FilmCarrousel = ({ children }) => {
    const [curr, setCurr] = useState(1)
    const [translateX, settranslateX] = useState(0)
    const [firstGap, setfirstGap] = useState(0);
    const [views, setViews] = useState({});
    const [numberView, setnumberView] = useState(1);
    const gridEl = useRef();
    const prev = (event) => {
        event?.preventDefault();
        var currCurrent = (curr === 1 ? 1 : curr - 1);
        setCurr(currCurrent)
        if (currCurrent == 1) {
            settranslateX((0))
        } else {
            settranslateX((views[currCurrent][0].left - firstGap))
        }
    }
    const next = (event) => {
        event?.preventDefault();
        var currCurrent = (curr === numberView ? numberView : curr + 1);
        console.log(currCurrent,firstGap,"current")
        setCurr(currCurrent)
        if (currCurrent == 1) {
            settranslateX((0))
        } else {
            if (views[1].length != views[currCurrent].length) {
                settranslateX((views[currCurrent - 1][(views[currCurrent].length)].left - firstGap))
            } else {
                settranslateX((views[currCurrent][0].left))
            }
        }
    }

    const initFunc = () => {
        var parentRect = gridEl.current.parentNode.getClientRects()[0];
        var windowWidth = parentRect.right;
        var stGap = 0;
        var childGrid = gridEl.current.querySelectorAll(".group");
        if (childGrid.length != 0) {
            var clientRects = childGrid[0].getClientRects();
            stGap = (clientRects[0].left - parentRect.left);
            setfirstGap(stGap);
        }
        var totalView = 1;
        var groupView = {};
        var max = false;
        console.log(childGrid,"childGrid")
        childGrid.forEach((child) => {
            var clientRects = child.getClientRects();
            if (clientRects.length != 0) {
                var rect = clientRects[0];
                var copyRect = {};
                copyRect.right = (rect.right-parentRect.left)-stGap;
                copyRect.left = (rect.left-parentRect.left)-stGap;
                var rectRight = copyRect.right;
                if (rectRight < parentRect.width) {
                    if (groupView[totalView] == undefined) groupView[totalView] = [];

                    groupView[totalView].push(copyRect);

                } else {
                    if (!max) {
                        max = true;
                        totalView++;
                        groupView[totalView] = [];
                        groupView[totalView].push(copyRect);
                    } else {
                        if (groupView[totalView - 1].length == groupView[totalView].length) {
                            totalView++;
                            groupView[totalView] = [];
                            groupView[totalView].push(copyRect);
                        } else {
                            groupView[totalView].push(copyRect);
                        }
                    }
                }
            }
        },);
        console.log(groupView,"groupView")
        setViews(() => groupView)
        setnumberView(() => (totalView))
    }

    useEffect(() => {
        initFunc();
        const handleResize = () => {
            initFunc();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [children])
    return (
        <div className='overflow-visible grid grid-cols-1'>
            <div ref={gridEl} className='w-full grid grid-flow-col items-start justify-start transition-transform ease-out duration-500 gap-2  col-start-1 row-start-1 first:pl-10' style={{ transform: `translateX(-${translateX}px)` }}>
                {children}
            </div>
            <div className='col-start-1 row-start-1'>
                <div className=' flex justify-between h-full'>
                    <div className={`${curr == 1 ? null : "hidden"}`}></div>
                    <button onClick={prev} className={`relative top-0 bg-gradient-to-r to-transparent from-black text-white w-8 ${curr == 1 ? "hidden" : null}`}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <button onClick={next} className={`relative top-0 bg-gradient-to-l to-transparent from-black text-white w-8 ${curr == numberView ? "hidden" : null}`}><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            </div>

        </div>
    )
}

export default FilmCarrousel