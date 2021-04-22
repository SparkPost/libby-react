import React from 'react';

const SourceContext = React.createContext({});

export function SourceContextProvider(props) {
  const { children } = props;
  const [show, setShow] = React.useState(true);
  const [orientation, seetOrientation] = React.useState('horizontal');

  const toggleShow = React.useCallback(() => {
    return setShow(!show);
  }, [show]);

  const toggleOrientation = React.useCallback(() => {
    return seetOrientation(orientation === 'vertical' ? 'horizontal' : 'vertical');
  }, [orientation]);

  return (
    <SourceContext.Provider
      value={{
        orientation,
        show,
        toggleShowSource: toggleShow,
        toggleOrientation: toggleOrientation
      }}
    >
      {children}
    </SourceContext.Provider>
  );
}

export default SourceContext;
