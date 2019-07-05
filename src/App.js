import Alert from 'react-bootstrap/Alert';
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
    const [ medicineList ] = useGlobal('medicineList');

    /**
     * JSX to display if user is not using Chrome
     */
    const notChrome = (
        <>
            <h1 style={{textAlign: "center"}}>
                You must use the Chrome browser. No other browser is supported!
            </h1>
        </>
    );

    return (
        props.isChrome ?
            (
                <>
                    {activeResident ? <h2 style={{textAlign: "center"}}><span style={{background:"#edf11e"}}>{FULLNAME(activeResident)}</span></h2> : null}
                    {medicineList && medicineList.length > 0 && <h3 style={{textAlign: "center"}}>{medicineList[0].Directions}</h3>}
                    {props.chromeVersion < 74 &&
                        <Alert variant="warning">
                            Please upgrade your browser. Version {props.chromeVersion} is outdated and may cause issues!
                        </Alert>
                    }
                    <LandingPage/>
                </>
            ) : notChrome
    )
}

export default App;
