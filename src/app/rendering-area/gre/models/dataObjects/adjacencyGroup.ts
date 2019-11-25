import { Edge } from "./edge";
import { NodeObj } from "./node";
import { Algorithms } from "../../helpers/algorithms";
import { Container } from "pixi.js";
import { IRenderer } from "../../iRenderer";

export class AdjacencyGroup {

    private edges = new Map<string, Edge>();

    constructor(private reversed: boolean) { }

    initializeByJson(rawJson: any, multitrees: Array<NodeObj>, firstLayerObj: NodeObj) {

        let rawEdges;

        rawEdges = rawJson["edges"];

        for (let rawEdge of rawEdges) {

            let labels = rawEdge["labels"];
            let processType = rawEdge["processType"];

            let secondNodeId = rawEdge["secondNodeId"];
            let secondLayerObj: NodeObj | null = Algorithms.GetObjectById(secondNodeId, multitrees);

            if(secondLayerObj == null)
                    throw new Error("Unable to find node by id");

            if (!this.reversed)
                this.edges.set(secondNodeId, new Edge(firstLayerObj, secondLayerObj, processType, labels));
            else 
                this.edges.set(secondNodeId, new Edge(secondLayerObj, firstLayerObj, processType, labels));
            
        }
    }

    // renderSVG(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
    //     for(let edge of this.edges)
    //        edge[1].renderSVG(svg);  //[0] == key, [1] == value
    // }

    renderWebGL(container: Container, darkTheme: boolean) {
        for(let edge of this.edges)
           edge[1].renderWebGL(container, darkTheme);  //[0] == key, [1] == value
    }
}