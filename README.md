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
    autoDroptop: true,
    insideClosed: true,
    tranditionList: false,
    flexible: false
});
```
Attribute          |Type       |Default  |Description
-------------------|-----------|---------|-----------
`autoDroptop`      |*Boolean*  |`true`   |選單是否向上
`insideClosed`     |*Boolean*  |`true`   |點擊內部是否關閉
`tranditionList`   |*Boolean*  |`false`  |是否直接建立一個基本的選單
`flexible`         |*Boolean*  |`false`  |是否需要響應式的選單（需搭配scrollbar套件）
