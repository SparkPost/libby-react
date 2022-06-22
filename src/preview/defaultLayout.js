import React from 'react';

export default function DefaultLayout({ children }) {
  return (
    <div data-id="libby-preview" style={{ fontFamily: 'sans-serif' }}>
      {children ? (
        children
      ) : (
        <>
          <h2>@sparkpost/libby-react</h2>
          <div>
            See{' '}
            <a
              href="https://github.com/SparkPost/libby-react"
              style={{
                color: '#000'
              }}
            >
              https://github.com/SparkPost/libby-react
            </a>
          </div>
        </>
      )}
    </div>
  );
}
