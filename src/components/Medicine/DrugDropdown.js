import React from 'reactn';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * Drug Dropdown
 * Pure function component
 *
 * @param props
 *  - drugId {int} active drug record Id
 *  - medicineList[]
 *  - onSelect (drugKey)=>{cb(drugKey)}
 *
 * @returns {* | boolean}
 */
export default function DrugDropdown(props)
{
    // Do not render unless we have the required props.
    if (!props.medicineList || props.medicineList.length === 0 || !props.drugId) {
        return false;
    }

    const activeDrug = getDrugById(props.drugId);

    // Do not render if there isn't an active drug.
    if (!activeDrug) {
        return false;
    }

    // Figure out the display title
    const drug = activeDrug.Drug.toUpperCase();
    const strength = activeDrug.Strength ? activeDrug.Strength.toUpperCase() : '';
    const title = drug + ' ' + strength;

    /**
     * Dropdown Items component
     *
     * @param {object} medicine
     * @returns {*}
     */
    const MedicineDropdownItems = (medicine) => {
        const drug = medicine.Drug.toUpperCase();
        const strength = medicine.Strength ? medicine.Strength.toUpperCase() : '';
        const drugDetail = drug + ' ' + strength;

        return (
            <Dropdown.Item
                key={medicine.Id}
                active={medicine.Id === props.drugId}
                onSelect={(e) =>props.onSelect(e, medicine)}>
                    {drugDetail}
            </Dropdown.Item>
        );
    };

    /**
     * Get the drug object from the medicineList given the drugId
     *
     * @param {int} drugId
     * @returns {object | null}
     */
    function getDrugById(drugId)
    {
        for (let drug of props.medicineList) {
            if (drug.Id === drugId) {
                return drug;
            }
        }
        return null;
    }

    return (
        <DropdownButton
            size="sm"
            title={title}
            variant="primary"
            id="medicine-dropdown-button"
        >
            {props.medicineList.map(MedicineDropdownItems)}
        </DropdownButton>
    )
}