
;(function(){

/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("devtools-detect", function (exports, module) {
exports.devtools_page = function() {
    chrome.devtools.panels.create(
        null,
        null,
        null,
        function(panel) {
            chrome.runtime.connect({
                name: "devtools-detect"
            });
        }
    );
};

var listeners = [];

exports.background = function() {
    chrome.runtime.onConnect.addListener(function (port) {
        if(port.name === 'devtools-detect') {
            for(var i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        }
    });
};

exports.addListener = function(callback) {
    listeners.push(callback);
};
});

if (typeof exports == "object") {
  module.exports = require("devtools-detect");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("devtools-detect"); });
} else {
  this["devtools_detect"] = require("devtools-detect");
}
})()
