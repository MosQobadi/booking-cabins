import { useEffect, useRef } from "react";

export default function useClickOutside({ handler, listenerCapturing = true }) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenerCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenerCapturing);
    };
  }, [handler, listenerCapturing]);

  return ref;
}
