import About from 'components/Pages/Modals/About';
import {ReactComponent as RxIcon} from 'icons/prescription.svg';
import React, {useGlobal, useState} from 'reactn';

/**
 * RxChart header with icon and signed in org name
 */
const Header = () => {
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [signIn] = useGlobal('signIn');
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    return (
        <>
            <h4 style={{textAlign: 'center'}} className="d-print-none mb-0">
                <span style={{color: isDev ? 'red' : undefined}}>℞Chart {isDev ? ' (DEVELOPMENT) ' : ' '}</span>
                <RxIcon
                    style={{cursor: 'pointer', pointerEvents: 'all'}}
                    onClick={() => setShowAboutPage(true)}
                    width="30px"
                    height="35px"
                />
                <span style={{color: isDev ? 'red' : 'steelblue'}}>{signIn.organization}</span>
            </h4>

            <About show={showAboutPage} onClose={() => setShowAboutPage(false)} />
        </>
    );
};

export default Header;
