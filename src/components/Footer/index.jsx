import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import style from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <ul className={style.socialList}>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedin />
                </li>
            </ul>
            <p className={style.copyRight}>
                <span>© 2022</span> - All rights reserved
            </p>
        </footer>

    );
};

export { Footer };