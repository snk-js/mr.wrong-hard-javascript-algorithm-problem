var mocha = require('mocha');
var Base = mocha.reporters.Base;

function SilentReporter(runner) {
  Base.call(this, runner);

  runner.on('pass', function (test) {
    console.log('Pass -', test.title);
  });

  runner.on('fail', function (test, err) {
    // Do nothing on failure
  });

  runner.on('end', function () {
    // suppress the normal epilogue
  });
}

module.exports = SilentReporter;