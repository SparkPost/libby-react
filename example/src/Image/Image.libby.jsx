import React from 'react';
import { describe, add } from '@sparkpost/libby-react';
import Image from './Image';

describe('Image', () => {
  add('renders correctly', () => {
    return <Image />;
  });
});
