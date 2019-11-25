import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Graph } from "./models/dataObjects/graph";
import { RenderingTechnology } from "./renderingTechnology";
import { IRenderer } from "./iRenderer";
import { D3Renderer } from "./models/renderers/d3Renderer";
import { PixiRenderer } from "./models/renderers/pixiRenderer";
import { Subscription } from "rxjs";
import { DarkThemeService } from '../../_services/implementations/darktheme.service';
//import { LiveQueryServiceDefinition } from '../_services/livequery.service.def';
import { RenderingAreaService } from '../services/rendering-area.service';

@Component({ 
    selector: 'app-gre', 
    templateUrl: 'gre.component.html',
    styleUrls: []
})
export class GREComponent implements OnInit, AfterViewInit, OnDestroy {

    private renderer: IRenderer;
    private graph: Graph | null;

    private darkTheme: boolean;

    private darkThemeSubscription: Subscription;
    private newLandscapeSubscription: Subscription;
    private clearLandscapeSubscription: Subscription;

    constructor(private darkThemeService: DarkThemeService, private greService: RenderingAreaService) { }

    ngOnInit() {
        
        this.darkTheme = this.darkThemeService.getDarkThemeState();

        this.darkThemeSubscription = this.darkThemeService.darkThemeSubject.subscribe(() => {
            this.darkTheme = !this.darkTheme;
            this.update();
        });

        this.newLandscapeSubscription = this.greService.renderGraphSubject.subscribe((rawGraph) => {
            this.render(rawGraph);
        });

        this.clearLandscapeSubscription = this.greService.clearGRESubject.subscribe(() => this.clear());
    }

    ngAfterViewInit() {

        let renderingArea = document.getElementById('renderingBox') as HTMLDivElement;

        this.graph = new Graph();
        
        this.renderer = new PixiRenderer(renderingArea, this.darkTheme);
    }

    /**
     * Initializes a new graph by raw json and renders it
     * @param rawGraph The rawGraph formatted graph to render
     */
    render(rawGraph: any) {

        this.graph.initialize(rawGraph);
        this.renderer.render(this.graph, this.darkTheme);
    }

    /**
     * Clears the current graph that is beeing displayed
     */
    clear(): void {
        this.graph = new Graph();
        this.renderer.clear(this.darkTheme);
    }

    /**
     * Renders the graph again without calculating all of its positioning 
     * properties again
     */
    private update(): void {

        this.renderer.update(this.graph, this.darkTheme);
    }

    /**
     * Destroys this instance and unsubscribes it from all subscriptions
     */
    ngOnDestroy(): void {
        this.darkThemeSubscription.unsubscribe();
        this.newLandscapeSubscription.unsubscribe();
        this.clearLandscapeSubscription.unsubscribe();
    }
}