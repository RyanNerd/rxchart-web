import React, {useGlobal} from 'reactn';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

export default function ResidentPage()
{
    const [ residentList ] = useGlobal('residentList');


    function handleClick(e, resident) {
        alert(resident.Id + 'DOB: ' + resident.DOB_MONTH + '/' + resident.DOB_DAY + '/' + resident.DOB_YEAR);
    }

    const ResidentRow = (resident) => {
        if (resident === null ){
            return null;
        }

        return (
            <tr
                key={'resident-grid-row-' + resident.Id}
                id={'resident-grid-row-' + resident.Id}
            >
                <td>
                    <Button
                        id={"resident-grid-button-" + resident.Id}
                        onClick={(e) => handleClick(e, resident)}
                    >
                        Select
                    </Button>
                </td>
                <td>{resident.FirstName}</td>
                <td>{resident.LastName}</td>
            </tr>
        );
    };

    return (
        <>
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th/>
                <th
                    className="poverty-grid-header"
                >
                    <span>First Name</span>
                </th>
                <th
                    className="poverty-grid-header"
                >
                    <span>Last Name</span>
                </th>
            </tr>
            </thead>
            <tbody>
                {residentList && residentList.length > 0 && residentList.map(ResidentRow) }
            </tbody>
        </Table>
        </>
    );
}