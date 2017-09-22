const setupReady = (callbacks) => (callback) => {
  callbacks.push(callback);
  function execute() {
    while (callbacks.length) {
      const fn = callbacks.shift();
      if (typeof fn === 'function') {
        fn();
      }
    }
  }
  function loaded() {
    document.removeEventListener('DOMContentLoaded', loaded);
    execute();
  }

  if (document.readyState !== 'loading') {
    return execute();
  }
  document.addEventListener('DOMContentLoaded', loaded);
};
const ready = setupReady([]);

export default ready;
