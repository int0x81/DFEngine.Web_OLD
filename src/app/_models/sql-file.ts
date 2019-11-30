export class SQLFile {

    /**
     * The file name including the file extension
     */
    name: string;

    /**
     * The file content
     */
    content: string;

    /**
     * @param fileName The file name including the file extension
     * @param fileContent The file content
     */
    constructor(fileName: string, fileContent: string) {
        this.name = fileName;
        this.content = fileContent;
    }
}