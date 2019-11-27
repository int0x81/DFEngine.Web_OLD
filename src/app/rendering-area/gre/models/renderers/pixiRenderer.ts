import { IRenderer } from "../../iRenderer";
import { Graph } from "../dataObjects/graph";
import * as PIXI from "pixi.js";
import { Viewport } from 'pixi-viewport'

export class PixiRenderer implements IRenderer {

    private renderer: PIXI.Renderer;

    private ticker: PIXI.Ticker = new PIXI.Ticker();

    private viewport: Viewport;

    constructor(divElement: HTMLDivElement) {

        PIXI.utils.skipHello(); //prevents the standart PIXI console output

        this.renderer = new PIXI.Renderer({width: divElement.clientWidth, height: divElement.clientHeight - 6, 
        transparent: true, resolution: window.devicePixelRatio, autoDensity: true, antialias: true});
        
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
        .wheel({
            percent: 0.1,
            smooth: 5,
        });
        
        divElement.appendChild(this.renderer.view);
    }

    render(graph: Graph, darkTheme: boolean): void {

        this.clear();
        let graphContainer = new PIXI.Container();
 
        graph.renderWebGL(graphContainer, darkTheme);

        this.viewport.addChild(graphContainer);

        this.ticker.stop();
        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => this.renderer.render(this.viewport));
        this.ticker.start();
    }

    update(graph: Graph, darkTheme: boolean): void {

        this.clear();
        let graphContainer = new PIXI.Container();
        
        graph.updateWebGL(graphContainer, darkTheme);
        
        this.viewport.addChild(graphContainer);

        this.ticker.stop();
        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => this.renderer.render(this.viewport));
        this.ticker.start();
    }

    clear(): void {

        this.renderer.clear();
        this.viewport.removeChildren();
        this.ticker.stop();
        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => this.renderer.render(this.viewport));
        this.ticker.start();
    }

    resize(width: number, height: number): void {

        this.renderer.resize(width, height);
    }
}