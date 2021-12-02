import ClientHeader from 'components/App/ClientHeader';
import Header from 'components/App/Header';
import Main from 'components/App/Main';
import useStickyState from 'hooks/useStickyState';
import React, {useEffect, useGlobal} from 'reactn';
import LandingPage from 'components/Pages/LandingPage';
import {IPreferences} from 'reactn/default';

export const defaultPreferences = {
    landingPageTabSize: 'sm',
    rxTabSize: 'sm'
} as IPreferences;

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 */
const App = () => {
    const [preferences, setPreferences] = useGlobal('preferences');
    const [settings] = useStickyState('rx-chart-preferences', {...defaultPreferences});

    useEffect(() => {
        if (preferences === null) {
            setPreferences(settings);
        }
    }, [preferences, setPreferences, settings]);

    if (preferences === null) return null;

    return (
        <React.StrictMode>
            <Main>
                <Header />
                <ClientHeader />

                <div style={{marginLeft: '15px'}}>
                    <LandingPage preferences={preferences} />
                </div>
            </Main>
        </React.StrictMode>
    );
};

export default App;
