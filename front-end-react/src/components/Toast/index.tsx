import React, { useEffect, useRef } from "react";
import "./styles.css"

interface Item {
    status?: "SUCCESS" | "ERROR";
    title?: string;
    description?: string;
    show?: boolean;
}

interface ToastProps {
    listToast: Item[]
}

export const Toast = (({ listToast }: ToastProps) => {
    const toastRef = useRef<HTMLDivElement[] | null>([])
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        handleShowToast()
    }, [listToast])

    function handleShowToast() {
        toastRef.current!?.forEach((toast) => {
            toast.classList.add("active")
            setTimeout(() => {
                toast.classList.add("active")
            }, 3000)
       })   
    }

    return (
        <>
            {
                listToast.map((element, index) => {
                    return (
                        < div
                            style={{
                                borderLeftColor: element.status === "SUCCESS" ? "#00c800" : "#FF0000"
                            }
                            }
                            ref={(e: HTMLDivElement) => toastRef.current![index] = e}
                            className="toast"
                        >
                            <div className="toast-content">
                                <div className="message">
                                    <span className="text text-1">{element.title}</span>
                                    <span className="text text-2">{element.description}</span>
                                </div>
                            </div>
                            <div
                                className="progress"
                            />
                        </div >
                    )

                })
            }
        </>
    )

})