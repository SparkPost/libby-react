import React, { useState, useEffect, useLayoutEffect } from 'react';

const useSource = ({
  source,
  minWidth = 200,
  minHeight = 200,
  startHeight: startHeightProp = 400,
  startWidth: startWidthProp = 500
}) => {
  const [isSource, setIsSource] = useState(false);
  const [orientation, setOrientation] = useState('vertical');
  const [startWidth, setStartWidth] = useState(startWidthProp);
  const [startHeight, setStartHeight] = useState(startHeightProp);
  const [width, setWidth] = useState(startWidthProp);
  const [height, setHeight] = useState(startHeightProp);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [aimX, setAimX] = useState(0);
  const [aimY, setAimY] = useState(0);
  const [resizing, setResizing] = useState(false);

  const handleMouseMove = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    if (resizing) {
      // Update height if horizontal
      if (orientation === 'horizontal') {
        setAimY(startY - y);

        const height = aimY + startHeight;
        setHeight(height > minHeight ? height : minHeight);
      }
      // Update width if vertical
      if (orientation === 'vertical') {
        setAimX(startX - x);

        const width = aimX + startWidth;
        setWidth(width > minWidth ? width : minWidth);
      }
    }
  };

  const handleMouseUp = (event) => {
    if (orientation === 'horizontal') {
      setStartHeight(height);
    }

    if (orientation === 'vertical') {
      setStartWidth(width);
    }

    setAimX(0);
    setStartX(0);
    setAimY(0);
    setStartY(0);
    setResizing(false);
  };

  useEffect(() => {
    setIsSource(source);
  }, []);

  useEffect(() => {
    // Handle mousemove and mouseup here
    window.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('mouseup', handleMouseUp, false);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp, false);
    };
  }, [resizing, aimX, aimY, startX, startY, width, height]);

  const toggleOrientation = () => {
    if (orientation === 'vertical') {
      setOrientation('horizontal');
    }

    if (orientation === 'horizontal') {
      setOrientation('vertical');
    }
  };

  const onXMouseDown = (event) => {
    const x = event.pageX;
    setStartX(x);
    setResizing(true);
  };

  const onYMouseDown = (event) => {
    const y = event.pageY;
    setStartY(y);
    setResizing(true);
  };

  return {
    width,
    height,
    resizing,
    isSource,
    orientation,
    toggleOrientation,
    resizeXProps: {
      onMouseDown: onXMouseDown
    },
    resizeYProps: {
      onMouseDown: onYMouseDown
    }
  };
};

export default useSource;
