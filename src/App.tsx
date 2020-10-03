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
    const [ activeResident ] = useGlobal('activeResident');
    const [ development ] = useGlobal('development');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";

    return (
        <>
            {activeResident ?
                <h4 style={{textAlign: "center"}}>
                    <span style={{background: residentColor, color: residentForegroundColor}}>
                        {FullName(activeResident)} {activeResident.DOB_MONTH}/{activeResident.DOB_DAY}/{activeResident.DOB_YEAR}
                    </span>
                </h4> : null
            }
            <LandingPage/>
        </>
    );
}

export default App;
