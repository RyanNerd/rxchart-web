import Button from 'react-bootstrap/Button';
import React from 'reactn';

interface IProps {
    buttonTitle?: string;
    disabled?: boolean;
    lastTaken: number | null | undefined;
    lastTakenVariant: string;
    onLogAmount: (n: number) => void;
}

const LogButtons = (props: IProps) => {
    const {lastTaken, lastTakenVariant, onLogAmount, disabled = false, buttonTitle = 'Log'} = props;
    const disable = lastTaken === 0 || disabled;

    return (
        <>
            <Button
                className="mr-2"
                disabled={disable}
                onClick={() => onLogAmount(1)}
                size="sm"
                variant={`outline-${lastTakenVariant}`}
            >
                {buttonTitle} 1
            </Button>

            <Button
                className="mr-2"
                disabled={disable}
                onClick={() => onLogAmount(2)}
                size="sm"
                variant={`outline-${lastTakenVariant}`}
            >
                {buttonTitle} 2
            </Button>

            <Button
                className="mr-2"
                disabled={disable}
                onClick={() => onLogAmount(3)}
                size="sm"
                variant={`outline-${lastTakenVariant}`}
            >
                {buttonTitle} 3
            </Button>

            <Button disabled={disable} onClick={() => onLogAmount(4)} size="sm" variant={`outline-${lastTakenVariant}`}>
                {buttonTitle} 4
            </Button>
        </>
    );
};

export default LogButtons;
