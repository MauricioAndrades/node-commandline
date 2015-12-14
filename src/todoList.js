var fs = require('fs'); // builtin module, how do we know?


/* This is a class, even if it's not using a constructor function. Instead
   We are using the init function as a constructor.
*/
var TodoList = {

    /**
     * This function reads our todo list file, and if it's empty it initializes
     * such a file with a todo object.
     */
    init: function() {
        this.todoFilePath = createFilePathFor("myTodo.json");

    },
}

function createFile(fileName){
    var path = __dirname + '/' + fileName;

}
module.exports = TodoList;
