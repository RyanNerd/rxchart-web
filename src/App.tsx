import LandingPage from "./components/Landing/LandingPage";
import React, {useGlobal} from 'reactn';
import {FULLNAME} from "./utility/common";

/**
 * Main Entry Component
 *
 * @returns {*}
 * @constructor
 */
function App()
{
    const [ activeResident ] = useGlobal('activeResident');
    const [ development ] = useGlobal('development');
    const residentColor = development ? 'blue' : "#edf11e";

    return (
        <>
            {activeResident ?
                <h2 style={{textAlign: "center"}}>
                    <span style={{background: residentColor}}>
                        {FULLNAME(activeResident)} {activeResident.DOB_MONTH}/{activeResident.DOB_DAY}/{activeResident.DOB_YEAR}
                    </span>
                </h2> : null
            }
            <LandingPage/>
        </>
    );
}

export default App;
