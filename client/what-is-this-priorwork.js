// maybe we can use WebPack to take advantage of CommonJS module
// style, i.e. require(..) on the client-side

var XRegExp = require('xregexp');
var colors = require('colors');
var execSync = require('child_process').execSync;
var fs = require('fs');

var file = fs.readFileSync('./regex-testing-grounds.js').toString('utf8');
// make a backup
fs.writeFileSync('_original.js', file);

// return value: array of objects {lineNumber: numThis}
var locateThese = function(codeBlock) {
    var lines = codeBlock.split('\n');
    var count = 0;

  	var lineNumber = -1;
  	var charPos = -1;
  	var numOccurrences = 0;
  	var occurrences = [];
  	var occurrence;
    lines.forEach(function(line, idx) {
    	if(isComment(line)) {
    		return;
    	}
  		occurrence = {};
    	numOccurrences = countThis(line);
    	if(numOccurrences) {
    		lineNumber = idx + 1;
    		occurrence[lineNumber] = numOccurrences;
    		occurrences.push(occurrence);
    	}
    });
    return occurrences;
};

// return number of 'this' in string
var countThis = function(string) {
	var re = /\bthis\b/g;
	return XRegExp.match(string, re).length;
};

// return Boolean
var isComment = function(line) {
	var re = /^\/\//;
	return (XRegExp.match(line, re) !== null);
};

// return value: a modified codeBlock string
var injectConsoleLogs = function(codeBlock, occurrences) {
	var lineNumbers = occurrences.map(function(occurrence) {
		return Object.keys(occurrence);
	});
	console.log('lineNumbers: ' + lineNumbers);
	var lines = codeBlock.split('\n');
	var injection;
  lineNumbers.forEach(function(lineNumber, idx) {
    lines[lineNumber-1] = '$_$_$[' + lineNumber + '] = "' + lines[lineNumber-1] + '"';
  	injection = 'execSync("echo ' + lineNumber + ' this: {" + JSON.stringify(this) + "} >> results.txt");';
    lines[lineNumber-1] = injection + lines[lineNumber-1];
  });
  return lines.join('\n');
};

var addDependencies = function(codeBlock) {
	var headers = 'var $_$_$ = {};\n';
	headers += 'var execSync = require("child_process").execSync;\n';
	headers += 'execSync("> results.txt");\n';
	return headers + codeBlock;
};

var addFooter = function(codeBlock) {
	var footer = 'for (var key in $_$_$) { console.log(key + ". " + $_$_$[key]); }\n';
	return codeBlock + footer;
}

var occurrences = locateThese(file);
var injectedFile = injectConsoleLogs(file, occurrences);
injectedFile = addDependencies(injectedFile);
injectedFile = addFooter(injectedFile);
fs.writeFileSync('transformed.js', injectedFile);

// execute transformed.js...
// builds file with line numbers and this bindings







