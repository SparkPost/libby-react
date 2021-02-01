import React from 'react';
import config from '__LIBBY_CONFIG__';

function useBackground() {
  const [index, setIndex] = React.useState(0);
  const background = config.backgrounds.default;

  React.useEffect(() => {
    const values = config?.backgrounds?.values;
    setIndex(values.findIndex(({ name }) => name === background));
  }, [background, config.backgrounds]);

  const value = React.useMemo(() => {
    const values = config?.backgrounds?.values;
    return values[index].value;
  }, [index, config.backgrounds]);

  function cycleBackground() {
    const values = config?.backgrounds?.values;
    if (index === values.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return [value, cycleBackground];
}

export default useBackground;
