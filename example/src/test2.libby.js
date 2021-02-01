import React from 'react';
import { add, describe } from 'libby-react';

describe('Error', () => {
  add('renders correctly', () => <div>This is {oops} a React component</div>);
});
