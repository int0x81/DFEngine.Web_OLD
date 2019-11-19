export class Dimension {

    public x: number = 0;
    public y: number = 0;
    public maxWidth: number = 0;
    public maxHeight: number = 0;
    public currentHeight: number = 0;

    constructor() { } 

    reset(): void {
        this.x = 0;
        this.y = 0;
        this.maxHeight = 0;
        this.maxHeight = 0;
        this.currentHeight = 0;
    }
}