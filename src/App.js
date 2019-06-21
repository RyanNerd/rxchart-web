import React, {useGlobal} from 'reactn';

import LandingPage from "./components/Landing/LandingPage";

function App()
{
    const [ currentBarcode ] = useGlobal('currentBarCode');
    const [currentResident ] = useGlobal('currentResident');

    return (
        <>
            {currentResident ? <h2 style={{textAlign: "center"}}>{currentResident.FirstName} {currentResident.LastName}</h2> : null}
            {currentBarcode ? <h3 style={{textAlign: "center"}}>{currentBarcode}</h3> : null}
            <LandingPage/>
        </>
    )
}

export default App;
