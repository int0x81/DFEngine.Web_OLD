import { DataSource } from './dataSource';

/**
 * A request that can be send to the server
 * for compilation
 */
export class CompilerRequest {

    /**
     * The technology which shall be used to compile
     * the data sources
     */
    technologyId: string;

    /**
     * States if the data sources shall be analyzed on
     * column level
     */
    columnLevel: boolean;

    /**
     * The actual data sources
     */
    dataSources: Array<DataSource>
}