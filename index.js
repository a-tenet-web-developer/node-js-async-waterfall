const async = require('async');
const fs = require('fs');

// Example tasks
const tasks = [
  function readData(callback) {
    fs.readFile('file1.txt', 'utf8', (err, data) => {
      if (err) return callback(err);
      callback(null, data); // Passes data to the next function
    });
  },
  function modifyData(data, callback) {
    const newData = data.toUpperCase();
    callback(null, newData); // Passes modified data to the next function
  },
  function writeData(newData, callback) {
    fs.writeFile('file2.txt', newData, (err) => {
      if (err) return callback(err);
      callback(null, 'Successfully wrote file2.txt'); // Final callback
    });
  }
];

// Execute tasks in waterfall
async.waterfall(tasks, (err, result) => {
  if (err) {
    console.error('Waterfall failed:', err);
  } else {
    console.log('Waterfall completed:', result);
  }
});


// Explanation of the Example
// In this example:

// readData: Reads file1.txt asynchronously. It passes the file contents (data) to the next function in the waterfall (modifyData).
// modifyData: Receives data, converts it to uppercase (newData), and passes newData to writeData.
// writeData: Writes newData to file2.txt. Upon successful completion, it calls the final callback with a success message ('Successfully wrote file2.txt').
// Key Points
// Each function in the tasks array takes a callback that it calls upon completion.
// Errors are propagated to the final callback ((err, result)).
// If any task encounters an error, subsequent tasks are skipped, and the final callback is called immediately with the error.
