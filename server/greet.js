'use strict'
module.exports = function greet (names) {
  return names.reduce(composeGreeting , "")
}

function composeGreeting (result, name, idx, names) {
  if (idx === 0) {
    return name
  } else if (idx === names.length - 1){
    return `${result} and ${name}`
  } else {
    return `${result}, ${name}`
  }
}
