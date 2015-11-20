var fs = require('fs');

// read from backup
console.log('here');
var originalFile = fs.readFileSync('./_original.js').toString('utf8');
var originalFile = originalFile.split('\n');

var lineNumsAndBindings = fs.readFileSync('results.txt').toString('utf8');
lineNumsAndBindings = lineNumsAndBindings.split('\n');
lineNumsAndBindings.forEach(function(lineNumAndBinding) {
	var lineNum = lineNumAndBinding.match(/^[0-9]+/);
	console.log(lineNumAndBinding);
	var comment = lineNumAndBinding;
	originalFile[lineNum-1] += '// ' + comment;
});

fs.writeFileSync('final.js', originalFile.join('\n'));