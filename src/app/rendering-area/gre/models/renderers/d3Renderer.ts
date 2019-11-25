import { IRenderer } from "../../iRenderer";
import { Graph } from "../dataObjects/graph";
//import * as d3 from "d3";

export class D3Renderer implements IRenderer {
    
    //svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;

    constructor(divElement: HTMLDivElement, svgWidth: number, svgHeight: number, darkThemeInit: boolean) {
        
        // d3.select(divElement).selectAll("svg").remove();

        // this.svg = d3.select(divElement).append("svg");
        // this.svg.attr("id", "main-svg");
        // this.svg.attr("width", svgWidth);
        // this.svg.attr("height", svgHeight);
    }

    render(graph: Graph) {
        //graph.renderSVG(this.svg);
        throw new Error("Method not implemented.");
    }

    update(): void {
        throw new Error("Method not implemented.");
    }

    clear(darkTheme: boolean) {
        throw new Error("Method not implemented.");
    }

    resize(width: number, heigth: number): void {
        throw new Error("Method not implemented.");
    }
}