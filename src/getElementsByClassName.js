// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  let arr = [];

  const recurse = function recurseThroughDom(el) {
    if (el.classList && el.classList.contains(className)) {
      arr.push(el);
    }
    if (el.childNodes) {
      for (let i = 0; i < el.childNodes.length; i++) {
        recurseThroughDom(el.childNodes[i]);
      }
    }

  }

  recurse(document.body);
  return arr;
};
