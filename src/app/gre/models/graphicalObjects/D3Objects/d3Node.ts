import { PaintPot } from "../../../helpers/paintPot";
import { Constants } from "../../../helpers/constants";

export class D3Node {

    // render(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, header: string, fontSize: number,
    //     headerOffset: number, x: number, y: number, width: number, height: number, dimLayer: number) {

    //     svg.append("rect")
    //         //.attr("id", this.id)
    //         .attr("x", x)
    //         .attr("y", y)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .attr("width", width)
    //         .attr("height", height)
    //         .style("stroke", "black")
    //         .style("stroke-width", "1")
    //         .style("opacity", "1")
    //         .style("fill", this.computeColor(dimLayer));
        
    //     this.appendText(svg, header, fontSize, headerOffset, x, y, width, dimLayer);
    // }

    // private computeColor(dimLayer: number): string {

    //     let intensity: number = (255 / (dimLayer * 1) + 80);
    
    //     if (intensity > 255)
    //       intensity = 255;
    
    //     let red: number = intensity;
    //     let green: number = intensity;
    //     let blue: number = intensity;
    
    //     return PaintPot.toHexString(red, green, blue);
    // }

    // private appendText(svg: any, header: string, fontSize: number, headerOffset: number, x: number, y: number, width: number, dimLayer: number) {

    //     let yPosText: number;
    //     let displayText: string = header;
    
    //     if (width <= Constants.FINAL_OBJECT_WIDTH) {
    //       fontSize = Constants.FINAL_FONTSIZE;
    //       yPosText = y + fontSize + 1; //BAD SOLUTION
    //     } else {
    //       yPosText = y + fontSize - 3 / dimLayer;
    //       }
    
    //     let treshhold: number = (width * 1.8) / fontSize;
    
    //     if (header.length > treshhold)
    //       displayText = header.slice(0, treshhold - 3) + "...";
    //     else
    //       displayText = header;
          
    //     svg.append("text")
    //       .attr("x", x + headerOffset)
    //       .attr("y", yPosText)
    //       .style('font-family', '"Work Sans", sans-serif')
    //       .attr("font-size", fontSize + "px")
    //       .attr("fill", "black")
    //       .text(displayText);
    //   }
}