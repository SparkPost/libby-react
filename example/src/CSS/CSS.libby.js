import React from 'react';
import { describe, add } from '@sparkpost/libby-react';
import Button from './Button';

describe('CSS', () => {
  add('renders correctly', () => {
    return <Button>Click me</Button>;
  });
});
