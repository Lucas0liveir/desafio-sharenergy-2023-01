import { Layout } from "../../components/Layout";
import { Table } from "../../components/Table";
import "./styles.css";


export function Home() {

    return (
        <Layout>
            <div className="container-home">
                <Table
                    caption="Usuários"
                    headers={{
                        avatar: "avatar",
                        name: "nome",
                        email: "email",
                        username: "username",
                        age: "idade"
                    }}
                    items={[{
                        avatar: "teste",
                        name: "lucas",
                        email: "oliveira.contato23@gmail.com",
                        username: "luquinhas",
                        age: "26 anos"
                    },
                    {
                        avatar: "teste",
                        name: "lucas",
                        email: "oliveira.contato23@gmail.com",
                        username: "luquinhas",
                        age: "26 anos"
                    }]}
                />
            </div>
        </Layout>

    )
}