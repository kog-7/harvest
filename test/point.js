
var typeHim = function(dm) {
    if (dm === undefined) {
        return "undefined";
    }
    if (dm === null) {
        return "null";
    }
    var tp = typeof dm;
    if (tp === "string" || tp === "number" || tp === "function") {
        return tp;
    }
    tp = Object.prototype.toString.call(dm);
    if (tp.indexOf("rray") !== -1 || tp.indexOf("rguments") !== -1) {
        return "array";
    } else if (tp.indexOf("ragment") !== -1) {
        return "fragment"
    } else if (tp.indexOf("odeList") !== -1) {
        return "nodelist";
    } else if (tp.indexOf("lement") !== -1) {
        return "node";
    } else if (tp.indexOf("egExp") !== -1) {
        return "regexp";
    } else if (tp.indexOf("bject") !== -1) {
        return "object";
    } else {
        return false;
    }
};

var assert = require('assert');

describe('Array', function() {
  describe('typeHim', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(typeHim({}),"object");
    });
    it('should return -1 when the value is not present', function() {
      assert.equal(typeHim([]),"array");
    });
  });
});


// continue other test


