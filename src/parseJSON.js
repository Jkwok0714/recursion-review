// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;



// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  let depth = 1;
  // your code goes here
  if (json[0] === '[') {
    if (json[1] === ']') {
      return [];
    }

    let container = [];
    let currStr = '';
    let inString = false;
    for (let i = 1; i < json.length; i++) {


      if (json[i] === '"' && inString) {
        inString = false;
        depth--;
      } else if (json[i] === '"' && !inString) {
        inString = true;
        depth++;
      } else if (json[i] === '[') {
        depth++;
      } else if (json[i] === '{') {
        depth++;
      } else if (json[i] === ']') {
        depth--;
      } else if (json[i] === '}') {
        depth--;
      } else if (json[i] === ',') {
        if (depth === 1) {
          container.push(parseJSON(currStr.trim()));
          currStr = '';
          continue;
        }
      }
      currStr += json[i];

      if (i === json.length-1){
        depth--;
        //currStr += json[i];
        // console.log('cur str is', currStr);
        container.push(parseJSON(currStr.trim()));
        currStr = '';
      }
    }

    console.log('Depth is ', depth);

    if (depth !== 0) {
      //throw new SyntaxError;
      return container;
    } else {
      return container;
    }
  } else if (json[0] === '{') {
    if (json[1] === '}') {
      return {};
    }
    let container = {};
    let currStr = '';
    let currKey = '';
    let currVal = '';
    let inString = false;

    for (let i = 1; i < json.length; i++) {
      if (json[i] === '"' && inString) {
        inString = false;
        depth--;
      } else if (json[i] === '"' && !inString) {
        inString = true;
        depth++;
      } else if (json[i] === '[') {
        depth++;
      } else if (json[i] === '{') {
        depth++;
      } else if (json[i] === ']') {
        depth--;
      } else if (json[i] === '}') {
        depth--;
      } else if (json[i] === ',') {
        if (depth === 1) {
          currVal = currStr;
          container[parseJSON(currKey.trim())] = parseJSON(currVal.trim());
          currStr = '';
          currKey = '';
          currVal = '';
          continue;
        }
      } else if (json[i] === ':') {
        if (depth === 1) {
          currKey = currStr;
          currStr = '';
          continue;
        }
      } else if (json[i] === '\r' || json[i] === '\t' || json[i] === '\n') {
        continue;
      }
      currStr += json[i];

      if (depth === 0) {
        currStr = currStr.slice(0, -1);
        currVal = currStr;
        container[parseJSON(currKey.trim())] = parseJSON(currVal.trim());
        currStr = '';
        //depth = 0;
        break;
      }
      if (i === json.length-1) {
        //currStr += json[i];
        currVal = currStr;
        container[parseJSON(currKey.trim())] = parseJSON(currVal.trim());
        currStr = '';
        break;
      }
    }



    if (depth !== 0) {
      throw new SyntaxError;
      return container;
    } else {
      return container;
    }


  } else if (json[0] === '"') {
    if (json[1] === '"') {
      return '';
    }
    let currStr = '';
    for (var i = 1; i<json.length-1; i++) {
      if (json[i] === '\\') {
        currStr += json[i+1];
        i++;
      } else {
        currStr += json[i];
      }
    }

    return currStr;
  }

  if (json === 'false') {
    return false;
  } else if (json === 'true') {
    return true;
  } else if (json === 'null') {
    return null;
  }
  // console.log('number');
  return parseFloat(json);
};
