import React from 'reactn';
import Button from "react-bootstrap/Button";
import NewWindow from "react-new-window";

export default function DrugHistoryGrid()
{
    return (
        <NewWindow>
            <Button onClick={()=> window.open("https://google.com", "_blank")}>
                Launch Google
            </Button>
        </NewWindow>
    );
}