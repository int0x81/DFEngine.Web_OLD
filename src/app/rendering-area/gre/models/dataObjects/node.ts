import { DimensionGrid } from "./dimensionGrid";
import { Constants } from "../../helpers/constants";
import { PixiNode } from "../graphicalObjects/PixiObjects/pixiNode";
import { D3Node } from "../graphicalObjects/D3Objects/d3Node";
import { Globals } from '../../helpers/globals';

export class NodeObj extends DimensionGrid {

    //private d3Object: D3Node | null = null;
    private pixiObject: PixiNode | null = null;

    public id: string = "";
    public name: string = "";
    public nodeClass: string = "";
    public childNodes: Array<NodeObj> = new Array<NodeObj>();
    public appearances: Array<string> = new Array<string>();

    constructor(zIndex: number) {

        super();

        this.z_index = zIndex;
    }

    initializeByJson(rawJson: any) {

        this.id = rawJson["id"];
        this.name = rawJson["name"];
        this.nodeClass = rawJson["nodeClass"];
        this.appearances = rawJson["appearances"];
        let dimFactor: number = parseFloat(rawJson["dimensionFactor"]);
        this.dimensionIndex = this.determineDimension(dimFactor);
        let rawChildren = rawJson["childNodes"];
        
        for (let childHash in rawChildren) {
          let newChild = new NodeObj(this.z_index + 1)
          newChild.initializeByJson(rawChildren[childHash]);
          this.childNodes.push(newChild);
        }
    }

    computeLayout() {

        if (this.childNodes.length == 0) {
            this.width = Constants.FINAL_OBJECT_WIDTH;
            this.height = Constants.FINAL_OBJECT_HEIGHT;
            this.dimensions[0].maxWidth = this.width;
            this.dimensions[0].maxHeight = this.height;
        } else {
      
            for (let child of this.childNodes) {       //Compute attributes for child objects
      
              let dimension = this.dimensions[child.dimensionIndex];
      
              child.computeLayout();
      
              if (child.width > dimension.maxWidth) {
                dimension.maxWidth = child.width + 2 * this.computePadding();
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
      
              if (dim.maxHeight + this.computeHeaderSpace() > this.height || this.height == 0)
                this.height = dim.maxHeight + this.computePadding() + this.computeHeaderSpace();               //The height of this object is the height of its highest dimension
            }
      
            this.width += (actualUsedDimensions - 1) * this.computeDimensionGap();                             //The width of this object is the width of all used dimension + gaps
        } 
    }

    setPosition(rootX: number, rootY: number) {

        this.x = rootX;
        this.y = rootY;
    
        let tmpLength: number = this.computePadding();
    
        for (let c = 0; c < Constants.AMOUNT_DIMENSIONS; c++) {
    
          if (this.dimensions[c].maxWidth == 0) {
            continue;
          }
    
          this.dimensions[c].x = rootX + tmpLength;
          this.dimensions[c].y = rootY + this.computePadding() + this.computeHeaderSpace();
          tmpLength += this.dimensions[c].maxWidth + this.computeDimensionGap();
        }
    
        for (let child of this.childNodes) {
    
            let dimension = this.dimensions[child.dimensionIndex];

            child.setPosition(dimension.x, dimension.y + dimension.currentHeight);
            //child.setPosition(dimension.x, dimension.y + Globals.current_graph_height);
            dimension.currentHeight += child.height + this.computePadding();
            //Globals.current_graph_height += child.height + this.computePadding();
        }
    }

    // renderSVG(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
        
    //     this.d3Object = new D3Node();

    //     this.d3Object.render(svg, this.name, this.computeHeaderSpace(), this.computePadding() ,this.x, this.y, this.width, this.height, this.z_index);

    //     for(let child of this.childNodes)
    //         child.renderSVG(svg);
    // }

    renderWebGL(container: PIXI.Container, darkTheme: boolean) {

        this.pixiObject = new PixiNode();

        this.pixiObject.render(container, this.name, this.computeHeaderSpace(), this.computePadding(), this.x, this.y, this.width, this.height, this.z_index, darkTheme);

        for(let child of this.childNodes)
            child.renderWebGL(container, darkTheme);
    }

    private computeHeaderSpace(): number {

      if (this.childNodes.length == 0) {
        return Math.ceil(Constants.ROOT_HEADER_FONTSIZE / 4);
      }
      return Math.ceil(Constants.ROOT_HEADER_FONTSIZE / (this.z_index + 1));
    }

    private getAllAppearances(): Array<string> {

      let allAppearances: Array<string> = new Array<string>();
      allAppearances = allAppearances.concat(this.appearances);

      for (let child of this.childNodes) {

        let childAppearances = child.getAllAppearances();

        for (let childAppearance of childAppearances) {

          let alrdyExists: boolean = false;
          for (let appearance of allAppearances) {

            if (childAppearance == appearance)
              alrdyExists = true;
          }

          if (!alrdyExists)
            allAppearances.push(childAppearance);
        }
      }

      return allAppearances;
    }
}