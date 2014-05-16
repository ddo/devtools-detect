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