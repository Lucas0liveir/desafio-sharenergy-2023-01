import { Fragment, ReactElement, useState } from "react"
import "./styles.css"

interface Props {
    children?: ReactElement[];
    menuButton: ReactElement
}
export function Menu({ children, menuButton }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    function toggleOpen() {
        setIsOpen(!isOpen)
    }

    return (
        <div
            role={"button"}
            onClick={toggleOpen}
            className="menu"
        >
            {menuButton}
            <div className={isOpen ? "menu-list open" :"menu-list"}>
                {children?.map((Component, index) => {
                    return (
                        <Fragment key={index}>
                            {Component}
                        </Fragment>
                    )
                })
                }
            </div>
        </div>
    )
}