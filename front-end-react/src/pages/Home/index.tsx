import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import { Page, Pagination } from "../../components/Pagination";
import { Table } from "../../components/Table";
import { RandomUser, randomUserService } from "../../service/random-user.service";
import "./styles.css";


export function Home() {

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    const [activePage, setActivePage] = useState(0);

    const [page, setPage] = useState<Page<RandomUser>>(
        {
            first: true,
            last: true,
            list: [],
            empty: false
        }
    )

    useEffect(() => {
        if (search.length === 0) {
            handleFetchRandomUsers()
        }

        handleSearchRandomUsers()
    }, [search])


    useEffect(() => {
        handleFetchRandomUsers()
    }, [activePage])

    const changePage = (type: string) => {
        if (type === "nextPage") {
            setActivePage(activePage + 1)
        } else {
            setActivePage(activePage - 1)
        }
    }

    function handleSetSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target

        setSearch(value)
    }

    async function handleFetchRandomUsers() {
        try {
            setLoading(true)
            const randomUsers = await randomUserService.fetchRandomUSers(activePage + 1)

            setPage({
                first: activePage === 0,
                last: activePage === 14 || randomUsers.length === 0,
                list: randomUsers
            })
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    function handleSearchRandomUsers() {
        if (search.length === 0) return
        const searchUsers = page.list.filter(randomUser => {
            return randomUser
                .completeName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
                randomUser
                    .email
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                randomUser
                    .username
                    .toLowerCase()
                    .includes(search.toLowerCase())
        })

        if (searchUsers.length === 0) return

        setPage(prev => {
            const newData = { ...prev, list: searchUsers }
            return newData
        })

    }

    const generatedData = useMemo(() => {
        return page.list?.map(randomUser => {
            return {
                avatar: (<img style={{ borderRadius: "100%" }} src={randomUser.picture.thumbnail} />),
                name: randomUser.completeName,
                email: randomUser.email,
                username: randomUser.username,
                age: randomUser.age
            }
        })
    }, [page])

    return (
        <Layout>
            <div className="container-home">
                <div className="wrapper-table">
                    <Table
                        searchValue={search}
                        search={handleSetSearch}
                        caption="Usuários"
                        headers={{
                            avatar: "avatar",
                            name: "nome",
                            email: "email",
                            username: "username",
                            age: "idade"
                        }}
                        items={generatedData}
                    />
                    <Pagination
                        activePage={activePage}
                        loading={loading}
                        onPageChange={changePage}
                        page={page}
                    />
                </div>
            </div>
        </Layout>

    )
}