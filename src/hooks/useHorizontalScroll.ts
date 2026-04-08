import { useRef, useEffect } from "react";

export function useHorizontalScroll<T extends HTMLElement>() {
  const elRef = useRef<T>(null);
  
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        
        // 当按住 Shift 键时，浏览器会自动转换为横向滚动，无需我们拦截
        if (e.shiftKey) return;

        // 如果内容并未溢出，也不拦截滚动
        if (el.scrollWidth <= el.clientWidth) return;

        e.preventDefault();
        
        // 调整滚动的速度 (可根据需要调大或调小乘数)
        el.scrollBy({
          left: e.deltaY < 0 ? -30 : 30,
        });
      };
      
      // { passive: false } is needed to allow preventDefault()
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  return elRef;
}