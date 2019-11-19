import { LandscapeServiceDefinition } from '../landscape.service.def';
import { Guid } from 'guid-typescript';
import { Landscape } from 'src/app/_models/landscape';
import { JsonPipe } from '@angular/common';

export class LandscapeMock implements LandscapeServiceDefinition {

    testGraph: any = {
        "multitrees": {
            "1553870500": {
                "id": "a4bd3559-3190-4b1a-a78e-b1ef8e0a85c7",
                "name": "std_server",
                "nodeClass": "sql server",
                "childNodes": {
                    "1625872464": {
                        "id": "6feecda9-e721-4d0f-a7e6-c328e8e4dabc",
                        "name": "std_db",
                        "nodeClass": "database",
                        "childNodes": {
                            "-958108073": {
                                "id": "43628c79-7af7-438f-9952-1f35058cff1f",
                                "name": "table_05",
                                "nodeClass": "table",
                                "childNodes": {},
                                "appearances": [],
                                "immutable": false,
                                "valid": true,
                                "dimensionFactor": 0.0
                            }
                        },
                        "appearances": [],
                        "immutable": false,
                        "valid": true,
                        "dimensionFactor": 1.0
                    },
                    "-1581727273": {
                        "id": "ee0d2259-617e-433a-becb-f326afded53d",
                        "name": "database_01",
                        "nodeClass": "database",
                        "childNodes": {
                            "1383704147": {
                                "id": "3b915b16-f7ca-445a-9716-263761d092d1",
                                "name": "table_01",
                                "nodeClass": "table",
                                "childNodes": {},
                                "appearances": [],
                                "immutable": false,
                                "valid": true,
                                "dimensionFactor": 0.0
                            }
                        },
                        "appearances": [],
                        "immutable": false,
                        "valid": true,
                        "dimensionFactor": 0.0
                    }
                },
                "appearances": [],
                "immutable": false,
                "valid": true,
                "dimensionFactor": 0.0
            }
        },
        "adjacencyList": {
            
                "3b915b16-f7ca-445a-9716-263761d092d1": {
                    "edges": {
                        "43628c79-7af7-438f-9952-1f35058cff1f": {
                            "sourceId": "3b915b16-f7ca-445a-9716-263761d092d1",
                            "targetId": "43628c79-7af7-438f-9952-1f35058cff1f",
                            "labels": [
                                "etl_script_01.sql"
                            ]
                        }
                    }
                }
            
        },
        "reversedAdjacencyList": {
            "groups": {
                "43628c79-7af7-438f-9952-1f35058cff1f": {
                    "edges": {
                        "3b915b16-f7ca-445a-9716-263761d092d1": {
                            "sourceId": "3b915b16-f7ca-445a-9716-263761d092d1",
                            "targetId": "43628c79-7af7-438f-9952-1f35058cff1f",
                            "labels": [
                                "etl_script_01.sql"
                            ]
                        }
                    }
                }
            }
        }
    }

    landscape: Landscape = {
        unixtimestamp: new Date().getSeconds(),
        graph: this.testGraph,
        errors: new Array<string>(),
        warnings: new Array<string>()
    }
    
    getLandscape(trackingProcessIds: Guid[]): Promise<Landscape> {
        
        return new Promise<Landscape>((resolve) => {
            setTimeout(() => {
                resolve(this.landscape);
            }, Math.random() * 3000);
        });
    }

}