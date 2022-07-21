'use strict';

import {zIndexManager} from "../zindex-maximumvalue-manager/zIndexManager.js";

export class BottomSheetManager {
    static _instance = null;
    constructor() {
        const handler = document.querySelector('.rootPage').id;

        if (BottomSheetManager._instance) {
            if(BottomSheetManager._instance.handler !== handler) BottomSheetManager._instance.init(handler);
            return BottomSheetManager._instance;
        }

        this.init(handler);
        BottomSheetManager._instance = this;
    }

    zIndexManager = null;
    handler = null;
    sheetCount = 0;
    openedStatus = {};
    openingStatus = {};
    closingStatus = {};

    bottomSheet = [];

    init(handler) {
        this.zIndexManager = new zIndexManager();
        this.handler = handler;
        this.sheetCount = 0;
        this.bottomSheet = [];
        this.openedStatus = {};
        this.openingStatus = {};
        this.closingStatus = {};
    }

    getZIndex() {
        return this.zIndexManager.getZIndex();
    }

    startOpen(sheetObject) {
        this.openingStatus[sheetObject.sheetId] = true;
        this.sheetCount++;
        this.zIndexManager.setZIndex(2);

        // sheet
        sheetObject.mousedown = false;
        sheetObject.mouseup = false;
        this.bottomSheet.push(sheetObject);
    }

    endOpen(sheetId) {
        this.openingStatus[sheetId] = false;
        this.openedStatus[sheetId] = true;

        // save sheet element
        this.getBottomSheet().bottomSheetElement = document.getElementById(`frontleBottomSheetContents_${sheetId}`);
    }

    startClose(sheetId) {
        this.closingStatus[sheetId] = true;
    }

    endClose(sheetId) {
        this.closingStatus[sheetId] = false;
        this.openedStatus[sheetId] = false;

        if(this.sheetCount > 0) this.sheetCount--;

        // delete sheet
        this.bottomSheet.pop();
    }

    checkOpenedStatus(sheetId) {
        return this.openedStatus[sheetId];
    }

    checkAnimationStatus(sheetId) {
        // animation is running
        if(this.openingStatus[sheetId] || this.closingStatus[sheetId]) return true;
        // animation is not running
        else return false;
    }

    getBottomSheet() {
        let length = this.bottomSheet.length - 1;
        if(length < 0) return;
        return this.bottomSheet[length];
    }

    eventMouseDown() {
        let sheetObject = this.getBottomSheet();
        if(sheetObject === undefined || sheetObject === null) return;

        // animation is running
        if(this.checkAnimationStatus(sheetObject.sheetId)) return;

        sheetObject.mousedown = true;
    }

    eventMouseUp(e) {
        let sheetObject = this.getBottomSheet();
        if(sheetObject === undefined || sheetObject === null) return;

        // animation is running
        if(this.checkAnimationStatus(sheetObject.sheetId)) return;

        // mouse 눌려 있었던 경우
        if(sheetObject.mousedown){
            sheetObject.mousedown = false;
            sheetObject.mouseup = true;

            // 위치 파악하기
            let mouseY = window.innerHeight - e.clientY;
            if(mouseY < 0) mouseY = 0;
            if(mouseY > window.innerHeight) mouseY = window.innerHeight;
            let moveY = ((mouseY / window.innerHeight) * 100) - Number(sheetObject.height);
            if(moveY >= 0) moveY = 0;

            // 최대 높이로
            if(Number(moveY) >= Number(sheetObject.startY)){
                moveY = 0;

                // start animation
                this.openingStatus[sheetObject.sheetId] = true;
                sheetObject.bottomSheetElement.style.transition = 'bottom ease 0.4s 0s';
                sheetObject.bottomSheetElement.style.bottom = `${moveY}vh`;

                // end animation
                setTimeout(() => {
                    sheetObject.bottomSheetElement.style.removeProperty('transition');
                    this.openingStatus[sheetObject.sheetId] = false;
                }, 400);
            }
            // close bottom sheet
            else sheetObject.close();
        }
    }

    eventMouseMove(e) {
        let sheetObject = this.getBottomSheet();
        if(sheetObject === undefined || sheetObject === null) return;

        // animation is running
        if(this.checkAnimationStatus(sheetObject.sheetId)) return;

        // mouse up 될때까지
        if(sheetObject.mousedown){
            let mouseY = window.innerHeight - e.clientY;
            if(mouseY < 0 || mouseY > window.innerHeight) return;

            let moveY = ((mouseY / window.innerHeight) * 100) - Number(sheetObject.height);
            if(moveY >= 0) moveY = 0;
            sheetObject.bottomSheetElement.style.bottom = `${moveY}vh`;
        }
    }
}

