import ManageOtc from 'components/Pages/ManagementTabs/ManageOtc';
import Settings from 'components/Pages/ManagementTabs/Settings';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React, {useState} from 'reactn';

const ManagementPage = () => {
    const [activeManagementKey, setActiveManagementKey] = useState('otc');
    return (
        <Tabs
            activeKey={activeManagementKey}
            defaultActiveKey="otc"
            onSelect={(s) => setActiveManagementKey(s || 'otc')}
        >
            <Tab
                eventKey="otc"
                title={
                    <ToggleButton
                        checked={activeManagementKey === 'otc'}
                        id="management-radio-btn-otc"
                        key="management-radio-btn-otc"
                        name="radio-management"
                        onChange={() => setActiveManagementKey('otc')}
                        size="sm"
                        type="radio"
                        value="otc"
                        variant="outline-success"
                    >
                        <span className="ml-2">Manage OTC</span>
                    </ToggleButton>
                }
            >
                <Tab.Content>
                    <ManageOtc activeTabKey="manage-otc" />
                </Tab.Content>
            </Tab>
            <Tab
                eventKey="settings"
                title={
                    <ToggleButton
                        checked={activeManagementKey === 'settings'}
                        id="management-radio-btn-settings"
                        key="management-radio-btn-settings"
                        name="radio-management"
                        onChange={() => setActiveManagementKey('settings')}
                        size="sm"
                        type="radio"
                        value="settings"
                        variant="outline-success"
                    >
                        <span className="ml-2">Settings</span>
                    </ToggleButton>
                }
            >
                <Tab.Content>
                    <Settings />
                </Tab.Content>
            </Tab>
        </Tabs>
    );
};

export default ManagementPage;
