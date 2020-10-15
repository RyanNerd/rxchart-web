import LandingPage from "./Pages/LandingPage";
import React, {useGlobal} from 'reactn';
import {FullName} from "./utility/common";

/**
 * Main Entry Component
 *
 * @returns {*}
 * @constructor
 */
const App = () => {
    const [ resident ] = useGlobal('activeResident');
    const [ development ] = useGlobal('development');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";

    return (
        <>
            {resident ?
                <h4 style={{textAlign: "center"}}>
                    <span style={{background: residentColor, color: residentForegroundColor}}>
                        {FullName(resident)} {resident.DOB_MONTH}/{resident.DOB_DAY}/{resident.DOB_YEAR}
                    </span>
                </h4> : null
            }
            <LandingPage/>
        </>
    );
}

export default App;
