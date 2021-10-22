import ClientHeader from 'components/App/ClientHeader';
import Header from 'components/App/Header';
import Main from 'components/App/Main';
import React from 'reactn';
import LandingPage from 'components/Pages/LandingPage';

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 */
const App = () => {
    return (
        <React.StrictMode>
            <Main>
                <Header />
                <ClientHeader />

                <div style={{marginLeft: '15px'}}>
                    <LandingPage />
                </div>
            </Main>
        </React.StrictMode>
    );
};

export default App;
