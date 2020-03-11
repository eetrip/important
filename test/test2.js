// var async = require("async");
var toobusy = require("toobusy-js");

var LAUNCH_DELAY = 10; // 100 requests/second
var SYNC_WORK = 8; // 8ms of synchronous work per task
var TASK_DELAY = 20;

var concurrent = 0;
var completed = 0;

var doSyncWork = function() {
  var start = new Date();
  var now = new Date();
  while (now.getTime() - start.getTime() < SYNC_WORK) {
    now = new Date();
  }
};

var doTask = function() {
  concurrent += 1;

  setTimeout(function() {
    concurrent -= 1;
    completed += 1;
    doSyncWork();
  }, TASK_DELAY);
};

var writeStatus = function() {
  console.log("lag:", toobusy.lag());
  console.log(" concurrent:", concurrent);
  console.log("  completed:", completed);
  completed = 0;
};

setInterval(writeStatus, 250);

var previous;

var go = function() {
  setTimeout(function() {
    var now = new Date();
    var count = 1;

    if (previous) {
      // replicating lots of events coming in while event loop blocked
      var delta = now.getTime() - previous.getTime();
      count = Math.floor(delta / LAUNCH_DELAY);
    }

    for (var i = 0; i < count; i += 1) {
      doTask();
    }

    previous = now;
    go();
  }, LAUNCH_DELAY);
};

go();
