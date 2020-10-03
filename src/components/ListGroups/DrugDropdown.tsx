import React from 'reactn';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {MedicineRecord} from "../../types/RecordTypes";

interface IProps {
    medicineList: Array<MedicineRecord>,
    drugId: number | null,
    onSelect: Function
}

/**
 * Drug Dropdown
 *
 * @param props
 *  - drugId {int} active drug record Id
 *  - medicineList[]
 *  - onSelect (drugKey)=>{cb(drugKey)}
 *
 * @returns {* | boolean}
 */
const DrugDropdown = (props: IProps): JSX.Element | null => {
    const {medicineList, drugId} = props;

    // Do not render unless we have the required props.
    if (!medicineList || medicineList.length === 0 || !drugId) {
        return null;
    }

    /**
     * Get the drug object from the medicineList given the drugId
     *
     * @param {int} drugId
     * @returns {object | null}
     */
    const getDrugById = (drugId: number) => {
        for (const drug of medicineList) {
            if (drug.Id === drugId) {
                return drug;
            }
        }
        return null;
    }

    const activeDrug = getDrugById(drugId);

    // Do not render if there isn't an active drug.
    if (!activeDrug) {
        return null;
    }

    // Figure out the display title
    const drug = activeDrug.Drug;
    const strength = activeDrug.Strength ? activeDrug.Strength : '';
    const title = drug + ' ' + strength;

    /**
     * Dropdown Items component
     *
     * @param {object} medicine
     * @returns {*}
     */
    const MedicineDropdownItems = (medicine: MedicineRecord) => {
        const drug = medicine.Drug;
        const strength = medicine.Strength ? medicine.Strength : '';
        const drugDetail = drug + ' ' + strength;
        const key = medicine.Id?.toString();
        return (
            <Dropdown.Item
                key={key}
                active={medicine.Id === drugId}
                onSelect={(e) => props.onSelect(e, medicine)}>
                    {drugDetail}
            </Dropdown.Item>
        );
    };

    return (
        <DropdownButton
            size="lg"
            title={title}
            variant="primary"
        >
            {medicineList.map(MedicineDropdownItems)}
        </DropdownButton>
    )
}

export default DrugDropdown;
