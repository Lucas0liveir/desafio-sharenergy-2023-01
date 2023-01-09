import { authService } from "../../service/auth.service"


export function Home () {

    authService.logout()
    return (
        <div></div>
    )
}