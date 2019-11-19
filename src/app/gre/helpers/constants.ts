export class Constants {

  public static readonly AMOUNT_DIMENSIONS: number = 3;

  public static readonly DIMENSION_01_UPPER_LIMIT: number = 0.1;
  public static readonly DIMENSION_02_UPPER_LIMIT: number = 0.99;
  public static readonly DIMENSION_03_UPPER_LIMIT: number = 1;

  public static readonly DIMENSION_ROOT_GAP: number = 100; //The horizontal gap between two dimensions at layer 0
  
  public static readonly ROOT_HEADER_FONTSIZE = 60;

  public static readonly FINAL_OBJECT_WIDTH: number = 300;
  public static readonly FINAL_OBJECT_HEIGHT: number = 24;
  public static readonly FINAL_PADDING: number = 20; //The vertical gap between two final objects
  public static readonly FINAL_FONTSIZE: number = Constants.FINAL_OBJECT_HEIGHT * 0.6;
}