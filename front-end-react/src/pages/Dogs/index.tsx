import { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/Layout";
import { FiRefreshCcw } from "react-icons/fi";
import Lottie from 'react-lottie';
import animationData from '../../lotties/30616-norm-the-dog.json';
import axios from "axios";
import "./styles.css"

export function Dogs() {

    const [dataUrlsIds, setDataUrlsIds] = useState<string[]>([])
    const [imageCompleteLoaded, setCompleteImageLoaded] = useState(true)
    const [dogsUrl, setDogsUrl] = useState('')

    let dogsBaseUrl = 'https://random.dog/'
    let randomIdDog = "https://random.dog/doggos"

    useEffect(() => {
        getAllImagesId()
    }, [])

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    async function getAllImagesId() {
        try {
            const { data } = await axios.get(randomIdDog)
            setDataUrlsIds(
                data
                    .filter((url: string) => {
                        return !url.includes(".mp4")
                    })
                    .filter((url: string) => {
                        return !url.includes(".webm")
                    })
                    .filter((url: string) => {
                        return !url.includes(".gif")
                    })
            )
        } catch (e) {
            console.log(e);
        }
    }

    function handleRefreshDogImage() {
        setCompleteImageLoaded(false)
        let maxIndex = Math.random() * (dataUrlsIds.length - 1)
        setDogsUrl(`${dogsBaseUrl}${dataUrlsIds[Math.floor(maxIndex)]}`)
    }

    function handleLoadedImage() {
        setCompleteImageLoaded(true)
    }


    return (
        <Layout>
            <div className="container-dogs">
                <div className="dogs-grid-item">
                    <div>
                        <button
                            disabled={!imageCompleteLoaded}
                            onClick={() => handleRefreshDogImage()}
                            className="button-refresh-dog">

                            <FiRefreshCcw style={{
                                marginRight: 10
                            }} />
                            Recarregar
                        </button>
                    </div>
                </div>
                <div className="dogs-grid-item">
                    <div>
                        {dogsUrl.length > 0 ? (
                            <img
                                onLoad={handleLoadedImage}
                                height={350}
                                width={350}
                                src={dogsUrl}
                            />
                        ) : (
                            <div>
                                <Lottie
                                    options={lottieOptions}
                                    height={350}
                                    width={350}
                                />
                                <p>Aperte o botão para ver outros doguinhos!</p>
                            </div>
                        )

                        }

                    </div>
                </div>
            </div>
        </Layout>
    )
}