import React from "reactn";
import Button from "react-bootstrap/Button";

interface IProps {
    lastTaken: number | null | undefined
    lastTakenVariant: string
    onLogAmount: (n: number) => void
    drugName: string
    disabled?: boolean
    buttonTitle?: string
}

const LogButtons = (props: IProps) => {
    const {
        lastTaken,
        lastTakenVariant,
        onLogAmount,
        disabled = false,
        drugName,
        buttonTitle = 'Log'
    } = props;

    const disable = lastTaken === 0 || disabled;

    return (
        <>
            <Button
                size="sm"
                disabled={disable}
                variant={"outline-" + lastTakenVariant}
                className="mr-2"
                onClick={(e) => {
                    e.preventDefault();
                    onLogAmount(1);
                }}
            >
                {buttonTitle} 1 {drugName}
            </Button>

            <Button
                size="sm"
                disabled={disable}
                className="mr-2"
                variant={"outline-" + lastTakenVariant}
                onClick={(e) => {
                    e.preventDefault();
                    onLogAmount(2);
                }}
            >
                {buttonTitle} 2
            </Button>

            <Button
                size="sm"
                disabled={disable}
                className="mr-2"
                variant={"outline-" + lastTakenVariant}
                onClick={(e) => {
                    e.preventDefault();
                    onLogAmount(3);
                }}
            >
                {buttonTitle} 3
            </Button>

            <Button
                size="sm"
                disabled={disable}
                variant={"outline-" + lastTakenVariant}
                onClick={(e) => {
                    e.preventDefault();
                    onLogAmount(4);
                }}
            >
                {buttonTitle} 4
            </Button>
        </>
    )
}

export default LogButtons;
