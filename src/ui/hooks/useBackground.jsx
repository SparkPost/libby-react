import { useEffect, useMemo, useState } from 'react';
import config from '__LIBBY_CONFIG__';

function useBackground() {
  const [index, setIndex] = useState(0);
  const backgrounds = config.backgrounds;
  const background = backgrounds[0];

  useEffect(() => {
    setIndex(backgrounds.findIndex((v) => v === background));
  }, [config.backgrounds]);

  const value = useMemo(() => {
    return backgrounds[index];
  }, [index, config.backgrounds]);

  function cycleBackground() {
    const values = backgrounds;
    if (index === values.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return [value, cycleBackground];
}

export default useBackground;
