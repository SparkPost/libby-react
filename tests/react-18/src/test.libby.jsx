
import React from 'react';
import { describe, add } from '@sparkpost/libby-react';

describe('A Category 1', () => {
  add('B name 1', () => <div>This is a React component</div>);
  add('A name 2', () => <div>This is a React component</div>);

  describe('B Sub Category 1', () => {
    add('name 3', () => <div>This is a React component</div>);
    add('name 4', () => <div>This is a React component</div>);
  });

  describe('A Sub Category 2', () => {
    add('name 5', () => <div>This is a React component</div>);

    describe('Z Sub Category 3', () => {
      add('C', () => <div>This is a React component</div>);
      add('A', () => <div>This is a React component</div>);
      add('B', () => <div>This is a React component</div>);
    });
  });
});

describe('C Category 2', () => {
  describe('Sub Category 4', () => {
    add('name 8', () => <div>This is a React component</div>);
    add('name 9', () => <div>This is another React component</div>);
  });
});

describe('B Category 3', () => {
  add('name 10 with lots of text in the title', () => {
    const [toggle, setToggle] = React.useState(true);

    return (
      <div>
        <button onClick={() => setToggle(!toggle)}>toggle</button>
        {toggle ? 'am i working?' : 'yes'}
      </div>
    );
  });
});

add('Hook 1', () => {
  const [toggle, setToggle] = React.useState(true);

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      {toggle ? 'am i working?' : 'yes'}
    </div>
  );
});

add('Hook 2', () => {
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    ref?.current?.focus()
  }, [])

  return (
    <div>
      <button ref={ref}>autofocus</button>
    </div>
  );
});

add('dddd root entry', () => 'test');
add('a root entry', () => 'test');
