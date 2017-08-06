// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

    if ([undefined, 'function'].includes(typeof obj)) {
      return undefined
    };

    if (typeof obj === 'string') {
  	  return '"' + obj + '"'
    }; 

    if (obj === null || ['boolean', 'number'].includes(typeof obj)) {
  	  return ("" + obj)
    };

    if (Array.isArray(obj)) {
  	  var output = '[';
  	  for (var i = 0; i < obj.length; i++) {
  	    output += stringifyJSON(obj[i]);
  	    if (i + 1 < obj.length) {
  	  	  output += ',';
  	    }; 
  	  };	
  	  output += ']';
  	  return output
    }

    if (typeof obj === 'object') {
  	  var output = '{';
  	  var hadOne = false;	
  	  for (var i in obj) {
  	    if (hadOne === true) {
  	  	  output += ',';
  	    };
  	    var tempOutputKey = stringifyJSON(i);
  	    var tempOutputVal = stringifyJSON(obj[i]);
  	    if (tempOutputKey !== undefined && tempOutputVal !== undefined) {
  	      output += tempOutputKey + ':' + tempOutputVal;
  	      hadOne = true; 
  	    };	
      };
    output += '}';
    return output  
    }; 
};
