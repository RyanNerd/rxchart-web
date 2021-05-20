import React, {useEffect, useState} from 'reactn';
import NewImprovedWindow from "react-new-improved-window";
import {ResidentRecord} from "../../../types/RecordTypes";

interface IProps {
    onUnload: () => void
    clientList: ResidentRecord[]
}

const ClientRoster = (props: IProps) => {
    const {
        onUnload,
        clientList
    } = props;

    const [printWindow, setPrintWindow] = useState<Window | null>(null);

    const clientListItem = (clientRecord: ResidentRecord) => {
        return (
            <li className="no-marker">
                <h1 style={{lineHeight: "125px", fontSize: "5em"}}>
                    {clientRecord.LastName}, {clientRecord.FirstName}
                </h1>
            </li>
        )
    }

    useEffect(() => {
        if (printWindow) {
            /**
             * Handle the afterprint event
             * @param e {Event} Afterprint event
             */
            const handleAfterPrint = (e: Event) => {
                e.preventDefault();

                // Close this window when we are done printing.
                printWindow.close();
            }

            printWindow.addEventListener('afterprint', handleAfterPrint);
            printWindow.focus();
            printWindow.print();

            return () => printWindow.removeEventListener('afterprint', handleAfterPrint);
        }
    }, [printWindow]);

    return (
        <>
            <NewImprovedWindow
                features={{height:800, width: 840}}
                center="parent"
                title="Print Client Roster"
                onOpen={(w)=>setPrintWindow(w)}
                onUnload={() => onUnload()}
            >
                <ul>
                    {clientList.map((r) => {
                        return (
                            <>
                                {clientListItem(r)}
                                {clientListItem(r)}
                            </>
                        )
                    })}
                </ul>
            </NewImprovedWindow>
        </>
    )
}

export default ClientRoster;
