
// TODO: investigate using falafel:
//       https://github.com/substack/node-falafel
//       or Rocambole:
//       https://github.com/millermedeiros/rocambole/
var deepCompare = require('./lib/deep-compare');

var Pass = function () {
  this._matchers = [];
  this._type = null;
  this._doer = function () {}; // noop

  this.prereqs = [];
};

Pass.prototype.when = function (matcher) {
  if (this._type) {
    throw new Error("A pass cannot have additional conditions added after the 'do' function is registered");
  }
  if (typeof matcher === 'function') {
    this._matchers.push(matcher);
    return this;
  }
  if (typeof matcher === 'object') {
    this._matchers.push(function (ast) {
      
    });
    return this;
  }
  throw new Error("Matcher expected to be an AST chunk object or a function");
};

Pass.prototype.transform = function (doer) {
  this._registerDoer('transform', doer);
};

Pass.prototype.info = function (doer) {
  this._registerDoer('info', doer);
};

Pass.prototype._registerDoer = function (type, doer) {
  if (this._type || this._doer) {
    throw new Error("A pass cannot have more than one transform or info function");
  }
  if (typeof doer === 'function') {
    this._doer = doer;
    this._type = type;
  }
};

module.exports = function () {
  return new Pass();
};
