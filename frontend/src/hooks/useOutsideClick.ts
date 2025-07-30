import { useEffect, useRef } from "react";

export default function useOutsideClick(
  cb: () => unknown,
  listenerCapturing: boolean = true
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        cb();
      }
    }

    document.addEventListener("click", handleClick, listenerCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenerCapturing);
  }, [cb, listenerCapturing]);

  return ref;
}
