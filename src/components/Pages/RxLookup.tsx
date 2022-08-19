import RxLookupGrid from 'components/Pages/Grids/RxLookupGrid';
import Form from 'react-bootstrap/Form';
import React, {useEffect, useGlobal, useState} from 'reactn';

interface IProps {
    activeTabKey: string;
}

const RxLookup = (props: IProps) => {
    const activeTabKey = props.activeTabKey;
    const [providers] = useGlobal('providers');
    const [clientList] = useGlobal('clientList');
    const medicineProvider = providers.medicineProvider;
    const [rxResult, setRxResult] = useState<{Drug: string; LastName: string; FirstName: string}[] | []>([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (searchText.length > 1) {
            const findRx = async (drugName: string) => {
                const result = [] as {Drug: string; LastName: string; FirstName: string}[];
                const medicineSearchCriteria = {
                    where: [['Drug', 'LIKE', drugName + '%']],
                    orderBy: [['ResidentId']]
                };
                const meds = await medicineProvider.search(medicineSearchCriteria);

                for (const m of meds) {
                    if (m.ResidentId) {
                        const client = clientList.find((c) => c.Id === m.ResidentId);

                        if (client?.Id) {
                            // eslint-disable-next-line no-console
                            console.log('client', client);
                            result.push({FirstName: client.FirstName, LastName: client.LastName, Drug: m.Drug});
                        }
                    }
                }
                setRxResult(result);
            };
            findRx(searchText);
        } else {
            setRxResult([]);
        }
    }, [clientList, medicineProvider, searchText]);

    if (activeTabKey !== 'rx-lookup') return null;

    return (
        <Form>
            <Form.Control
                autoFocus
                id="rx-look-up-search-box"
                onChange={(changeEvent) => setSearchText(changeEvent.target.value)}
                onKeyDown={(keyboardEvent: React.KeyboardEvent<HTMLElement>) => {
                    if (keyboardEvent.key === 'Enter') keyboardEvent.preventDefault();
                }}
                placeholder="Drug name"
                style={{width: '350px'}}
                type="search"
                value={searchText}
            />

            {rxResult.length > 0 && (
                <div className="my-3">
                    <RxLookupGrid lookupList={rxResult} />{' '}
                </div>
            )}
        </Form>
    );
};

export default RxLookup;
