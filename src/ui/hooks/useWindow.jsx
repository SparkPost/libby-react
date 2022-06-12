function useWindow() {
  if (typeof window !== 'undefined') {
    return window;
  }
  return {
    location: {}
  };
}

export default useWindow;
