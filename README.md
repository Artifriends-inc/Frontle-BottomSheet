# Frontle BottomSheet

BottomSheet UI in Frontle

 [![NPM Version][npm-version-image]][npm-url]

 [![NPM Install Size][npm-install-size-image]][npm-install-size-url]

 [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

![화면-기록-2022-07-12-오후-5.15.45](https://user-images.githubusercontent.com/49587288/178443655-a3cb7cde-4502-4a4d-b11c-a6eb44d4fddb.gif)

```javascript
// at css file
.testBottomSheetContents{
    font-size: 16px;
}
.testBottomSheetContents1{
    color: black;
}

// at js file
import {BottomSheet} from "../../frontle/browser_modules/frontle-bottomsheet/bottomSheet.js";

let bottomSheet = new BottomSheet(`
    <div>this is a bottomSheet<div>
`);
bottomSheet.sheetContentsClass = 'testBottomSheetContents testBottomSheetContents1';
bottomSheet.start = () => {
    console.log('bottom sheet start!');
}
bottomSheet.open();
```



## Installation

**How to install from Frontle**

```shell
$ frontle install frontle-bottomsheet
```



## Function

#### new bottomSheet(html)

Create a bottom sheet object

```javascript
let bottomSheet = new BottomSheet(`
    <div>this is a bottomSheet<div>
`);
```



#### bottomSheet.CSSClass

Set the css class of a bottom sheet

```javascript
bottomSheet.sheetClass = 'css_class_name';
bottomSheet.sheetContentsClass = 'css_class_name';
bottomSheet.sheetBackgroundClass = 'css_class_name';
```



#### bottomSheet.height

Set bottom sheet height

```javascript
bottomSheet.height = 50; // 50vh
```



#### bottomSheet.startY

Set bottom sheet start y position

```javascript
bottomSheet.startY = 0; // 0vh
```



#### bottomSheet.backgroundClickExit

Set whether to end the bottom sheet when you click on the bottom sheet background

```javascript
bottomSheet.backgroundClickExit = 'true';
```



#### bottomSheet.awake

This lifecycle runs before modal rendering.

```javascript
bottomSheet.awake () => { console.log('before rendering') }
```



#### bottomSheet.start

This lifecycle runs after modal rendered

```javascript
bottomSheet.start () => { console.log('after rendering') }
```



#### bottomSheet.end

This lifecycle runs before modal termination

```javascript
bottomSheet.end () => { console.log('end') }
```



#### bottomSheet.open()

Open bottom sheet

```javascript
bottomSheet.open();
```



#### bottomSheet.close()

Close bottom sheet

```javascript
bottomSheet.close();
```



## People

The original author of frontle-bottomsheet is [MushStory](https://github.com/MushStory)



## License

 [MIT](LICENSE)



[npm-downloads-image]: https://badgen.net/npm/dm/frontle-bottomsheet
[npm-downloads-url]: https://npmcharts.com/compare/frontle-bottomsheet?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/frontle-bottomsheet
[npm-install-size-url]: https://packagephobia.com/result?p=frontle-bottomsheet
[npm-url]: https://npmjs.org/package/frontle-bottomsheet
[npm-version-image]: https://badgen.net/npm/v/frontle-bottomsheet