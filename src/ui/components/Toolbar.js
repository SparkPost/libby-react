import React from 'react';
import Inline from '@sweatpants/inline';
import ScreenReaderOnly from '@sweatpants/screenreaderonly';
import useWindow from '../hooks/useWindow';
import BackgroundContext from '../context/BackgroundContext';
import Open from './icons/Open';
import Expand from './icons/Expand';
import Image from './icons/Image';
import Code from './icons/Code';
import Button from './Button';
import IconWrapper from './IconWrapper';

function Toolbar(props) {
  const { toggleSidebar, toggleSource } = props;
  const { cycle } = React.useContext(BackgroundContext);
  const environment = useWindow();
  const href = `${environment?.location?.origin}/iframe.html${environment?.location?.search}`;

  return (
    <Inline space="300">
      <Button onClick={toggleSource} title="Toggle source code">
        <IconWrapper>
          <Code />
          <ScreenReaderOnly>Toggle source code</ScreenReaderOnly>
        </IconWrapper>
      </Button>

      <Button onClick={cycle} title="Cycle backgrond color">
        <IconWrapper>
          <Image />
          <ScreenReaderOnly>Cycle backgrond color</ScreenReaderOnly>
        </IconWrapper>
      </Button>

      <Button onClick={toggleSidebar} title="Toggle full screen">
        <IconWrapper>
          <Expand />
          <ScreenReaderOnly>Toggle full screen</ScreenReaderOnly>
        </IconWrapper>
      </Button>

      <Button
        as="a"
        target="_blank"
        href={href}
        rel="noopener noreferrer"
        title="Open iframe in new tab"
      >
        <IconWrapper>
          <Open />
          <ScreenReaderOnly>Open iframe in new tab</ScreenReaderOnly>
        </IconWrapper>
      </Button>
    </Inline>
  );
}

export default Toolbar;
