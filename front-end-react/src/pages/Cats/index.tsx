import { Layout } from "../../components/Layout";
import Lottie from 'react-lottie';
import animationData from '../../lotties/82726-cute-cat.json';
import "./styles.css"
import React, { useState } from "react";
import { validStatusCode } from "../../helpers/httpstatuscode";

export function Cats() {

    const [statusCode, setStatusCode] = useState('')
    const [notFound, setNotFound] = useState(false)

    let catsUrl = `https://http.cat/${statusCode}`

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    function handleSetStatusCode(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        if (validStatusCode.includes(Number(value))) {
            setStatusCode(value)
            setNotFound(false)
        } else {
            setStatusCode(value)
            setNotFound(true)
        }
    }

    return (
        <Layout>
            <div className="container-cats">
                <div className="cats-grid-item">
                    <div>
                        <input
                            onChange={handleSetStatusCode}
                            className="input-status"
                            placeholder="digite um status code. Ex: 200"
                            type={"text"} />
                    </div>
                </div>
                <div className="cats-grid-item">
                    <div>
                        {statusCode.length === 0 ? (
                            <Lottie
                                options={lottieOptions}
                                height={350}
                                width={350}
                            />
                        ) : (
                            <>
                                {notFound ? (

                                    <img width={350} src={'/not-found-cat.jpg'} />

                                ) : (
                                    <img width={350} src={catsUrl} />


                                )

                                }
                            </>
                        )

                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}