import {Authenticated} from 'providers/AuthenticationProvider';
import 'reactn';
import {
    ClientRecord,
    DrugLogRecord,
    FileRecord,
    MedicineRecord,
    PillboxItemRecord,
    PillboxRecord
} from 'types/RecordTypes';
import {IProviders} from 'utility/getInitialState';

declare module 'reactn/default' {
    // Global Client Type for the activeClient
    export type TClient = {
        clientInfo: ClientRecord;
        drugLogList: DrugLogRecord[];
        fileList: FileRecord[];
        medicineList: MedicineRecord[];
        pillboxItemList: PillboxItemRecord[];
        pillboxList: PillboxRecord[];
    };

    export interface IPreferences {
        landingPageTabSize: 'lg' | 'sm';
        rxTabSize: 'lg' | 'sm';
    }

    export interface State {
        __errorDetails: unknown;
        activeClient: TClient | null;
        activeTabKey: string;
        clientList: ClientRecord[];
        otcList: MedicineRecord[];
        preferences: IPreferences | null;
        providers: IProviders;
        signIn: Authenticated;
    }
}
