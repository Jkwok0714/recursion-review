// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;



// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  let depth = 0;
  const helper = function parseThruJSON(el, depth, inString) {
    if (el === '"' && inString) {
      inString = false;
      depth--;
    } else if (el === '"' && !inString) {
      inString = true;
      depth++;
    } else if (el === '[' || el === '{') {
      depth++;
    } else if (el === ']' || el === '}') {
      depth--;
    }
    return [depth, inString];
  };
  if (json[0] === '[') {
    if (json[1] === ']') {
      return [];
    }
    let container = [];
    let currStr = '';
    let inString = false;
    for (let i = 1; i < json.length; i++) {
      if (json[i] === '\\') {
        currStr += json[++i];
        continue;
      } else if (json[i] === ']' && depth === 0) {
        container.push(parseJSON(currStr.trim()));
        currStr = '';
        break;
      } else if (json[i] === ',') {
        if (depth === 0) {
          container.push(parseJSON(currStr.trim()));
          currStr = '';
          continue;
        }
      } else {
        [depth, inString] = helper(json[i], depth, inString);
      }
      currStr += json[i];
    }
    if (depth === 0 && currStr.length > 0) {
      throw new SyntaxError;
    }

    return container;
  } else if (json[0] === '{') {
    if (json[1] === '}') {
      return {};
    }
    let container = {};
    let currStr, currKey, currVal;
    [currStr, currKey, currVal] = ['', '', ''];
    let inString = false;
    for (let i = 1; i < json.length; i++) {
      if (depth < 0) {
        currStr = currStr.slice(0, -1);
        container[parseJSON(currKey.trim())] = parseJSON(currStr.trim());
        currStr = '';
        break;
      }
      if (json[i] === '}' && depth === 0) {
          container[parseJSON(currKey.trim())] = parseJSON(currStr.trim());
          currStr = '';
          break;
      } else if (json[i] === ',') {
        if (depth === 0) {
          container[parseJSON(currKey.trim())] = parseJSON(currStr.trim());
          [currStr, currKey, currVal] = ['', '', ''];
          continue;
        }
      } else if (json[i] === ':') {
        if (depth === 0) {
          currKey = currStr;
          currStr = '';
          continue;
        }
      } else if (json[i] === '\r' || json[i] === '\t' || json[i] === '\n') {
        continue;
      } else {
        [depth, inString] = helper(json[i], depth, inString);
      }
      currStr += json[i];
    }

    if (depth === 0 && currStr.length > 0) {
      throw new SyntaxError;
    }
    return container;
  } else if (json[0] === '"') {
    if (json[1] === '"') {
      return '';
    }
    return '' + json.slice(1, -1);
  }

  if (json === 'false') {
    return false;
  } else if (json === 'true') {
    return true;
  } else if (json === 'null') {
    return null;
  }

  return parseFloat(json);
};
