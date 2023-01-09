import { ReactNode, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi"
import { FaCat, FaDog, FaHome, FaUser, FaUsers } from "react-icons/fa"
import { ImExit } from 'react-icons/im';
import "./styles.css"
import { Menu } from "../Menu";
import { authService } from "../../service/auth.service";

interface Props {
    children: ReactNode
}

export function Layout({ children }: Props) {
    const sideBarRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    function toggleOpen() {
        setIsOpen(!isOpen)
    }

    function handleLogout() {
        authService.logout()
        location.href = "/login"
    }

    return (
        <div className="container">
            <div ref={headerRef} className={"header"}>
                <div className="header-logo-menu">
                    <div role={"button"} className="sidebar-toggle button" onClick={toggleOpen}>
                        <GiHamburgerMenu />
                    </div>
                    <img className={isOpen ? "logo-layout-mobile open" : "logo-layout-mobile"} src="/logo-mobile.png" width={45} />
                </div>
                <Menu
                    menuButton={
                        <button className="button-profile">
                            <FaUser size={32} />
                        </button>}
                    children={
                        [
                            <div
                                onClick={handleLogout}
                                role={"button"}
                                className="menu-content">
                                <button className="button-profile">
                                    <ImExit size={32} />
                                </button>
                                sair
                            </div>
                        ]}
                />

            </div>
            <div className="content">
                <div ref={sideBarRef} className={isOpen ? "sidebar open" : "sidebar"}>
                    <img className="logo-layout" src="/logo.png" width={200} />

                    <nav className={isOpen ? 'sidebar-nav open' : 'sidebar-nav'}>
                        <Link to="/">
                            <button className="button-side-bar">
                                <FaHome style={{ marginRight: 5 }} />
                                Inicio
                            </button>
                        </Link>

                        <Link to="/cats">
                            <button className="button-side-bar">
                                <FaCat style={{ marginRight: 5 }} />
                                Gatos
                            </button>
                        </Link>

                        <Link to="/dogs">
                            <button className="button-side-bar">
                                <FaDog size={21} style={{ marginRight: 5 }} />
                                Cães
                            </button>
                        </Link>

                        <Link to="/customers">
                            <button className="button-side-bar">
                                <FaUsers size={21} style={{ marginRight: 5 }} />
                                Clientes
                            </button>
                        </Link>
                    </nav>
                </div>
                <div className={isOpen ? "content-pages open" : "content-pages"}>
                    {children}
                </div>
            </div>

        </div>

    );
}
