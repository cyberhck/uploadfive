uploadfive
==========
### Started doing this project just for fun, but it turned out to be used in many of my projects.
A jQuery based file upload plugin, but still this is a spaghetti code, may be it is very hard to understand the code, and so is its maintainability, but for now, I'm using this, still looking forward if I can change the code entirely and solve some issues, currently there is only 2 issues, one is you can use this plugin only once in a document. And you have no control when the file upload is success, I'll be re coding this is node.js's way, still you can hack around uploadfive.js and change the script which is used to handle the complete event. And one more thing, you can't really hit cancel once the upload has started, so if your user wants to hit cancel, tell them to refresh the browser.


Usage
=======

Include  `uploadfive.js`

Use the following script

```js
$(document).ready(function(e) {
$("#uploadfive").uploadfive();
});
```

And add the following html
```html
<div id="upload" action="method.php"></div>
```

`method.php` must contain your real file upload script. You can also use it for `asp` or `jsp` just change the `action` attribute for the div.

The element to be made upload client must be a ```<div>``` element, it can not be a ```<form>```.
Dependencies
=============

Needs jQuery, jQuery UI (progressbar) 

