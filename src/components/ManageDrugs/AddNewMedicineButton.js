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
                    Manually Add New Medicine
                </Tooltip>
            }
        >
            <Button
                {...props}
                size="sm"
                variant="info"
            >
                + Medicine
            </Button>
        </OverlayTrigger>
    );
}
