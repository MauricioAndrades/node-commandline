var fs = require('fs');

function printPath(fileName) {
    var path = __dirname;
    var projectRoot = path.slice(0, path.length - 3);
    var JSONpath = projectRoot + 'todo-lists/' + 'myTodo.json';
}

printPath("/todolist.js");

// define our function with the callback argument
function some_function(arg1, arg2, callback) {
    // this generates a random number between
    // arg1 and arg2
    var my_number = Math.ceil(Math.random() *
        (arg1 - arg2) + arg2);
    // then we're done, so we'll call the callback and
    // pass our result
    callback(my_number);
}
// call the function
some_function(5, 15, function(num) {
    // this anonymous function will run when the
    // callback is called
    console.log("callback called! " + num);
});
