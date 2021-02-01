import React from 'react';
import useBackground from '../hooks/useBackground';

const BackgroundContext = React.createContext('');

export function BackgroundContextProvider(props) {
  const { children } = props;
  const [backgroundValue, cycleBackgroundValue] = useBackground();

  return (
    <BackgroundContext.Provider
      value={{
        value: backgroundValue,
        cycle: cycleBackgroundValue
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export default BackgroundContext;
