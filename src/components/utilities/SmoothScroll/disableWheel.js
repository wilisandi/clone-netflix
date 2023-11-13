import { useEffect, useRef } from "react";

const EventTypes = ["touchmove", "mousewheel", "wheel"];

export function useStopWheel() {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
        e.stopPropagation()
    };
    if(document.body.clientWidth<768){
        EventTypes.forEach((eventType) => {
          ref.current?.addEventListener(eventType, handler);
        });
    }

    return () => {
      EventTypes.forEach((eventType) => {
        if(document.body.clientWidth<768){
            ref.current?.removeEventListener(eventType, handler);
        }
      });
    };
  }, []);

  return ref;
}