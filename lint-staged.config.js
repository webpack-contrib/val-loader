module.exports = {
  "*": ["prettier --write --ignore-unknown"],
  "*.js": ["eslint --fix", "prettier --write"],
};
