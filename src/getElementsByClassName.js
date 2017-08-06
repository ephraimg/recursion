// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
    var output = (output || []);
	var checkElement = function(elem) {
		if (elem.classList !== undefined) {
          if (elem.classList.contains(className)) {
		  output.push(elem);
		  };
		};
	    if (elem.hasChildNodes) {
		  elem.childNodes.forEach(function (x) {checkElement(x)});
	    };
	};
	console.log(document.body.childNodes);
	checkElement(document.body);
	console.log(output);
	return output;
};



