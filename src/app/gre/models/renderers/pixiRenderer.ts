import { IRenderer } from "../../iRenderer";
import { Graph } from "../dataObjects/graph";
import * as PIXI from "pixi.js";
import { Viewport } from 'pixi-viewport'

export class PixiRenderer implements IRenderer {

    private renderer: PIXI.Renderer;

    private ticker: PIXI.Ticker = new PIXI.Ticker();

    private viewport: Viewport;

    constructor(divElement: HTMLDivElement, darkThemeInit: boolean) {

        PIXI.utils.skipHello();
        
        let initialBackground: number;

        if(darkThemeInit)
          initialBackground = 0x121212;
        else
          initialBackground = 0xFFFFFF;

        this.renderer = new PIXI.Renderer({width: divElement.clientWidth, height: divElement.clientHeight - 6, 
        backgroundColor: initialBackground, resolution: window.devicePixelRatio, autoDensity: true, antialias: true});
        
        window.addEventListener('resize', () => {

            let newWidth: number = divElement.clientWidth;
            let newHeight: number = divElement.clientHeight - 6;
            
            this.resize(newWidth, newHeight);
        });

        this.viewport = new Viewport({
            divWheel: divElement,
            interaction: this.renderer.plugins.interaction
        });

        this.viewport
        .drag({
            wheel: false
        })
        .wheel({ //due to a bug, the zooming function is deactived. The bug triggered a zoom event, even if the pointer was outside the canvas
            percent: 0.1,
            smooth: 5,
        });

        this.clear(darkThemeInit);
        
        divElement.appendChild(this.renderer.view);
    }

    render(graph: Graph, darkTheme: boolean): void {

        this.clear(darkTheme);
        let graphContainer = new PIXI.Container();
 
        graph.renderWebGL(graphContainer, darkTheme);

        this.viewport.addChild(graphContainer);

        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => this.renderer.render(this.viewport));
        this.ticker.start();
    }

    update(graph: Graph, darkTheme: boolean): void {

        this.clear(darkTheme);
        let graphContainer = new PIXI.Container();
        
        graph.updateWebGL(graphContainer, darkTheme);
        
        this.viewport.addChild(graphContainer);

        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => this.renderer.render(this.viewport));
        this.ticker.start();
    }

    clear(darkTheme: boolean): void {

        this.ticker.stop();
        this.renderer.clear();
        this.viewport.removeChildren();

        if(darkTheme)
          this.renderer.backgroundColor = 0x121212;
        else
          this.renderer.backgroundColor = 0xFFFFFF;

        let placeholder: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        
        if(darkTheme)
            placeholder.tint = 0x121212;

        placeholder.width = this.renderer.width;
        placeholder.height = this.renderer.height;
        
        this.renderer.render(placeholder, undefined, true);
    }

    resize(width: number, height: number): void {

        this.renderer.resize(width, height);
    }
}