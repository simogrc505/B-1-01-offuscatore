const { curry, assoc, reduce, keys, ifElse, isNil, identity, bind } = require('ramda')

const if_not_null_convert = curry(ifElse(isNil, identity))

const renameKeys = curry((keysMap, obj) => reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj)))

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomString(minLength, maxLength) {

  let result = '';
  for (let i = randomNumber(minLength, maxLength); i > 0; --i){
    result += chars[randomNumber(0, chars.length)];
  }
  return result;
}

function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min)) + min
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomEmail () {
  return chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,11) + '@random.com';
}

const stringify = bind(JSON.stringify, JSON)
module.exports = {
  if_not_null_convert,
  renameKeys,
  stringify,
  randomEmail,
  randomDate,
  randomNumber,
  randomString
}
