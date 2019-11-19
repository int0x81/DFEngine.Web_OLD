import { TrackingOptionValue } from './trackingoptionvalue';

export class TrackingProcess {

    id: string;
    gitHubBranchId: string;
    technologyId: string;
    options: TrackingOptionValue[];
    selected: boolean;

    constructor() {
        this.selected = true;
    }
}