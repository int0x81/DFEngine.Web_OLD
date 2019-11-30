/**
 * Represents a single source that contains sql
 */
export class DataSource {

    /**
     * The name of the source, e.g. the file name
     */
    name: string;

    /**
     * The content of the data source
     * containing the actual datum
     */
    content: string;
}