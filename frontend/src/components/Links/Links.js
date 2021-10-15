import { NavLink } from "react-router-dom";
import { Route } from "react-router";
import { useEffect } from "react";

const Links = () => {
    return (
        <div className='links'>
            <p>By Max Koerner</p>
            <a href="https://github.com/mkoerner570/evernote-react-project" className="important">
                <img src="https://res.cloudinary.com/duqceaiyi/image/upload/v1634328832/GitHub-Mark-32px_zbm8gp.png"></img>
            </a>
            <a href="https://www.linkedin.com/in/max-koerner-49119664/" className="important">
                <img src="https://res.cloudinary.com/duqceaiyi/image/upload/v1634329619/LI-Logo_ysqgng.png" className='in'></img>
            </a>
        </div>
    )
}

export default Links;
