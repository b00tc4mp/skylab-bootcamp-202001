function firstUppercase(word) {
  var first = word[0].toUpperCase()
  return `${first}${word.slice(1)}`
}