import MedicineProvider from '../../providers/MedicineProvider';
import {MedicineRecord} from '../../types/RecordTypes';

/**
 * Fetch the Medications given the residentId
 *
 * @param {MedicineProvider} medicineProvider
 * @param {number} residentId
 * @returns Promise<MedicineRecord[]>
 */
const getMedicineList = (medicineProvider: typeof MedicineProvider, residentId: number): Promise<MedicineRecord[]> => {
    const searchCriteria = {
        where: [{column: 'ResidentId', value: residentId}],
        order_by: [{column: 'Drug', direction: 'asc'}],
    };
    return medicineProvider.search(searchCriteria);
};

export default getMedicineList;
