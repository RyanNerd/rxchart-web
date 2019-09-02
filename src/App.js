import LandingPage from "./components/Landing/LandingPage";
import React, {useGlobal} from 'reactn';
import {FULLNAME} from "./utility/common";

/**
 * Main Entry Component
 *
 * @param props [isChrome, chromeVersion]
 * @returns {*}
 * @constructor
 */
function App(props)
{
    const [ activeResident ] = useGlobal('activeResident');

    return (
        <>
            {activeResident ? <h2 style={{textAlign: "center"}}><span style={{background:"#edf11e"}}>{FULLNAME(activeResident)}</span></h2> : null}
            <LandingPage/>
        </>
    );
}

export default App;
