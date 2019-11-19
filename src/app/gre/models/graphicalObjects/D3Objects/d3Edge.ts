import { Constants } from "../../../helpers/constants";

export class D3Edge {

    // render(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, sourceX: number, sourceY: number,
    //      sourceWidth: number, sourceHeight: number, targetX: number, targetY: number, targetWidth: number) {

    //     let path: string = this.computePath(sourceX, sourceY, sourceWidth, sourceHeight, targetX, targetY, targetWidth);

    //     svg.append("path")
    //         //.attr("id", this.id)
    //         .attr("d", path)
    //         .style("stroke", "black")
    //         .style("fill", "none")
    //         .style("opacity", "0.1")
    //         .style("stroke-width", 2)
    // }
    
    // private computePath(sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number,
    //     targetX: number, targetY: number, targetWidth: number): string {

    //     if (sourceX + Constants.FINAL_OBJECT_WIDTH <= targetX) {
    
    //       let startX: number = sourceX + sourceWidth;
    //       let startY: number = sourceY;
    
    //       let centerX: number = ((targetX - startX) / 2) + startX;
    //       let centerY: number;
    
    //       if (sourceY >= targetY) {
    //         centerY = ((startY - targetY) / 2) + targetY;
    //       }
    //       else {
    //         centerY = ((targetY - startY) / 2) + startY;
    //       }
    
    //       let fixPointXDistance: number = (centerX - startX) / 2;
    //       let fixPointYDistance: number = targetY - centerY;
    
    //       let path: string =
    //         "M" + startX + " " + (startY + sourceHeight / 2) +
    //         " q " + fixPointXDistance + " 0 " + (centerX - startX) + " " + (centerY - startY) +
    //         " q " + ((targetX - centerX) / 2) + " " + fixPointYDistance + " " + (targetX - centerX) + " " + (targetY - centerY);
    
    //       return path;
    //     }
    //     else {
    
    //       let startX: number = sourceX + sourceWidth;
    //       let startY: number = sourceY;
    
    //       let bezierFactor: number = Math.abs(targetY - startY) / 100;
    
    //       let checkpoint_02_x = startX - ((startX - targetX) / 2);
    //       let checkpoint_02_y: number = targetY - (targetY - startY) / 2;
    
    //       let distance_to_controlpoint_01_x: number = bezierFactor * 2 + 5;
    //       let distance_to_controlpoint_01_y: number = 0;
    
    //       let distance_to_checkpoint_01_x: number = bezierFactor * 2 + 5;
    //       let distance_to_checkpoint_01_y: number = bezierFactor * 2 + 5;
    //       let checkpoint_01_x: number = startX + distance_to_checkpoint_01_x;
    //       let checkpoint_01_y: number = startY + distance_to_checkpoint_01_y;
    
    //       let distance_to_controlpoint_02_x = 0;
    //       let distance_to_controlpoint_02_y: number = bezierFactor * 40 + 30;
    //       let controlpoint_02_y: number = checkpoint_01_y + distance_to_controlpoint_02_y;
    
    //       let distance_to_checkpoint_02_x: number = -(checkpoint_01_x - checkpoint_02_x);
    //       let distance_to_checkpoint_02_y: number = checkpoint_02_y - checkpoint_01_y;
    
    //       let distance_to_controlpoint_03_x: number = distance_to_checkpoint_02_x;
    //       let distance_to_controlpoint_03_y: number = -(controlpoint_02_y - checkpoint_02_y);
    
    //       let distance_to_checkpoint_03_x: number = distance_to_checkpoint_02_x;
    //       let distance_to_checkpoint_03_y: number = distance_to_checkpoint_02_y;
    
    //       let distance_to_controlpoint_04_x = 0;
    //       let distance_to_controlpoint_04_y = distance_to_checkpoint_01_y;
    
    //       let distance_to_target_x = distance_to_checkpoint_01_x;
    //       let distance_to_target_y = distance_to_checkpoint_01_y;
    
    //       if (startY > targetY) {
    
    //         checkpoint_02_y = startY - ((startY - targetY) / 2);
    
    //         distance_to_checkpoint_01_y = - distance_to_checkpoint_01_y;
    //         checkpoint_01_y = startY + distance_to_checkpoint_01_y;
    
    //         distance_to_controlpoint_02_y = -distance_to_controlpoint_02_y;
    //         controlpoint_02_y = checkpoint_01_y + distance_to_controlpoint_02_y;
    
    //         distance_to_checkpoint_02_y = checkpoint_02_y - checkpoint_01_y;
    
    //         distance_to_controlpoint_03_y = checkpoint_02_y - controlpoint_02_y;
    
    //         distance_to_checkpoint_03_y = distance_to_checkpoint_02_y;
    
    //         distance_to_controlpoint_04_y = -distance_to_controlpoint_04_y;
    
    //         distance_to_target_y = -distance_to_target_y;
    //       }
    
    //       let path: string =
    //         "M" + startX + " " + (startY + sourceHeight / 2)
    //         + " q " + distance_to_controlpoint_01_x + " " + distance_to_controlpoint_01_y + " " + distance_to_checkpoint_01_x + " " + distance_to_checkpoint_01_y
    //         + " q " + distance_to_controlpoint_02_x + " " + distance_to_controlpoint_02_y + " " + distance_to_checkpoint_02_x + " " + distance_to_checkpoint_02_y
    //         + " q " + distance_to_controlpoint_03_x + " " + distance_to_controlpoint_03_y + " " + distance_to_checkpoint_03_x + " " + distance_to_checkpoint_03_y
    //         + " q " + distance_to_controlpoint_04_x + " " + distance_to_controlpoint_04_y + " " + distance_to_target_x + " " + distance_to_target_y;
    
    //       return path;
    //     }
    //   }
}