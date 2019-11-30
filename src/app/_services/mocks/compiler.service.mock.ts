import { Landscape } from 'src/app/_models/landscape';
import { CompilerServiceDefinition } from '../compiler.service.def';
import { CompilerRequest } from 'src/app/_models/compilerRequest';

export class CompilerServiceMock implements CompilerServiceDefinition {

    private readonly TEST_GRAPH: any =
        {
            "multitrees":
                [
                    {
                        "id": "a4bd3559-3190-4b1a-a78e-b1ef8e0a85c7",
                        "name": "std_server",
                        "nodeClass": "sql server",
                        "childNodes":
                            [
                                {
                                    "id": "6feecda9-e721-4d0f-a7e6-c328e8e4dabc",
                                    "name": "std_db",
                                    "nodeClass": "database",
                                    "childNodes":
                                        [
                                            {
                                                "id": "43628c79-7af7-438f-9952-1f35058cff1f",
                                                "name": "table_05",
                                                "nodeClass": "table",
                                                "childNodes": {},
                                                "appearances": [],
                                                "dimensionFactor": 0.0
                                            }
                                        ],
                                    "appearances": [],
                                    "dimensionFactor": 1.0
                                },
                                {
                                    "id": "ee0d2259-617e-433a-becb-f326afded53d",
                                    "name": "database_01",
                                    "nodeClass": "database",
                                    "childNodes":
                                        [
                                            {
                                                "id": "3b915b16-f7ca-445a-9716-263761d092d1",
                                                "name": "table_01",
                                                "nodeClass": "table",
                                                "childNodes": {},
                                                "appearances": [],
                                                "dimensionFactor": 0.0
                                            }
                                        ],
                                    "appearances": [],
                                    "dimensionFactor": 0.0
                                }
                            ],
                        "appearances": [],
                        "dimensionFactor": 0.2
                    }
                ],
            "adjacencyList":
                [
                    {
                        "sourceId": "3b915b16-f7ca-445a-9716-263761d092d1",
                        "targets":
                            [
                                {
                                    "targetId": "43628c79-7af7-438f-9952-1f35058cff1f",
                                    "labels":
                                        [
                                            "etl_script_01.sql"
                                        ]
                                }
                            ]
                    }
                ],
            "reversedAdjacencyList":
                [
                    {
                        "targetId": "43628c79-7af7-438f-9952-1f35058cff1f",
                        "sources":
                            [
                                {
                                    "sourceId": "3b915b16-f7ca-445a-9716-263761d092d1",
                                    "labels":
                                        [
                                            "etl_script_01.sql"
                                        ]
                                }
                            ]
                    }
                ]
    }

    landscape: Landscape = {
        unixtimestamp: new Date().getSeconds(),
        graph: this.TEST_GRAPH,
        errors: new Array<string>(),
        warnings: new Array<string>()
    }

    compile(request: CompilerRequest): Promise<any> {
        
        return new Promise<Landscape>((resolve) => setTimeout(() => {
            resolve(this.landscape);
        }, Math.random() * 3000));
    }
}