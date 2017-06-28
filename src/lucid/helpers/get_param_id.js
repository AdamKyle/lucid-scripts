module.exports.getParamId = function(param) {
  switch(param) {
    case "mhp":
      return 0;
    case "mmp":
      return 1;
    case "atk":
      return 2;
    case "def":
      return 3;
    case "mat":
      return 4;
    case "mdf":
      return 5;
    case "agi":
      return 6;
    case "luk":
      return 7
    default:
      throw Error('Unknown param.');
  }
}
