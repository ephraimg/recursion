var parseJSON = function(json) {
  
  
  // OBJECTS

	var parseJSONobj = function(str) {

	 var newObj = {};
    var inner = str.slice(1, str.length - 1);
    inner = inner.trim();
    console.log("Parsing object. Inner is: ", inner,"of type", typeof inner)
    while (inner.length > 0) {
      console.log("In the while loop...");
      console.log("Currently, inner is:",inner,"of length", inner.length)
      inner = processProperty(inner, newObj);
    }
    return newObj;
  };
  
  

	var processProperty = function(str, obj) {
		var key = getKey(str);
		//key = key.slice(1,key.length-1);
		//console.log("Key is: ",key)
		//console.log("Remaining str is: ",str)

		str = str.slice(key.length+2);
		//console.log("Remaining str is: ",str)

		str = cutColon(str);
    str = str.trim();
		//console.log("Remaining str is: ",str)
		var val = getVal(str);
		str = str.slice(val.length);
		str = str.replace(/^\s*\,\s*/,'');
    //str = str.replace(/\s$/);
		val = mainRoutine(val);
    //console.log("Post-parse el is: ", val, ", of type ", typeof val)
		obj[key] = val;
		return str 
	};

    var getKey = function(str) {
      for (let i = 0; i < str.length; i++) {
        var parsedSlice = parseJSONstr(str.slice(0, i + 1));
        if (parsedSlice === undefined) {
          continue
        } else {
          if (/((^\s*\:\s*)|(^\s*$))/.test(str.slice(i + 1))) {
            return parsedSlice;
          } else {
            continue
          }
        }
      }
      return undefined;
    };

    var getVal = function(str) {
      for (let i = 0; i < str.length; i++) {
        var parsedSlice = mainRoutine(str.slice(0, i + 1));
        console.log("ParsedSlice attempt is: ",str.slice(0, i + 1))
        if (parsedSlice === undefined) {
          console.log("...failed!")
          continue
        } else {
          console.log("ParsedSlice success is: ",str.slice(0, i + 1))
          if (/((^\s*\,\s*)|(^\s*$))/.test(str.slice(i + 1))) {
            return str.slice(0, i + 1);
          } else {
            continue
          }
        }
      }
      return undefined;
    };


	var cutColon = function(str) {
		var output = str.match(/^\s*\:\s*/);
		if (output === null) {
		  return str;
		} else {
		return str.slice(output[0].length);
		};
	};
  
  
  

  // ARRAYS

  var parseJSONarr = function(json) {

    var getElement = function(str) {
      for (let i = 0; i < str.length; i++) {
        var parsedSlice = mainRoutine(str.slice(0, i + 1).trim());
        console.log("ParsedSlice attempt for array element is: ",str.slice(0, i + 1))
        if (parsedSlice === undefined) {
          console.log("...failed!")
          continue
        } else {
          console.log("ParsedSlice success is: ",str.slice(0, i + 1))
          if (/((^\s*\,\s*)|(^\s*$))/.test(str.slice(i + 1))) {
            return str.slice(0, i + 1);
          } else {
            continue
          }
        }
      }
      return undefined;
    };    

    var processElement = function(str, arr) {
      console.log("Processing element...")
      var el = getElement(str);
      console.log("Initial el is: ", el, ", of type ", typeof el)
      if (el === undefined) {
        return undefined;
      }
      console.log("el.length is: ",el.length)
      str = str.slice(el.length);
      str = str.replace(/^\s*\,?\s*/, '');
      el = mainRoutine(el);
      console.log("Post-parse el is: ", el, ", of type ", typeof el)
      arr.push(el);
      return str;
    };

    var newArr = [];
    var inner = json.slice(1, json.length - 1);
    inner = inner.trim();
    console.log("Parsing array. Inner is: ", inner,"of type", typeof inner)
    while (inner.length > 0) {
      console.log("In the while loop...");
      console.log("Currently, inner is:",inner,"of length", inner.length)
      inner = processElement(inner, newArr);
    }
    return newArr;
  };


  // NUMBERS

  var regexJSONnum = /(^\-?0\.\d+$)|(^\-?[1-9]+\d*\.\d+$)|(^\-?[1-9]\d*$)/;
  var parseJSONnum = function(json) {
    console.log('The num is:',json,", of type", typeof json)
    //var strNum = json.match(regexJSONnum)[0];
    //console.log(strNum)
    return Number(json);
  };
  
  var isBracketMatched = function(str) {
    var bracketCount = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '[') {bracketCount++}
      if (str[i] === ']') {bracketCount--}
    }
    return bracketCount === 0
  }
  
  var isCurlyMatched = function(str) {
    var bracketCount = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '{') {bracketCount++}
      if (str[i] === '}') {bracketCount--}
    }
    return bracketCount === 0
  }
  
  // var findMatchedBracketString = function(str, idx) {
  //   for (let i = idx; i < str.length; i++) {
  //     if (isBracketMatched(str.slice(idx,i))) {
  //       return str.slice(idx,i);
  //     }
  //   }
  //   return undefined
  // }

// STRINGS

	var regexJSONstr = /^\"[-(\\\\)(\\")(\\')(\\/)(\\b)(\\f)(\\n)(\\r)(\\t)a-zA-Z0-9\,\s\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u02B0-\u02FF\u2000-\u206F\u2070-\u209F\u20A0-\u20CF\u2100-\u214F\u2150-\u218F\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u2980-\u29FF\u2A00-\u2AFF\u2B00-\u2BFF]*\"$/;
	// unicode is a problem... \u0080-\u0021\u0023-\u005B\u005D-\u007F\uFFF0-\uFFFF
	// (\\u((0-9)|(A-F))((0-9)|(A-F))((0-9)|(A-F))((0-9)|(A-F)))
	// \u0080-\u00FF
	var parseJSONstr = function(json) {
		if (regexJSONstr.test(json)) {
      var matchedStr = json.match(regexJSONstr)[0];
      console.log("Matched string is: ", matchedStr);

      var newStr = '';
      var shouldKeep = false;
      for (let i = 0; i < matchedStr.length; i++) {
        console.log("\n Starting new i. newStr is: ", newStr, "\n");
        console.log("i is: ", i, "matchedStr[i] is: ", matchedStr[i]);
        if (matchedStr[i] === '\\') {
            console.log("Found a slash");
            if (shouldKeep === false) {
              console.log("Ignoring it")
              shouldKeep = true;
              //continue;
            } else {
              console.log("Adding it to newStr");
              newStr += matchedStr[i];
              shouldKeep = false;
            };
        } else {
          console.log("Non-slash, so adding it to newStr");
          newStr += matchedStr[i]
          shouldKeep = false;
		    };
	    };
      console.log("Final newStr is: ", newStr);
      console.log(newStr.slice(1, newStr.length-1))

       return newStr.slice(1, newStr.length-1);
    } else {
      return undefined;
    };
  };
	
  // MAIN ROUTINE

  var mainRoutine = function(json) {
  	if (json === "true") {return true};
		if (json === "false") {return false};
		if (json === "null") {return null};  
		if (json[0] === '"' && json[json.length-1] === '"') {
			return parseJSONstr(json);
	 	};
    if (regexJSONnum.test(json) || json === '0') {
      return parseJSONnum(json);
    }
    if (json[0] === '[' && isBracketMatched(json)) {
      return parseJSONarr(json);
    }
    if (json[0] === '{' && isCurlyMatched(json)) {
      console.log("Found an object!");
	   	return parseJSONobj(json);
	  };
  };
  
  json = json.replace(/[\r\n]/g, '');
  return mainRoutine(json);
};

