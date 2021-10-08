import About from "components/Pages/Modals/About";
import {ReactComponent as RxIcon} from "icons/prescription.svg";
import React, {useGlobal, useState} from "reactn";

/**
 * RxChart header with icon and signed in org name
 */
const Header = () => {
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [signIn] = useGlobal('signIn');

    return (
        <>
            <h3 style={{textAlign: "center"}} className="d-print-none">℞Chart{}
                <RxIcon
                    style={{cursor: "pointer", pointerEvents: "all"}}
                    onClick={() => setShowAboutPage(true)}
                    width="30px"
                    height="35px"
                />
                <span
                    style={{color: "steelblue"}}
                >
                    {signIn.organization}
                </span>
            </h3>

            <About
                show={showAboutPage}
                onHide={() => setShowAboutPage(false)}
            />
        </>
    )
}

export default Header;
