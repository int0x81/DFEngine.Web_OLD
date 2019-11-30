import { Technology } from 'src/app/_models/technology';
import { Injectable } from '@angular/core';

/**
 * This service manages and saves the users prefered
 * compiler options
 */
@Injectable()
export class CompilerOptionsService {

    selectedTechnology: Technology;
    compileColumnLevel: boolean;
}