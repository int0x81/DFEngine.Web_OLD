import { Graph } from "./models/dataObjects/graph";

export interface IRenderer {

    /**
     * Renders a graph based on a theme
     */
    render(graph: Graph, darkTheme: boolean): void;

    /**
     * Renders the graph again without calculating all of its positioning 
     * properties again
     * @param graph The graph
     * @param darkTheme The theme
     */
    update(graph: Graph, darkTheme: boolean): void;

    /**
     * Replaces the current rendered object with a placeholder
     */
    clear(): void;

    /**
     * Resizes the renderer
     * @param width The new width
     * @param height The new heigth
     */
    resize(width: number, height:number): void;
}