function cacheable() {
  return {
    cacheable: true,
    code: 'module.exports = "hello world";',
  };
}

module.exports = cacheable;
