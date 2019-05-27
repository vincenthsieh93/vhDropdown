# jQuery vhDropdown  
  
  
vhDropdown is a simple jQuery drop-down plugin。  
主要源於工作上需要且因應統一的設計規範，從而用於提高團隊效率及簡化流程而撰寫。  
  
  
## Usage

##### Include jQuery:
```html
<script src="jquery-3.2.1.min.js"></script>
```
##### Include plugin's CSS and JS:
```html
<link rel="stylesheet" href="jquery.vhDropdown.css">
<script src="jquery.vhDropdown.js"></script>
```
##### Call the plugin
```js
$("#element_id").vhDropdown();
```


## Options

```js
$("#element_id").vhDropdown({
    dropdownUpper: true,
    insideClosed: true,
    tranditionList: false,
    flexible: false
});
```
Attribute          |Type       |Default  |Description
-------------------|-----------|---------|-----------
`dropdownUpper`    |*Boolean*  |`true`   |
`insideClosed`     |*Boolean*  |`true`   |
`tranditionList`   |*Boolean*  |`false`  |
`flexible`         |*Boolean*  |`false`  |
