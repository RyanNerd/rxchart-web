import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React from 'reactn';
import {MedicineRecord} from 'types/RecordTypes';

interface IProps {
    activeDrug: MedicineRecord | null;
    onSelect: (r: MedicineRecord) => void;
    otcList: MedicineRecord[];
}

/**
 * OtcListGroup Table
 * @param {IProps} props The props for this component
 * @returns {JSX.Element}
 */
const OtcListGroupGrid = (props: IProps): JSX.Element => {
    const {onSelect, activeDrug, otcList} = props;

    const OtcRow = (drug: MedicineRecord) => {
        const isSelected = activeDrug && activeDrug.Id === drug.Id;
        return (
            <tr key={drug.Id} id={`list-grp-grid-row-${drug.Id}`} style={{fontWeight: isSelected ? 'bold' : undefined}}>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <ToggleButton
                        id={'list-grp-otc-grid-select-btn-' + drug.Id}
                        type="checkbox"
                        name="resident-list"
                        variant="outline-info"
                        checked={isSelected || false}
                        onChange={() => onSelect(drug)}
                        value={drug.Id as number}
                    />
                </td>
                <td style={{verticalAlign: 'middle'}}>{drug.Drug}</td>
                <td style={{verticalAlign: 'middle'}}>{drug.OtherNames}</td>
                <td style={{verticalAlign: 'middle'}}>{drug.Strength}</td>
            </tr>
        );
    };

    return (
        <Table bordered hover size="sm" striped>
            <thead>
                <tr>
                    <th />
                    <th>Drug</th>
                    <th>Other Names</th>
                    <th>Strength</th>
                </tr>
            </thead>
            <tbody>{otcList.map(OtcRow)}</tbody>
        </Table>
    );
};

export default OtcListGroupGrid;
