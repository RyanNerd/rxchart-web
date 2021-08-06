import React from 'reactn';

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import {MedicineRecord} from "../../../types/RecordTypes";
import DisabledSpinner from "./DisabledSpinner";

interface IProps {
    disabled?: boolean
    drugId: number | null
    medicineList: MedicineRecord[]
    onSelect: (m: MedicineRecord) => void
}

/**
 * Drug Dropdown
 * @param {IProps} props
 * @returns {JSX.Element | null}
 */
const DrugDropdown = (props: IProps): JSX.Element | null => {
    const {disabled = false, drugId, medicineList} = props;

    // Do not render unless we have the required props.
    if (!medicineList || medicineList.length === 0 || !drugId) {
        return null;
    }

    /**
     * Get the drug object from the medicineList given the drugId
     * @param {number} drugId
     * @returns {MedicineRecord | null}
     */
    const getDrugById = (drugId: number): MedicineRecord | null => {
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
     * @param {MedicineRecord} medicine
     * @returns {JSX.Element}
     */
    const MedicineDropdownItems = (medicine: MedicineRecord): JSX.Element => {
        const otherNames = medicine.OtherNames ? ' (' + medicine.OtherNames + ') ' : '';
        const strength = medicine.Strength ? medicine.Strength : '';
        const drugDetail = medicine.Drug+ ' ' + strength + otherNames;
        const key = medicine.Id?.toString();
        return (
            <Dropdown.Item
                key={key}
                active={medicine.Id === drugId}
                onSelect={(s, e) => {
                    e.preventDefault();
                    props.onSelect(medicine);
                }}>
                {drugDetail}
            </Dropdown.Item>
        );
    };

    /**
     * Work-around so React 17 can be used
     * @link https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584
     */
    return (
        <DropdownButton
            disabled={disabled}
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
            size="sm"
            title={disabled ? <DisabledSpinner>{title}</DisabledSpinner> : title}
            variant="primary"
        >
            {medicineList.map(MedicineDropdownItems)}
        </DropdownButton>
    )
}

export default DrugDropdown;
