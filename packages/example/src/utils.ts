import { useRef } from "react";

export const useRenderCount = () => {
  const countRef = useRef(0);

  return ++countRef.current;
};
