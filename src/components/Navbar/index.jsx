import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { Container } from './../Container'
import logo from '../../assets/bitcoin.png'

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <Container>
                <Link to="/">
                    <img className={style.logo} src={logo} alt="Costs" />
                </Link>
                <ul className={style.list}>
                    <li className={style.item}>
                        <Link to="/" className={style.link}>Home</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/projects" className={style.link}>Projetos</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    );
};

export { Navbar }