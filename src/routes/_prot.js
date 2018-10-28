String.prototype.checkTheSubstr = function (substr) {
  return (this.toLowerCase().indexOf( String(substr).toLowerCase() ) !== -1);
};

String.prototype.checkAsSubstrByWords = function (s) {
  // Передаем текст с пробелами, и выясняем,
  // содержит ли проверяемая строка все слова текста без исключения
  let str = encodeURIComponent(String(s).toLowerCase());
  let _wordsAsSubstr = encodeURIComponent(this.toLowerCase()).split("%20");
  let _flags = _wordsAsSubstr.map(sb => str.checkTheSubstr(sb));
  return !_flags.includes(false);
};
