import React from 'react';
import { describe, add } from 'libby-react';

describe('Category 1', () => {
  add('name 1', () => <div>This is a React component</div>);
  add('name 2', () => <div>This is a React component</div>);

  describe('Sub Category 1', () => {
    add('name 3', () => <div>This is a React component</div>);
    add('name 4', () => <div>This is a React component</div>);
  });

  describe('Sub Category 2', () => {
    add('name 5', () => <div>This is a React component</div>);

    describe('Sub Category 3', () => {
      add('name 6', () => <div>This is a React component</div>);
      add('name 7', () => <div>This is a React component</div>);
    });
  });
});

describe('Category 2', () => {
  describe('Sub Category 4', () => {
    add('name 8', () => <div>This is a React component</div>);
    add('name 9', () => <div>This is another React component</div>);
  });
});

describe('Category3', () => {
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

add('root entry 1', () => {
  const [toggle, setToggle] = React.useState(true);

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      {toggle ? 'am i working?' : 'yes'}
    </div>
  );
});

add('root entry', () => 'test');
