import { NodeObj } from "./node";
import { AdjacencyList } from "./adjacencyList";
import { DimensionGrid } from "./dimensionGrid";
import { Constants } from "../../helpers/constants";
import { Globals } from '../../helpers/globals';

export class Graph extends DimensionGrid {

    private nodes: Array<NodeObj> = new Array<NodeObj>();
    private adjacencyList: AdjacencyList = new AdjacencyList(false);
    //private reversedAdjacencyList: AdjacencyList = new AdjacencyList(true);

    constructor() {

        super(); 
    }

    private computeLayout() {

        for (let child of this.nodes) {

            let dimension = this.dimensions[child.dimensionIndex];
      
            child.computeLayout();
      
            if (child.width > dimension.maxWidth) {
              dimension.maxWidth = child.width + 2 * Constants.DIMENSION_ROOT_GAP;
            }
            dimension.maxHeight += child.height + this.computePadding();
        }
      
        let actualUsedDimensions: number = Constants.AMOUNT_DIMENSIONS;
      
        for (let dim of this.dimensions) {
      
            if (dim.maxWidth == 0) {
                actualUsedDimensions--;
                continue;
            }
      
            this.width += dim.maxWidth;
      
            if (dim.maxHeight > this.height || this.height == 0)
              this.height = dim.maxHeight + this.computePadding();             //The height of this object is the height of its highest dimension
        }
          
          if (actualUsedDimensions > 0)
            this.width += (actualUsedDimensions - 1) * this.computeDimensionGap(); //The width of this object is the width of all used dimension + gaps
          else
            this.width = 0;
    }

    private computePosition() {

        let tmpLength: number = this.computePadding();

        for (let c = 0; c < Constants.AMOUNT_DIMENSIONS; c++) {

            if (this.dimensions[c].maxWidth == 0) {
                continue;
            }

            this.dimensions[c].x = this.x + tmpLength;
            this.dimensions[c].y = this.y + this.computePadding();
            tmpLength += this.dimensions[c].maxWidth + this.computeDimensionGap();
        }

        for (let child of this.nodes) {

            let dimension = this.dimensions[child.dimensionIndex];


            let randomPadding: number = Math.random() * 50;

            if(child.dimensionIndex == 0)
              randomPadding = 0;

            child.setPosition(dimension.x, dimension.y + dimension.currentHeight + randomPadding);
            //child.setPosition(dimension.x, dimension.y + Globals.current_graph_height);
            dimension.currentHeight += child.height + this.computePadding() + randomPadding;
            //Globals.current_graph_height += child.height + this.computePadding();
        }
    }

    initialize(rawJson: any) {
        
        this.nodes = new Array<NodeObj>();
        this.adjacencyList = new AdjacencyList(false);
        //this.reversedAdjacencyList = new AdjacencyList(true);

        let rawNodes = rawJson["multitrees"];
        let rawAdjacencyList = rawJson["adjacencyList"];
        let rawReversedAdjacencyList = rawJson["reversedAdjacencyList"];

        if(rawNodes == undefined)
           throw new Error("Json does not contain entry for 'multitrees'");
        if(rawAdjacencyList == undefined)
           throw new Error("Json does not contain entry for 'adjacencyList'");

        for (let entry in rawNodes) {

            let newNode = new NodeObj(this.z_index + 1);
            newNode.initializeByJson(rawNodes[entry]);
            this.nodes.push(newNode);
        }

        this.adjacencyList.initializeByJson(rawAdjacencyList, this.nodes);
        //this.reversedAdjacencyList.initializeByJson(rawReversedAdjacencyList, this.nodes);
    }

    // renderSVG(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
        
    //     for(let node of this.nodes)
    //         node.renderSVG(svg);
        
    //     this.adjacencyList.renderSVG(svg);
    // }

    renderWebGL(container: PIXI.Container, darkTheme: boolean) {

        this.reset();
        this.computeLayout();
        this.computePosition();

        for(let node of this.nodes) 
            node.renderWebGL(container, darkTheme);

        this.adjacencyList.renderWebGL(container, darkTheme);
    }

    updateWebGL(container: PIXI.Container, darkTheme: boolean) { 

        for(let node of this.nodes)
            node.renderWebGL(container, darkTheme);
        this.adjacencyList.renderWebGL(container, darkTheme);
    }
}
