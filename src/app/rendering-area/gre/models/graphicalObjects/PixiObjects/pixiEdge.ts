import { Graphics } from "pixi.js";
import { Constants } from "../../../helpers/constants";

export class PixiEdge {

    render(container: PIXI.Container, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number,
        targetX: number, targetY: number, targetHeight: number, darkTheme: boolean): void {

        let path = this.drawPath(sourceX, sourceY, sourceWidth, sourceHeight, targetX, targetY, targetHeight, darkTheme);

        container.addChild(path);
    }

    private drawPath(sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number,
         targetX: number, targetY: number, targetHeight: number, darkTheme: boolean): Graphics {
           
        let path = new Graphics();

        if(darkTheme)
            path.lineStyle(2, 0xFFFFFF, 0.6);
        else
            path.lineStyle(2, 0x000000, 0.15);

        if(sourceX + Constants.FINAL_OBJECT_WIDTH <= targetX) {

            let startX: number = sourceX + sourceWidth;
            let startY: number = sourceY + sourceHeight / 2;
            let endX: number = targetX;
            let endY: number = targetY + targetHeight / 2;

            let centerX: number = startX + ((endX - startX) / 2);
            let centerY: number;

            path.moveTo(startX, startY);

            if(startY == endY) {
                path.lineTo(endX, endY);
                return path;
            }
            else if (startY > endY) {
                centerY = ((startY - endY) / 2) + endY;
            }
            else {
                centerY = ((endY - startY) / 2) + startY;
            }

            let controlpoint_01X: number = startX + ((centerX - startX) / 2);
            let controlpoint_01Y: number = startY;
            let controlpoint_02X: number = centerX + ((endX - centerX) / 2);
            let controlpoint_02Y: number = endY;

            path.quadraticCurveTo(controlpoint_01X, controlpoint_01Y, centerX, centerY);
            path.quadraticCurveTo(controlpoint_02X, controlpoint_02Y, endX, endY);
            path.quadraticCurveTo(controlpoint_02X, controlpoint_02Y, centerX, centerY);
            path.quadraticCurveTo(controlpoint_01X, controlpoint_01Y, startX, startY);

            return path;

        } else {
            
            let startX: number = sourceX + sourceWidth;
            let startY: number = sourceY + sourceHeight / 2;;
            let endX: number = targetX;
            let endY: number = targetY + targetHeight / 2;

            let bezierFactor: number = Math.abs(endY - startY) / 10;

            let controlpoint_01_x: number = startX + bezierFactor * 5 + 5;
            let controlpoint_01_y: number = startY;

            let controlpoint_02_x: number = startX + bezierFactor * 5 + 5;
            let controlpoint_02_y: number = startY + ((startY + bezierFactor * 5 + 5) - startY) * 2;

            let center_x: number = startX - (startX - endX) / 2;
            let center_y: number = endY - (endY - startY) / 2;

            let controlpoint_03_x: number = endX - (bezierFactor * 5 + 5);
            let controlpoint_03_y: number = endY - (endY + (bezierFactor * 5 + 5) - endY) * 2;

            let controlpoint_04_x: number = endX - (bezierFactor * 5 + 5);
            let controlpoint_04_y: number = endY;
            
            path.moveTo(startX, startY);
            path.bezierCurveTo(controlpoint_01_x, controlpoint_01_y, controlpoint_02_x, controlpoint_02_y, center_x, center_y);
            path.bezierCurveTo(controlpoint_03_x, controlpoint_03_y, controlpoint_04_x, controlpoint_04_y, endX, endY);
            path.bezierCurveTo(controlpoint_04_x, controlpoint_04_y, controlpoint_03_x, controlpoint_03_y, center_x, center_y);
            path.bezierCurveTo(controlpoint_02_x, controlpoint_02_y, controlpoint_01_x, controlpoint_01_y, startX, startY);

            path.endFill();

            return path;
        } 
    }

}