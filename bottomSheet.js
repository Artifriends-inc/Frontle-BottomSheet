'use strict';

import {BottomSheetManager} from "./bottomSheetManager.js";

export class BottomSheet {
    sheetManager = null;
    sheetId = null;
    handler = null;

    // required options
    html = ``;

    // status
    mousedown = false;
    mouseup = false;
    bottomSheetElement = null;

    // custom options
    height = 50;
    startY = 0;
    sheetClass = '';
    sheetContentsClass = '';
    sheetBackgroundClass = '';
    backgroundClickExit = true;

    awake = () => {};
    start = () => {};
    end = () => {};

    constructor(html) {
        if(html === null) throw 'html must be entered';

        this.html = html;

        this.handler = document.querySelector('.rootPage').id;
        this.sheetManager = BottomSheetManager.getInstance(this.handler);
    }

    open() {
        if(this.sheetId !== null){
            // sheet is already opened
            if(this.sheetManager.checkOpenedStatus(this.sheetId)) return;

            // animation is running
            if(this.sheetManager.checkAnimationStatus(this.sheetId)) return;
        }

        // get z-index
        let zIndex = this.sheetManager.getZIndex();

        // set sheet id
        this.sheetId = 'frontleBottomSheet' + zIndex;

        // start sheet open
        this.sheetManager.startOpen(this);

        // add default sheet css
        if(document.getElementById('frontleBottomSheetCSS') === null){
            let sheetCSSElement = document.createElement('style');
            sheetCSSElement.setAttribute('id', 'frontleBottomSheetCSS');
            sheetCSSElement.innerHTML = `
                .frontleBottomSheet{
                    position: fixed;
                
                    width: 100%;
                    height: 100%;
                
                    top: 0;
                    left: 0;
                }
                .frontleBottomSheetBackground{
                    position: fixed;
                
                    width: 100%;
                    height: 100%;
                
                    top: 0;
                    left: 0;
                
                    background: #000000;
                    opacity: 0;
                }
                .frontleBottomSheetContents{
                    position: fixed;
                
                    width: 100%;
                
                    bottom: 0vh;
                
                    margin: 0 auto;
                    padding: 0rem 1.5rem 0rem 1.5rem;
                    
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                
                    box-sizing: border-box;
                    background: #ffffff;
                    overflow: hidden;
                }
                .frontleBottomSheetBar{
                    position: relative;
                    display: block;
                
                    padding-top: 9px;
                    padding-bottom: 9px;
                }
                .frontleBottomSheetBarLine{
                    position: relative;
                    display: block;
                
                    margin: 0 auto;
                    margin-top: 2px;
                    margin-bottom: 2px;
                
                    width: 40px;
                    height: 2px;
                
                    background: #bbbbbb;
                }
                .frontleBottomSheetHtml{
                    position: relative;
                    display: block;
                
                    width: 100%;
                    height: calc(100% - 44px);
                
                    overflow: scroll;
                
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
                .frontleBottomSheetHtml::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera*/
                }
            `;
            document.head.insertBefore(sheetCSSElement, document.head.childNodes[0]);
        }

        // set html
        let html = `
            <div id="frontleBottomSheetBackground_${this.sheetId}" class="frontleBottomSheetBackground ${this.sheetBackgroundClass}" style="z-index: ${zIndex}"></div>
            <div id="frontleBottomSheetContents_${this.sheetId}" class="frontleBottomSheetContents ${this.sheetContentsClass}" style="
                max-height: ${this.height}vh;
                height: ${this.height}vh;
                z-index: ${zIndex + 1};
                bottom: -${this.height}vh;
                transition: bottom ease 0.4s 0s;
            ">
                <div id="frontleBottomSheetBar_${this.sheetId}" class="frontleBottomSheetBar">
                    <div class="frontleBottomSheetBarLine"></div>
                    <div class="frontleBottomSheetBarLine"></div>
                </div>
                <div id="frontleBottomSheetHtml_${this.sheetId}" class="frontleBottomSheetHtml">${this.html}</div>
            </div>
        `;

        // add sheet
        let sheetElement = document.createElement('div');
        sheetElement.setAttribute('id', this.sheetId);
        sheetElement.className = `frontleBottomSheet ${this.sheetClass}`;
        sheetElement.innerHTML = html;
        sheetElement.style.zIndex = String(zIndex);
        document.getElementById(this.handler).append(sheetElement);

        // run lifecycle
        this.awake();

        // start sheet animation
        setTimeout(() => {
            // background opacity
            let sheetBackground = document.getElementById(`frontleBottomSheetBackground_${this.sheetId}`);
            sheetBackground.style.opacity = '0.4';

            // contents pos move up
            document.getElementById(`frontleBottomSheetContents_${this.sheetId}`).style.bottom = `${this.startY}vh`;
        }, 0);

        // end modal animation
        setTimeout(() => {
            // set mouse down event
            document.querySelector(`#frontleBottomSheetBar_${this.sheetId}`).addEventListener('mousedown', () => this.sheetManager.eventMouseDown(), false);
            document.querySelector(`#frontleBottomSheetBar_${this.sheetId}`).addEventListener('touchstart', (e) => this.sheetManager.eventMouseDown(e.changedTouches[0]), false);

            // set mouse up evnet
            document.addEventListener('mouseup', (e) => this.sheetManager.eventMouseUp(e), false);
            document.addEventListener('touchend', (e) => this.sheetManager.eventMouseUp(e.changedTouches[0]), false);

            // set mouse move evnet
            document.addEventListener('mousemove', (e) => this.sheetManager.eventMouseMove(e), false);
            document.addEventListener('touchmove', (e) => this.sheetManager.eventMouseMove(e.changedTouches[0]), false);

            // set close event
            if(this.backgroundClickExit === true){
                document.querySelector(`#frontleBottomSheetBackground_${this.sheetId}`).addEventListener('click', () => {
                    this.close();
                }, false);
            }

            // delete animation
            document.getElementById(`frontleBottomSheetContents_${this.sheetId}`).style.removeProperty('transition');

            // end sheet open
            this.sheetManager.endOpen(this.sheetId);

            // lifecycle
            this.start();
        }, 0.4 * 1000);
    }

    close() {
        // non sheet
        if(this.sheetId === null) return;

        // modal is not opened
        if(this.sheetManager.checkOpenedStatus(this.sheetId) === false) return;

        // animation is running
        if(this.sheetManager.checkAnimationStatus(this.sheetId)) return;

        // start sheet close
        this.sheetManager.startClose(this.sheetId);

        // run lifecycle
        this.end();

        // start sheet animation
        // background opacity
        let sheetBackground = document.getElementById(`frontleBottomSheetBackground_${this.sheetId}`);
        if(sheetBackground !== null) sheetBackground.style.opacity = '0';

        // contents pos move down
        let sheetContents = document.getElementById(`frontleBottomSheetContents_${this.sheetId}`);
        if(sheetContents !== null) {
            sheetContents.style.transition = 'bottom ease 0.4s 0s';
            sheetContents.style.bottom = `-${this.height}vh`;
        }

        // end sheet animation
        setTimeout(() => {
            // remove sheet
            let sheetElement = document.getElementById(this.sheetId);
            if(sheetElement !== null) sheetElement.remove();

            // end sheet close
            this.sheetManager.endClose(this.sheetId);
        }, 0.4 * 1000);
    }
}
