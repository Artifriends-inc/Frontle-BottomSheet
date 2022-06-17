# Frontle BottomSheet

BottomSheet UI in Frontle



 [![NPM Version][npm-version-image]][npm-url]

 [![NPM Install Size][npm-install-size-image]][npm-install-size-url]

 [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```javascript
<style>
  .testBottomSheetContents{
      font-size: 16px;
  }
  .testBottomSheetContents1{
      color: black;
  }
</style>

let bottomSheet = new BottomSheet(this.handler, `
    <div>this is a bottomSheet<div>
`);
bottomSheet.sheetContentsClass = 'testBottomSheetContents testBottomSheetContents1';
bottomSheet.start = () => {
    console.log('bottom sheet start!');
}
bottomSheet.open();
```



## Installation

Installation is done using the

```shell
$ frontle install-original frontle-bottomsheet
```



## Function

#### new bottomSheet(handler, html)

Create a bottom sheet object

```javascript
let bottomSheet = new BottomSheet(this.handler, `
    <div>this is a bottom sheet<div>
`);
```



#### bottomSheet.CSSClass

Set the css class of a bottom sheet

```javascript
bottomSheet.sheetClass = 'classname';
bottomSheet.sheetContentsClass = 'classname';
bottomSheet.sheetBackgroundClass = 'classname';
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

Lifecycle running before the bottom sheet is rendered

```javascript
bottomSheet.awake () => { console.log('before rendering') }
```



#### bottomSheet.start

Lifecycle that runs after the bottom sheet is rendered

```javascript
bottomSheet.start () => { console.log('after rendering') }
```



#### bottomSheet.end

Lifecycle running before bottom sheet termination

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