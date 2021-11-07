import React from 'reactn';
import {ReactNode} from 'reactn/default';
import 'styles/shadowbox.css';

interface IProps {
    children: ReactNode | undefined;
}

const ShadowBox = (props: IProps) => {
    return <span className="hover-shadow-box-animation">{props.children}</span>;
};

export default ShadowBox;
