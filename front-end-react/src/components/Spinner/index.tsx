import "./styles.css"

type Props = {
    color?: string
}

export function Spinner({ color }: Props) {

    return (
        <div
            style={
                {
                    borderColor: `${color ? color : "#fff"} transparent transparent transparent`
                }
            }
            className="lds-ring">
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
        </div>
    )
}