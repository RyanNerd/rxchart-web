import React, { useGlobal } from 'reactn';
import Button from 'react-bootstrap/Button';

export default function Example(props) {
    //
    // const [count, setCount] = useState(0);
    //
    // // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });
    //
    // useEffect(() => {
    //     console.log('I will run only once');
    // }, []);

    const [ counter, setCounter ] = useGlobal('counter');

    return (
        <div>
            <p>You clicked {counter} times</p>
            <Button
                variant={props.variant}
                size="lg"
                onClick={() => setCounter(counter + 1)} >
                Click me
            </Button>
        </div>
    );
}