import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import React from "reactn";

export default function AddNewMedicineButton(props)
{
    return (
        <OverlayTrigger
            key="new-drug"
            placement="right"
            overlay={
                <Tooltip id="add-new-drug-tooltip">
                    Manually Add New Drug for Resident
                </Tooltip>
            }
        >
            <Button
                size="sm"
                variant="info"
                onClick={(e) => props.onClick(e)}
            >
                + Drug
            </Button>
        </OverlayTrigger>
    );
}
