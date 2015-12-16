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
    /** fn(filename: string) create file at filepath + name */
    this.todoFilePath = createFile('myTodo.json');

    /** fn:(file: string, callback fn:(status: string, filepath: string)) */
    queryListStatus(this.todoFilePath, function(status, filepath) {
      if (status === 'empty') {
        var initListString = '{"name": "myTodo", "tasks":[]}';

        /** fn(file:string, emptyListString: string, fn:callback) */
        fs.writeFile(filepath, initListString, function(err) {
          if (err) console.log(err);
        });
      }
    });
  },

  list: function(callback) {
    fs.readFile(TodoList.todoFilePath, 'utf8', function(err, data) {
      var tasks = JSON.parse(data).tasks;
      var todo = JSON.parse(data);
      callback(tasks, todo);
    });
  },

  addItem: function(itemDesc, callback) {
    fs.readFile(TodoList.todoFilePath, 'utf8', function(err, data) {
      var currentData = JSON.parse(data);
      currentData.tasks.push({
        description: itemDesc,
        completed: false
      });
      var newData = JSON.stringify(currentData);
      fs.writeFile(TodoList.todoFilePath, newData, function(err) {
        if (err) throw err;
        console.log("wrote ", newData, " to ", TodoList.todoFilePath);
        if (callback) callback();
      });
    });
  },

  toggleItem: function(itemNumber, callback) {
    TodoList.list(function(tasks, todo) {
      if (tasks[itemNumber] !== undefined) {
        console.log('updating');
        var completedStatus = tasks[itemNumber].completed;
        tasks[itemNumber].completed = !completedStatus;
      } else {
        console.log('task number was not valid');
      }
      todo.tasks = tasks;
      var updateTodo = JSON.stringify(todo);
      fs.writeFile(TodoList.todoFilePath, updateTodo, function(err) {
        if (err) throw err;
        console.log('wrote new data: ', newData);
        if (callback) callback();
      });
    });
  },

  removeItem: function(itemNumber, callback) {
    TodoList.list(function(tasks, todo) {
      // remove task from todo if that task number is valid
      if (todo.tasks[itemNumber] !== undefined) {
        console.log('Removing task');
        todo.tasks.splice(itemNumber, 1);
      } else {
        console.log('Task number was not valid');
      }
      var updatedTodo = JSON.stringify(todo);
      // update myTodo.json with the changed tasks list
      fs.writeFile(TodoList.todoFilePath, updatedTodo, function(err) {
        if (err) console.error(err);
        if (callback) callback();
      });
    });
  }
};

function createFile(fileName) {
  var path = __dirname;
  var projectRoot = path.slice(0, path.length - 3);
  var JSONpath = projectRoot + 'todo-lists/';
  return JSONpath + fileName;
}

/** queryListStatus reads json file and list any tasks added to file */
function queryListStatus(file, callback) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) throw err;

    var taskData = null;
    var status = null;
    var tasks = null;
    /**
     * if data from json file is empty then set [status] to
     * empty.
     * if !empty then add key tasks from json file to var tasks.
     */
    if (data === '') {
      status = 'empty';
    } else {
      tasks = JSON.parse(data).tasks;
    }
    if (tasks === null) {
      status = 'empty';
    } else {
      status = 'notEmpty';
    }
    callback(status, file);
  });
}

module.exports = TodoList;
