import Button from 'react-bootstrap/Button';
import React, {useGlobal, useState} from 'reactn';

interface IProps {
    activeTabKey: string;
}

const RxLookup = (props: IProps) => {
    const activeTabKey = props.activeTabKey;
    const [providers] = useGlobal('providers');
    const [clientList] = useGlobal('clientList');
    const medicineProvider = providers.medicineProvider;
    const [rxResult, setRxResult] = useState<unknown>(null);

    const findRx = async (drugName: string) => {
        const result = [];
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
                    result.push({firstName: client.FirstName, lastName: client.LastName, Drug: m.Drug});
                }
            }
        }
        return result;
    };

    if (activeTabKey !== 'rx-lookup') return null;

    const handleClick = async () => {
        const rxFound = await findRx('Hy');
        setRxResult(rxFound);
    };

    return (
        <>
            <Button onClick={() => handleClick()}>GO</Button>
            <p>{JSON.stringify(rxResult, null, '\t')}</p>
        </>
    );
};

export default RxLookup;
