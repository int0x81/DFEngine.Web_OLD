import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class OptionsService {

    public readonly API_ENDPOINT: string;
    public readonly STRIPE_PUBLIC_KEY: string;

    constructor() {
        
        if (!environment.production) {
            this.API_ENDPOINT = "https://ingressdev.dfengine.io";
            this.STRIPE_PUBLIC_KEY = "pk_test_beoXgn4FSDWkVQKiMg1VYLOL00p7wLVzy2";
        }
        else {
            this.API_ENDPOINT = "https://ingress.dfengine.io";
        }
    }
}