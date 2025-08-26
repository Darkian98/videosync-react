import { TPackageTicketok } from "src/config/packages";

type AvailabilityData = {
    data: any
};

export interface States {
    availableData: AvailabilityData | null;
}

export interface Actions {
    updateAvailableData: (o: any) => void;
}
