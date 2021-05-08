import React, {useEffect, useRef} from 'reactn';
import NewWindow from "react-new-window";
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

    const newWindow = useRef<NewWindow | null>(null);

    const clientListing = (clientRecord: ResidentRecord) => {
        return (
            <li className="no-marker">
                <h1 style={{lineHeight: "125px", fontSize: "5em"}}>
                    {clientRecord.LastName}, {clientRecord.FirstName}
                </h1>
            </li>
        )
    }

    useEffect(() => {
        if (newWindow && newWindow.current) {
            const currentWindow = newWindow.current as NewWindow;

            // @ts-ignore TS thinks that the window property is private (nope) so it throws false positive errors.
            const thisWindow = currentWindow.window as typeof window;

            /**
             * Handle the afterprint event
             * @param e {Event} Afterprint event
             */
            const handleAfterPrint = (e: Event) => {
                e.preventDefault();

                // Close this window when we are done printing.
                thisWindow.close();
            }

            thisWindow.addEventListener('afterprint', handleAfterPrint);
            thisWindow.focus();
            thisWindow.print();

            return () => thisWindow.removeEventListener('afterprint', handleAfterPrint);
        }
    }, [newWindow]);

    return (
        <>
            <NewWindow
                title="Print Client Roster"
                ref={newWindow}
                onUnload={() => onUnload()}
            >
                <ul>
                    {clientList.map((r) => clientListing(r))}
                </ul>
            </NewWindow>
        </>
    )
}

export default ClientRoster;
