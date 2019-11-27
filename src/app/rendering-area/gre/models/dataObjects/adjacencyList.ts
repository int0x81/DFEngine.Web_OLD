import { AdjacencyGroup } from "./adjacencyGroup";
import { NodeObj } from "./node";
import { Algorithms } from "../../helpers/algorithms";

export class AdjacencyList {

    public groups = new Map<string, AdjacencyGroup>();

    constructor(private reversed: boolean) { }

    initializeByJson(rawJson: any, multitrees: Array<NodeObj>) {

        for (let entry of rawJson) {

            let firstNodeId: string;

            firstNodeId = entry["firstNodeId"];

            let firstLayerObj: NodeObj | null = Algorithms.GetObjectById(firstNodeId, multitrees);

            if(firstLayerObj == null)
                throw new Error("Unable to find node by id. id was: " + firstNodeId);

            let newGroup = new AdjacencyGroup(this.reversed);
            newGroup.initializeByJson(entry, multitrees, firstLayerObj);

            this.groups.set(firstNodeId, newGroup);
        }
    }

    // renderSVG(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
    //     for(let group of this.groups)
    //         group[1].renderSVG(svg); //[0] == key, [1] == value
    // }

    renderWebGL(container: PIXI.Container, darkTheme: boolean) {
        for(let group of this.groups)
            group[1].renderWebGL(container, darkTheme); //[0] == key, [1] == value
    }
}