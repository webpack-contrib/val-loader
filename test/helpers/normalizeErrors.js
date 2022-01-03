function removeCWD(str) {
  const isWin = process.platform === "win32";
  let cwd = process.cwd();

  if (isWin) {
    // eslint-disable-next-line no-param-reassign
    str = str.replace(/\\/g, "/");
    // eslint-disable-next-line no-param-reassign
    cwd = cwd.replace(/\\/g, "/");
  }

  return str
    .replace(/\(from .*?\)/, "(from `replaced original path`)")
    .replace(new RegExp(cwd, "g"), "")
    .replace(
      /Cannot read property 'get' of undefined/,
      "Cannot read properties of undefined (reading 'get')"
    );
}

export default (errors) =>
  errors.map((error) =>
    removeCWD(error.toString().split("\n").slice(0, 2).join("\n"))
  );
