import { useCallback, useState } from 'react';

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useCallback((containerElem: any) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  return { translate, containerRef };
};
