import { Dimension } from "./dimension";
import { Constants } from "../../helpers/constants";

export abstract class DimensionGrid {

    public width: number = 0;
    public height: number = 0;
    public dimensionIndex: number = 0;
    public x: number = 0;
    public y: number = 0;
  
    protected z_index: number = 0;
    protected dimensions: Array<Dimension>;
    
    constructor() {
  
      this.dimensions = Array<Dimension>(Constants.AMOUNT_DIMENSIONS);
  
      for (let c = 0; c < Constants.AMOUNT_DIMENSIONS; c++) {
        this.dimensions[c] = new Dimension();
      }
    }

    /**
   * Determines the dimension index based on the factor every object contains.
   * The index can be used to get the dimension in which the object belongs.
   * Every object contains dimensions in which all the child objects are placed in
   * depending on the ratio of beeing targeted/ beeing used as source.
   * @param factor A float value from 0 to 1. 0 means that this object is only used as source inside the parents object.
   * 1 means it it targeted only
   */
    protected determineDimension(factor: number): number {
  
      if (factor < Constants.DIMENSION_01_UPPER_LIMIT)
        return 0;
      if (factor < Constants.DIMENSION_02_UPPER_LIMIT)
        return 1;
      if (factor <= Constants.DIMENSION_03_UPPER_LIMIT)
        return 2;
  
      throw new Error("Unable to determine dimension for data object with dimensionfactor of " + factor);
    }
  
    /**
     * Computes the padding of an object based on its recursion depth.
     * The recursion depth basicly says how many parents an object has
     * */
    protected computePadding(): number {
      return Math.ceil(Constants.FINAL_PADDING / (this.z_index + 1));
    }
  
    /**
     * Computes the gap between two dimensions of an object based on its recursion depth.
     * The recursion depth basicly says how many parents an object has
     * */
    protected computeDimensionGap(): number {
      return Math.ceil(Constants.DIMENSION_ROOT_GAP / (this.z_index + 1));
    }

    public reset(): void {
      this.width = 0;
      this.height = 0;
      this.dimensionIndex = 0;
      this.x = 0;
      this.y = 0;
  
      for(let dim of this.dimensions) {
        dim.reset()
      }
    }
}