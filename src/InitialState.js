import Frak from "./providers/Frak";

export const initialState = {
    development: true,
    activeTabKey: 'login',
    activeDrug: null,
    activeResident: null,
    residentList: null,
    medicineList: null,
    drugLogList: null,
    apiKey: null,
    baseUrl: "http://localhost:8082/v1/",
    providers: {
        residentProvider: null,
        medicineProvider: null,
        medHistoryProvider: null
    },
    frak: new Frak()
};