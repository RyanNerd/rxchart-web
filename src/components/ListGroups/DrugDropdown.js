import React from 'reactn';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from 'prop-types';

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
const DrugDropdown = (props) => {
    const medicineList = props.medicineList;
    const drugId = props.drugId;

    // Do not render unless we have the required props.
    if (!medicineList || medicineList.length === 0 || !drugId) {
        return false;
    }

    /**
     * Get the drug object from the medicineList given the drugId
     *
     * @param {int} drugId
     * @returns {object | null}
     */
    const getDrugById = (drugId) => {
        for (let drug of medicineList) {
            if (drug.Id === drugId) {
                return drug;
            }
        }
        return null;
    }

    const activeDrug = getDrugById(drugId);

    // Do not render if there isn't an active drug.
    if (!activeDrug) {
        return false;
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
    const MedicineDropdownItems = (medicine) => {
        const drug = medicine.Drug;
        const strength = medicine.Strength ? medicine.Strength : '';
        const drugDetail = drug + ' ' + strength;

        return (
            <Dropdown.Item
                key={medicine.Id}
                active={medicine.Id === drugId}
                onSelect={(e) =>props.onSelect(e, medicine)}>
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

DrugDropdown.propTypes = {
    medicineList: PropTypes.arrayOf(PropTypes.object),
    onSelect: PropTypes.func,
    drugId: PropTypes.number
}

export default DrugDropdown;
