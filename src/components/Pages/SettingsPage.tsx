import ToggleSwitch from 'components/Pages/Buttons/ToggleSwitch';
import Container from 'react-bootstrap/Container';
import React, {useEffect, useGlobal} from 'reactn';
import 'styles/neumorphism/settings.css';
import {setStickyState} from 'utility/common';
import {defaultPreferences} from 'components/App/App';

const SettingsPage = () => {
    const [preferences, setPreferences] = useGlobal('preferences');
    useEffect(() => {
        if (preferences) {
            setStickyState('rx-chart-preferences', {
                ...defaultPreferences,
                landingPageTabSize: preferences.landingPageTabSize,
                rxTabSize: preferences.rxTabSize
            });
        }
    }, [preferences]);

    if (preferences === null) return null;

    return (
        <Container className="settings-container">
            <div className="settings-content">
                <div className="settings-text-header">Settings</div>
                <div className="settings-grid">
                    <b className="row1-col1">Main Tab Size</b>
                    <div className="row1-col2">
                        <ToggleSwitch
                            isChecked={preferences.landingPageTabSize === 'lg'}
                            onToggle={(t) => {
                                setPreferences({...preferences, landingPageTabSize: t ? 'lg' : 'sm'});
                            }}
                            leftText="Small"
                            rightText="Large"
                        />
                    </div>
                    <b className="row2-col1">Rx Tab Size</b>
                    <div className="row2-col2">
                        <ToggleSwitch
                            disabled={true}
                            isChecked={preferences.rxTabSize === 'lg'}
                            onToggle={(t) => setPreferences({...preferences, rxTabSize: t ? 'lg' : 'sm'})}
                            leftText="Small"
                            rightText="Large"
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SettingsPage;
