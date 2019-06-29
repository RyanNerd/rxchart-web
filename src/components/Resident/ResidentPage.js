import React, {useState} from 'reactn';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ResidentGrid from './ResidentGrid';
import ResidentEdit from './ResidentEdit';

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 *
 * @returns {*}
 * @constructor
 */
export default function ResidentPage()
{
    // Establish initial state
    const [ show, setShow ] = useState(false);
    const [ residentInfo, setResidentInfo ] = useState({Id: null});
    const [ currentResidentId, setCurrentResidentId ] = useState(2);
    /**
     * Fires when user clicks the Edit button
     *
     * @param e
     * @param resident
     */
    function onEdit(e, resident)
    {
        e.preventDefault();

        setResidentInfo({...resident});
        setShow(true);
    }

    /**
     * Fires when user clicks the + (add) button
     *
     * @param e
     */
    function handleAdd(e)
    {
        e.preventDefault();

        setResidentInfo({
            Id: 0,
            FirstName: "",
            LastName: "",
        });

        setShow(true);
    }

    /**
     * Fires when ResidentEdit closes.
     *
     * @param {object | null} residentInfo
     */
    function handleModalClose(residentInfo)
    {
        if (residentInfo) {
            alert(residentInfo.FirstName + ' ' + residentInfo.LastName);
        }

        setShow(false);
    }

    function handleOnSelected(e, resident)
    {
        setCurrentResidentId(resident.Id);
    }

    return (
        <>
            <OverlayTrigger
                key="add-right"
                placement="right"
                overlay={
                    <Tooltip id="add-tooltip-right">
                        Add New Resident
                    </Tooltip>
                }
            >
                <Button
                    size="sm"
                    variant="info"
                    onClick={(e) => handleAdd(e)}
                >
                    +
                </Button>
            </OverlayTrigger>

            <p><span> </span></p>

            <ResidentGrid
                onEdit={(e, resident) => onEdit(e, resident)}
                onSelected={(e, r) => handleOnSelected(e, r)}
                currentResidentId={currentResidentId}
            />

            {/* ResidentEdit Modal */}
            <ResidentEdit
                show={show}
                residentInfo={residentInfo}
                onClose={(r) => handleModalClose(r)}
            />
        </>
    );
}