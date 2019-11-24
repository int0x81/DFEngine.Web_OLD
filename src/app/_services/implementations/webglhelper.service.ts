import { Injectable } from '@angular/core';

@Injectable()
export class WebGLHelperService {

    /**
     * Checks if the current browser supports WebGL
     */
    isWebGLSupported(): boolean {

        let canvas = document.createElement("canvas");

        let gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        return (gl && gl instanceof WebGLRenderingContext); 
    }
}