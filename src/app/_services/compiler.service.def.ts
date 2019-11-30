import { Landscape } from '../_models/landscape';
import { CompilerRequest } from '../_models/compilerRequest';
import { Subject } from 'rxjs';

export interface CompilerServiceDefinition {

    /**
     * Sends raw data to server and receives the compiled result
     * @param request The request containing the actual data to compile
     */
    compile(request: CompilerRequest): Promise<any>;
}