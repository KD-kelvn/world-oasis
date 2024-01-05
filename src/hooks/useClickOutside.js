import { useEffect, useRef } from "react";

export function useClickOutside(handler, shouldListenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      const handleClick = function (e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      };

      document.addEventListener("click", handleClick, shouldListenCapturing);

      return function () {
        document.removeEventListener(
          "click",
          handleClick,
          shouldListenCapturing
        );
      };
    },
    [close]
  );

  return ref;
}
