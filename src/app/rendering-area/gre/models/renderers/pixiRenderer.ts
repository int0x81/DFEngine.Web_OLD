import { IRenderer } from "../../iRenderer";
import { Graph } from "../dataObjects/graph";
import * as PIXI from "pixi.js";
import { Viewport } from 'pixi-viewport';

export class PixiRenderer implements IRenderer {

    private application: PIXI.Application;

    private viewport: Viewport;

    constructor(divElement: HTMLDivElement) {

        this.application = new PIXI.Application({
            width: divElement.clientWidth, 
            height: divElement.clientHeight - 6,
            transparent: true, 
            resolution: window.devicePixelRatio, 
            autoDensity: true,
            antialias: true
        });

        PIXI.utils.skipHello(); //prevents the standart PIXI console output
        
        divElement.appendChild(this.application.view);
        window.addEventListener('resize', () => {

            let renderingBox = document.getElementById('renderingBox') as HTMLDivElement;
            let newWidth: number = renderingBox.clientWidth;
            let newHeight: number = renderingBox.clientHeight - 6;
            this.application.renderer.resize(newWidth, newHeight);
        });

        this.viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight, 
            worldWidth: divElement.clientWidth, 
            worldHeight: divElement.clientHeight - 6,
            divWheel: divElement,
            interaction: this.application.renderer.plugins.interaction
        });

        this.viewport
        .drag({
            wheel: false
        })
        .wheel({
            percent: 0.1,
            smooth: 5,
        }); 
    }

    render(graph: Graph, darkTheme: boolean): void {

        this.clear();
        let graphContainer = new PIXI.Container();
 
        graph.renderWebGL(graphContainer, darkTheme);

        this.viewport.addChild(graphContainer);
        this.application.stage.addChild(this.viewport);
    }

    update(graph: Graph, darkTheme: boolean): void {

        this.clear();
        let graphContainer = new PIXI.Container();
        
        graph.updateWebGL(graphContainer, darkTheme);
        
        this.viewport.addChild(graphContainer);
        this.application.stage.addChild(this.viewport);
    }

    clear(): void {

        //this.application.stage.removeChildren();
        this.viewport.removeChildren();
    }

    resize(width: number, height: number): void {

        this.application.renderer.resize(width, height);
    }
}