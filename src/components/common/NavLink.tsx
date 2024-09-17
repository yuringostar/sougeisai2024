import { FC } from "react";
import { Link } from "react-router-dom";

const NavLink: FC<
    {
        href: string;
        text: string;
        onclick?: () => void;
    }
> = (props) => {
    const handleClick = () => {
        if(props.onclick) props.onclick();
    }

    return (
        <li onClick={handleClick}>
            <Link to={props.href}>{props.text}</Link>
        </li>
    );
};

export default NavLink;