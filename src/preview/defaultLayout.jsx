console.log('[libby] Default layout loaded.');

export default ({ children }) => (
  <div data-id="libby-preview" style={{ fontFamily: 'sans-serif' }}>
    {children}
  </div>
);
