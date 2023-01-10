import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import Modal from 'react-modal';
import { Page, Pagination } from "../../components/Pagination";
import { Table } from "../../components/Table";
import { Customer, customerService } from "../../service/customers.service";
import useModal from "../../hooks/useModal";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { maskCpf, maskPhoneNumber } from "../../helpers/mask";
import "./styles.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export function Customers() {

    const take = 10;

    const { close, isShowing, open, selected } = useModal()
    const {
        close: closeModalView,
        isShowing: isShowingModalView,
        open: openModalView,
        selected: selectedModalView
    } = useModal()
    const [search, setSearch] = useState("")
    const [activePage, setActivePage] = useState(0)
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formCustomer, setFormCustomer] = useState<Customer>({} as Customer)
    const [formAddress, setFormAddress] = useState<any>({})

    const [page, setPage] = useState<Page<Customer>>(
        {
            first: true,
            last: true,
            list: [],
            empty: false
        }
    )

    useEffect(() => {
        handleFetchCustomers()
    }, [activePage, search])

    const changePage = (type: string) => {
        if (type === "nextPage") {
            if (skip === 0) {
                setSkip(take);
            } else {
                setSkip(prev => prev + take);
            }
            setActivePage(prev => prev + 1)
        } else {
            setSkip(prev => prev - take);
            setActivePage(prev => prev - 1)
        }
    }

    async function handleFetchCustomers() {
        try {
            setLoading(true)
            const { customers, hasMore } = await customerService.findAll({
                skip,
                take,
                name: search
            })

            setPage({
                first: activePage === 0,
                last: !hasMore,
                list: customers
            })
        } catch (e) {
            console.log(e);

        } finally {
            setLoading(false)
        }
    }

    function handleSetSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setSearch(value)
    }

    function cleanForm() {
        setFormAddress({})
        setFormCustomer({} as Customer)
    }

    async function handleCreate(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault()

        const isValidFormCustomer = Object.values(formCustomer)
            .every((item: string) => item.length > 0)

        const isValidFormAddress = Object.values(formAddress)
            .every((item: any) => item.length > 0)

        if ((!isValidFormAddress || Object.values(formAddress).length === 0)
            || (!isValidFormCustomer || Object.values(formCustomer).length === 0)) {

            toast.error('Favor informar todos os dados', {
                duration: 4000,
                position: 'top-right',
                className: '',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }
            })
            return
        }

        const customer = {
            ...selectedModalView,
            ...formCustomer,
            address: {
                ...selectedModalView.address,
                ...formAddress,
                number: Number(formAddress?.number)
            }
        }

        delete customer.create

        try {

            setLoading(true)

            await customerService.create(customer)

            cleanForm()
            handleFetchCustomers()
            closeModalView()

            toast.success('Criado com sucesso', {
                duration: 4000,
                position: 'top-right',
                className: '',
                iconTheme: {
                    primary: '#00a000',
                    secondary: '#fff',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }
            })

        } catch (e) {
            setLoading(false)
            console.log(e);

        }
    }

    async function handleSubmitEdit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        const isValidFormCustomer = Object.values(formCustomer)
            .some((item: string) => item.length > 0)

        const isValidFormAddress = Object.values(formAddress)
            .some((item: any) => item.length > 0)

        if (!isValidFormCustomer && !isValidFormAddress) return

        const editedCustomer = {
            ...selectedModalView,
            ...formCustomer,
            address: {
                ...selectedModalView.address,
                ...formAddress,
                number: Number(selectedModalView.address.number ?? formAddress?.number)
            }
        }

        delete editedCustomer.address.id

        try {

            setLoading(true)
            await customerService.edit(editedCustomer)

            cleanForm()

            handleFetchCustomers()
            closeModalView()
            toast.success('Atualizado com sucesso', {
                duration: 4000,
                position: 'top-right',
                className: '',
                iconTheme: {
                    primary: '#00a000',
                    secondary: '#fff',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }
            })

        } catch (e) {
            setLoading(false)
            toast.error('Ocorreu um erro inesperado', {
                duration: 4000,
                position: 'top-right',
                className: '',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }
            })

        }

    }

    async function handleDelete() {

        try {
            setLoading(true)
            await customerService.delete(selected?.id)

            toast.success('Deletado com sucesso', {
                duration: 4000,
                position: 'top-right',
                className: '',
                iconTheme: {
                    primary: '#00a000',
                    secondary: '#fff',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }
            })
            close()

            handleFetchCustomers()

        } catch (e) {
            setLoading(false)
            console.log(e);
        }
    }

    function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target

        let formValue = value

        if (name === "cpf") {
            formValue = maskCpf(value)
        }
        if (name === "cellPhone") {
            formValue = maskPhoneNumber(value)
        }

        setFormCustomer((prev: any) => {
            const newData = { ...prev, [name]: formValue }
            return newData
        })
    }

    function handleChangeFormAdress(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target

        let formValue = value

        let regexNumbers = /^\d+$/

        if (name === "number" && (formValue.length > 0 && !regexNumbers.test(formValue))) {
            return
        }

        setFormAddress((prev: any) => {
            const newData = { ...prev, [name]: value }
            return newData
        })
    }

    const generatedData = useMemo(() => {
        return page.list?.map(customer => {
            return {
                name: customer.name,
                cpf: customer.cpf,
                email: customer.email,
                cellPhone: customer.cellPhone,
                view: (<button onClick={() => openModalView({ ...customer, viewModal: true })} className="menu-table-btn-view">Ver</button>),
                edit: (<button onClick={() => openModalView({ ...customer, viewModal: false })} className="menu-table-btn-edit">Editar</button>),
                delete: (<button onClick={() => open(customer)} className="menu-table-btn-delete">Excluir</button>)
            }
        })
    }, [page])

    return (
        <Layout>

            <Modal
                isOpen={isShowing}
                onRequestClose={loading ? () => { } : close}
                style={customStyles}
            >
                <div>
                    <p>Tem certeza que deseja excluir o cliente {selected?.name}?</p>
                </div>

                <div className="modal-footer">
                    <button
                        onClick={handleDelete}
                        className="menu-table-btn-view"
                    >
                        SIM
                    </button>

                    <button
                        onClick={close}
                        className="menu-table-btn-delete"
                    >
                        NÃO
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={isShowingModalView}
                onRequestClose={loading ? () => { } : closeModalView}
                style={customStyles}
            >
                <form onSubmit={selectedModalView?.create ? handleCreate : handleSubmitEdit} className="modal-form">
                    <div className="modal-header">
                        <h3>Informações do cliente</h3>
                    </div>
                    <div className="modal-body-grid">
                        <div className="modal-grid-item">
                            <div>
                                <p>Nome</p>
                                <input
                                    name="name"
                                    minLength={3}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formCustomer.name}
                                    onChange={handleChangeForm}
                                    defaultValue={selectedModalView?.name}
                                    placeholder="fulano de tal"
                                    type={"text"}
                                />
                            </div>
                            <div>
                                <p>Email</p>
                                <input
                                    name="email"
                                    minLength={10}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formCustomer.email}
                                    onChange={handleChangeForm}
                                    defaultValue={selectedModalView?.email}
                                    placeholder="cliente@email.com"
                                    type={"email"}
                                />
                            </div>
                        </div>
                        <div className="modal-grid-item">
                            <div>
                                <p>CPF</p>
                                <input
                                    name="cpf"
                                    minLength={14}
                                    maxLength={14}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formCustomer.cpf}
                                    onChange={handleChangeForm}
                                    defaultValue={selectedModalView?.cpf}
                                    placeholder="999.999.999-99"
                                    type={"text"}
                                />
                            </div>
                            <div>
                                <p>Telefone</p>
                                <input
                                    name="cellPhone"
                                    minLength={15}
                                    maxLength={15}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formCustomer.cellPhone}
                                    onChange={handleChangeForm}
                                    defaultValue={selectedModalView?.cellPhone}
                                    placeholder="73999999999"
                                    type={"text"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-header">
                        <h3>Endereço</h3>
                    </div>

                    <div className="modal-body-grid">
                        <div className="modal-grid-item">
                            <div>
                                <p>Rua</p>
                                <input
                                    name="street"
                                    minLength={3}
                                    onChange={handleChangeFormAdress}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formAddress?.street}
                                    defaultValue={selectedModalView?.address?.street}
                                    placeholder="rua das flores"
                                    type={"text"}
                                />
                            </div>
                            <div>
                                <p>Bairro</p>
                                <input
                                    name="neighborhood"
                                    minLength={3}
                                    onChange={handleChangeFormAdress}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formAddress?.neighborhood}
                                    defaultValue={selectedModalView?.address?.neighborhood}
                                    placeholder="encantador"
                                    type={"text"}
                                />
                            </div>
                            <div>
                                <p>Estado</p>
                                <input
                                    name="uf"
                                    minLength={3}
                                    onChange={handleChangeFormAdress}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formAddress?.uf}
                                    defaultValue={selectedModalView?.address?.uf}
                                    placeholder="bahia"
                                    type={"text"}
                                />
                            </div>
                        </div>
                        <div className="modal-grid-item">
                            <div>
                                <p>Número</p>
                                <input
                                    name="number"
                                    minLength={1}
                                    onChange={handleChangeFormAdress}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formAddress?.number}
                                    defaultValue={selectedModalView?.address?.number}
                                    placeholder="0"
                                    type={"text"}
                                />
                            </div>
                            <div>
                                <p>Cidade</p>
                                <input
                                    name="city"
                                    minLength={3}
                                    onChange={handleChangeFormAdress}
                                    disabled={selectedModalView?.viewModal || loading}
                                    value={formAddress?.city}
                                    defaultValue={selectedModalView?.address?.city}
                                    placeholder="porto seguro"
                                    type={"text"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            style={{
                                opacity: selectedModalView?.viewModal ? 0.3 : 1
                            }}
                            type="submit"
                            disabled={selectedModalView?.viewModal || loading}
                            className="menu-table-btn-view"
                        >
                            Salvar
                        </button>

                        <button
                            onClick={closeModalView}
                            className="menu-table-btn-delete"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>


            </Modal>
            <div className="container-customers">
                <div className="wrapper-table">
                    <div className="container-add-btn">
                        <button
                            onClick={() => openModalView({ create: true })}
                            className="button-add">
                            <FaPlus
                                size={22}
                                style={{
                                    marginRight: 10
                                }} />
                            Novo cliente</button>
                    </div>
                    <Table
                        searchValue={search}
                        search={handleSetSearch}
                        caption="Clientes"
                        headers={{
                            name: "Nome",
                            cpf: "CPF",
                            email: "Email",
                            cellPhone: "Telefone",
                            view: "Visualizar",
                            edit: "Editar",
                            delete: "Deletar"
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