import { NodeObj } from "./node";
import { PixiEdge } from "../graphicalObjects/PixiObjects/pixiEdge";
import { D3Edge } from "../graphicalObjects/D3Objects/d3Edge";

export class Edge {

    private id: string;
    private highlighted: boolean = false;
    private labels: Array<string> = new Array<string>();

    //private d3Object: D3Edge | null = null;
    private pixiObject: PixiEdge | null = null;

    constructor(public source: NodeObj, public target: NodeObj, private processType: string, private rawLabels: any) {

        this.id = "g" + source.id.substring(2, 5) + target.id.substring(2, 5);
        for (let label of rawLabels) {
            this.labels.push(label);
        }
    }

    // renderSVG(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
        
    //     this.d3Object = new D3Edge();
    //     this.d3Object.render(svg, this.source.x, this.source.y, this.source.width, this.source.height, 
    //         this.target.x, this.target.y, this.target.height);
    // }

    renderWebGL(container: PIXI.Container, darkTheme: boolean) {
        this.pixiObject = new PixiEdge();
        this.pixiObject.render(container, this.source.x, this.source.y, this.source.width, this.source.height, 
            this.target.x, this.target.y, this.target.height, darkTheme);
    }
}