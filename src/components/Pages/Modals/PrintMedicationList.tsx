import NewImprovedWindow from 'react-new-improved-window';
import React, {useEffect, useState} from 'reactn';
import {MedicineRecord} from 'types/RecordTypes';
import Table from 'react-bootstrap/Table';

interface IProps {
    onUnload: () => void;
    medList: MedicineRecord[];
}

const PrintMedicationList = (props: IProps) => {
    const {onUnload, medList} = props;
    const [printWindow, setPrintWindow] = useState<Window | null>(null);

    /**
     * List item component
     * @param {MedicineRecord} medicineRecord The Medicine record object
     */
    const MedListItem = (medicineRecord: MedicineRecord) => {
        return (
            <tr id={`medication-print-list-row-${medicineRecord.Id}`} key={medicineRecord.Id}>
                <td style={{verticalAlign: 'middle', fontStyle: medicineRecord.Active ? undefined : 'italic'}}>
                    {medicineRecord.Drug}
                </td>
                <td style={{verticalAlign: 'middle', fontStyle: medicineRecord.Active ? undefined : 'italic'}}>
                    {medicineRecord.Strength}
                </td>
                <td style={{verticalAlign: 'middle'}}>{medicineRecord.Notes}</td>
            </tr>
        );
    };

    useEffect(() => {
        if (printWindow) {
            const handleAfterPrint = (event: Event) => {
                event.preventDefault();
                printWindow.close();
            };

            printWindow.addEventListener('afterprint', handleAfterPrint);
            printWindow.focus();

            // Wait a bit for the CSS to be applied to the new window before we invoke the print dialog.
            setTimeout(() => {
                printWindow.print();
            }, 1000);

            // Clean up
            return () => {
                printWindow.removeEventListener('afterprint', handleAfterPrint);
            };
        }
    }, [printWindow]);

    return (
        <>
            <NewImprovedWindow
                center="parent"
                features={{height: 800, width: 840}}
                onOpen={(w) => setPrintWindow(w)}
                onUnload={() => onUnload()}
                title="Client Medication List"
            >
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Drug</th>
                            <th>Strength</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>{medList.map((r) => MedListItem(r))}</tbody>
                </Table>
            </NewImprovedWindow>
        </>
    );
};

export default PrintMedicationList;
