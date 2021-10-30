import NewImprovedWindow from 'react-new-improved-window';
import React, {useEffect, useState} from 'reactn';
import {ClientRecord} from 'types/RecordTypes';

interface IProps {
    onUnload: () => void;
    clientList: ClientRecord[];
}

const ClientRoster = (props: IProps) => {
    const {onUnload, clientList} = props;

    const [printWindow, setPrintWindow] = useState<Window | null>(null);

    const clientListItem = (clientRecord: ClientRecord) => {
        return (
            <li className="no-marker">
                <h1 style={{lineHeight: '125px', fontSize: '5em'}}>
                    {clientRecord.LastName}, {clientRecord.FirstName}
                </h1>
            </li>
        );
    };

    useEffect(() => {
        if (printWindow) {
            const handleAfterPrint = (e: Event) => {
                e.preventDefault();
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
                features={{height: 800, width: 840}}
                center="parent"
                title="Print Client Roster"
                onOpen={(w) => setPrintWindow(w)}
                onUnload={() => onUnload()}
            >
                <ul>
                    {clientList.map((r) => {
                        return (
                            <>
                                {clientListItem(r)}
                                {clientListItem(r)}
                            </>
                        );
                    })}
                </ul>
            </NewImprovedWindow>
        </>
    );
};

export default ClientRoster;
