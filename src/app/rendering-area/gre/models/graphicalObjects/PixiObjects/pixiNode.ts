import { PaintPot } from "../../../helpers/paintPot";
import { Constants } from "../../../helpers/constants";
import * as PIXI from "pixi.js";
import { DropShadowFilter } from "@pixi/filter-drop-shadow"

export class PixiNode {

    render(container: PIXI.Container, header: string, headerSize: number, headerOffset: number,
         x: number, y: number, width: number, height: number, z_index: number, darkTheme: boolean) {

        let rect = new PIXI.Graphics();

        let color: number = this.computeColor(z_index, darkTheme);
        let borderRadius: number = this.computeBorderRadius(z_index);
      
        rect.lineStyle(1, 0x000000, 1);
        rect.beginFill(color, 1);
        rect.drawRoundedRect(x , y, width, height, borderRadius)
        rect.endFill();

        if(z_index == 1) {
            rect.filters = [ new DropShadowFilter() ];
        }

        container.addChild(rect);

        this.appendText(container, header, headerSize, headerOffset, x, y, width);
    }

    private appendText(container: PIXI.Container, header: string, headerSize: number, headerOffset: number, x: number, y: number, width: number) {
  
        let fontSize: number;
        let yPosText: number;
        let displayText: string = header;
  
        if (width <= Constants.FINAL_OBJECT_WIDTH) {
          fontSize = Constants.FINAL_FONTSIZE;
          yPosText = y + 1;
        } else {
          fontSize = headerSize;
          yPosText = y;
        }
  
        let treshhold: number = (width * 1.8) / fontSize;
  
        if (header.length > treshhold)
          displayText = header.slice(0, treshhold - 3) + "...";
        else
          displayText = header;
        
        let textStyle = new PIXI.TextStyle({
          fontSize: fontSize,
          fontWeight: "bold",
          fill: ["#000000"]
        });
        
        let text = new PIXI.Text(displayText, textStyle);
        text.x = x + headerOffset;
        text.y = yPosText;
  
        container.addChild(text);
    }

    private computeColor(z_index: number, darkTheme: boolean): number {

      let intensity: number;

      if(darkTheme)
        intensity = 255 - (200 - (60 * z_index));
      else
        intensity = (255 / (z_index * 1) + 80);
      
      if (intensity > 255)
        intensity = 255;
    
      let red: number = intensity;
      let green: number = intensity;
      let blue: number = intensity;
    
      return PaintPot.toHex(red, green, blue);
    }

    private computeBorderRadius(z_index: number): number {
      return 4 + Math.max((10 / z_index));
    }
}