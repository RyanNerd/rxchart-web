import Frak from "./providers/Frak";

export const initialState = {
    development: true,
    currentResident: null,
    currentBarcode: null,
    currentMedicine: null,
    residentList: null,
    currentTabKey: 'login',
    apiKey: null,
    baseUrl: "http://localhost:8082/v1/",
    providers: {
        residentProvider: null,
        medicineProvider: null
    },
    frak: new Frak()
};