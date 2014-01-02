var ID = require('./index')
  , assert = require('assert')
  , async = require('async')
  , tests = [];

// Make sure a real student works
tests.push(function (next) {
  console.log('Test: real student');
  ID('kbng2', function (err, details) {
    assert.ifError(err);

    assert.equal(details.firstname, 'Benjamin');
    assert.equal(details.lastname, 'Ng');

    next();
  });
});

// Make sure a fake student fails
tests.push(function (next) {
  console.log('Test: fake student');
  ID('googlygoop', function (err) {
    assert.ok(err != null);

    next();
  });
});

 async.series(tests);
