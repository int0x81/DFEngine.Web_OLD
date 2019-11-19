import { TechnologyServiceDefinition } from '../technology.service.def';
import { Technology } from 'src/app/_models/technology';
import { TrackingOptionField } from 'src/app/_models/trackingoptionfield';

import * as localForage from 'localforage';

export class TechnologyMock implements TechnologyServiceDefinition {

    readonly db: LocalForage;

    technology_01: Technology = {
        
        id: "46724058",
        name: "TSQL",
        status: 1,
        description: "The SQL superset that interacts with Microsoft SQL Server"
    }

    technology_02: Technology = {
        
        id: "99456683",
        name: "SQL",
        status: 3,
        description: "The standart Structured Query Language"
    }

    optionField_01: TrackingOptionField = {
        id: "34457680",
        name: "Server Name",
        type: "textbox",
        description: "The MS SQL Server on which the scripts are executed against"
    }

    optionField_02: TrackingOptionField = {
        id: "34557680",
        name: "Database Name",
        type: "textbox",
        description: "The database on which the scripts are executed against"
    }

    constructor() {
        
        this.db = localForage.createInstance({
            name: "TechnologiesMock"
        });
    }
    
    loadTechnologies(): Promise<void> {
       
        return new Promise<void>((resolve) => setTimeout(async () => {
            await this.db.setItem<Technology>(this.technology_01.id, this.technology_01);
            await this.db.setItem<Technology>(this.technology_02.id, this.technology_02);
            resolve();
        }, Math.random() * 2000));
    }    
    
    getTechnologies(): Promise<Technology[]> {
       
        return new Promise<Technology[]>((resolve) => {

            let allTechnologies = new Array<Technology>();

            this.db.iterate<Technology, any>((value) => {
                allTechnologies.push(value);
            }).then(() => {
                resolve(allTechnologies);
            });  
        });
    }

    getOptionFields(technologyId: string): Promise<TrackingOptionField[]> {

        let optionFields: TrackingOptionField[];

        if(technologyId == this.technology_01.id) {
            
            optionFields = [
                this.optionField_01,
                this.optionField_02
            ];
        } else
            optionFields = new Array<TrackingOptionField>();
        

        return new Promise<TrackingOptionField[]>((resolve) => {
            setTimeout(() => {
                resolve(optionFields);
            }, Math.random() * 2000);
        });
    }
}