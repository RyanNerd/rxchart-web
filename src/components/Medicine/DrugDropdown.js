import React from 'reactn';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar"
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
 *  - onEditDrug
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
        <ButtonToolbar>
            <ButtonGroup className="mr-2">
                <DropdownButton
                    size="sm"
                    title={activeDrug.Drug}
                    variant="primary"
                    id="medicine-dropdown-button"
                >
                    {props.medicineList.map(MedicineDropdownItems)}
                </DropdownButton>
            </ButtonGroup>

            {props.onLogDrug &&
                <ButtonGroup className="mr-3">
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
                            onClick={(e) => props.onLogDrug(e)}
                        >
                            + Log
                        </Button>
                    </OverlayTrigger>
                </ButtonGroup>
            }

            {props.onEditDrug &&
                <ButtonGroup>
                    <Button
                        size="sm"
                        variant="info"
                        onClick={(e) => props.onEditDrug(e)}
                    >
                        Edit Drug Info
                    </Button>
                </ButtonGroup>
            }
        </ButtonToolbar>
    )
}