import React from 'reactn';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * Drug Dropdown
 * Pure function component
 *
 * @param props
 *  - drugId {int} active drug record Id
 *  - medicineList[]
 *  - onSelect (drugKey)=>{cb(drugKey)}
 *  - onLogDrug (drug)=>{cb(drug)}
 *
 * @returns {* | boolean}
 */
export default function DrugDropdown(props)
{
    if (!props.medicineList || props.medicineList.length === 0 || !props.drugId) {
        return false;
    }

    const activeDrug = getDrugById(props.drugId);

    if (!activeDrug) {
        return false;
    }

    const MedicineDropdownItems = (medicine) => {
        return (
            <Dropdown.Item
                key={medicine.Id}
                active={medicine.Id === props.drugId}
                onSelect={(e) =>props.onSelect(e, medicine)}>
                    {medicine.Drug}
            </Dropdown.Item>
        );
    };

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
    <ButtonGroup>
        <DropdownButton
            size="sm"
            title={activeDrug.Drug}
            variant="primary"
            id="medicine-dropdown-button"
        >
            {props.medicineList.map(MedicineDropdownItems)}
        </DropdownButton>

        <OverlayTrigger
            key="add"
            placement="top"
            overlay={
                <Tooltip id="add-medicine-tooltip">
                    Add drug to medical history
                </Tooltip>
            }
        >
            <Button
                size="sm"
                variant="info"
                onClick={() => alert('Add to Log')}
            >
                + Log
            </Button>
        </OverlayTrigger>
    </ButtonGroup>
    )
}