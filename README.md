uploadfive
==========

A jQuery based file upload plugin.


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

Dependencies
=============

Needs jQuery, jQuery UI (progressbar) 

