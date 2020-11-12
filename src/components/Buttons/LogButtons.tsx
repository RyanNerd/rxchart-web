import React from "reactn";
import Button from "react-bootstrap/Button";

interface IProps {
    lastTaken: number | null | undefined
    lastTakenVariant: string
    onLogAmount: (n: number) => void
    drugName: string
}

const LogButtons = (props: IProps) => {
    const {
        lastTaken,
        lastTakenVariant,
        onLogAmount,
        drugName
    } = props;

    return (
        <>
            <Button
                disabled={lastTaken === 0}
                variant={"outline-" + lastTakenVariant}
                className="mr-2"
                onClick={(e) => {
                    e.preventDefault();
                    onLogAmount(1);
                }}
            >
                Log 1 {drugName}
            </Button>

            <Button
                disabled={lastTaken === 0}
                className="mr-2"
                variant={"outline-" + lastTakenVariant}
                onClick={(e) => {
                    e.preventDefault();
                    onLogAmount(2);
                }}
            >
                Log 2
            </Button>

            <Button
                disabled={lastTaken === 0}
                className="mr-2"
                variant={"outline-" + lastTakenVariant}
                onClick={(e) => {
                    e.preventDefault();
                    onLogAmount(3);
                }}
            >
                Log 3
            </Button>

            <Button
                disabled={lastTaken === 0}
                variant={"outline-" + lastTakenVariant}
                onClick={(e) => {
                    e.preventDefault();
                    onLogAmount(4);
                }}
            >
                Log 4
            </Button>
        </>
    )
}

export default LogButtons;
