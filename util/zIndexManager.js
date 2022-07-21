'use strict';

export class zIndexManager {
    static _instance = null;
    constructor() {
        const handler = document.querySelector('.rootPage').id;

        if (zIndexManager._instance) {
            if(zIndexManager._instance.handler !== handler) zIndexManager._instance.init(handler);
            return zIndexManager._instance;
        }

        this.init(handler);
        zIndexManager._instance = this;
    }

    handler = null;
    zIndex = 1000;

    init(handler) {
        this.handler = handler;
        this.zIndex = 1000;
    }

    getZIndex() { return this.zIndex; }

    setZIndex(num) { this.zIndex += num }
}

