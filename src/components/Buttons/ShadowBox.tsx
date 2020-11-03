import React from "reactn";
import './../../styles/shadowbox.css'

interface IProps {
    children: any;
}

const ShadowBox = (props: IProps) => {
    return (
        <span className="hover-shadow-box-animation">{props.children}</span>
    )
}

export default ShadowBox;
