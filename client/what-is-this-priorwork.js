var colors = require('colors');
var execSync = require('child_process').execSync;
console.log(arguments[2]);
var str = execSync('cat ' + arguments[3].filename).toString('utf8');

var locateThese = function(codeBlock) {
    var locs = codeBlock.split('\n');
    console.log(locs);
    var count = 0;

    console.log(this);


    for (var i=0; i<locs.length; i++) {
        var matches = locs[i].match(/\bthis\b/g);
        if (matches !== null) {
            count += matches.length;
            console.log((i+1) + '. ' + locs[i].trim().underline.red);
        }
    }
    return count;
};

console.log(str);
console.log('total no. of this\'s: ' + locateThese(str));

