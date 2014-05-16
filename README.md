devtools-detect
===============
> Detect when [Devtools](https://developer.chrome.com/devtools/index) is open for Chrome platform (extensions/apps)

## Quick start

* Download and drag and drop [example](/example) folder into ``chrome://extensions/`` page
* Then inspect the ``background page``

## Installation

Download [devtools-detect.js](/dist/devtools-detect.js)

```
\
    ...
    devtools-detect.js
    manifest.json
    background.js
    devtools.html
    devtools.js
    ...
```

### ``manifest.json``

```json
{
    ...
    "background": {
        "scripts": [
            "/devtools-detect.js",
            "/background.js"
        ]
    },
    "devtools_page": "devtools.html",
    ...
}
```

### ``background.js``

```js
//init
devtools_detect.background();

//listener
devtools_detect.addListener(function() {
    console.log('devtools is open !');
});
```

### ``devtools.html``

```html
<!DOCTYPE html>
<html>
<head>
    <script src="/devtools-detect.js"></script>
    <script src="/devtools.js"></script>
</head>
<body>

</body>
</html>
```

### ``devtools.js``

```js
//init
devtools_detect.devtools_page();
```

## API - background page

* ``.addListener``: add listener for Devtools open event.

```js
//listener
devtools_detect.addListener(function() {
    console.log('devtools is open !');
});
```