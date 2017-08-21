// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return '' + obj;
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  } else if (obj === undefined || typeof obj === 'function') {
    return null;
  }
  if (Array.isArray(obj)) {
    let result = [];
    for (let i = 0; i < obj.length; i++) {
      result.push(stringifyJSON(obj[i]));
    }

    return '[' + result.join(',') +']';
  }
  if (typeof obj === 'object') {
    let result = [];
    for (var key in obj) {
      if (stringifyJSON(obj[key])) {
        result.push(stringifyJSON(key) + ':' + stringifyJSON(obj[key]));
      }
    }
    return '{' + result.join(',') +'}';
  }

};
