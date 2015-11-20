// from MDNs 'this' page
// use this page & Sublime's built-in Regular Express search (CMD +f)
// to test your RegExs before production
function add(c, d){
  return this.a + this.b + c + d;// 5 this: {a:1} {b:3}// 5 this: {a:1} {b:3}
}

var o = {a:1, b:3};

// The first parameter is the object to use as
// 'this', subsequent parameters are passed as 
// arguments in the function call
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

function testFxn(){
  return this.name;// 21 this: {name:William, age:23}
}

var obj = {name: 'William', age: 23};

testFxn.call(obj);