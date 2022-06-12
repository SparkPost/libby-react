import { add, describe } from '@sparkpost/libby-react';

const Component: React.FC<{ children?: React.ReactNode }> = (props): JSX.Element => {
  return <div {...props} />
}

describe('TSX', () => {
  add('renders correctly', () => <Component>This is a React component with typescript</Component>);
});
