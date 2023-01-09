import "./styles.css"

export interface Page<T> {
    last: boolean;
    list: T[];
    first: boolean;
    empty?: boolean;
}

interface Props<T> {
    page: Page<T>;
    onPageChange: Function;
    activePage: number;
    loading: boolean;
}

export function Pagination<T>({
    activePage,
    loading,
    onPageChange,
    page
}: Props<T>) {

    return (
        <div className="container-pagination">
            <nav className="nav">
                <div className="wrapper-pagination">
                    <button
                        style={{
                            opacity: page?.first ? 0.5 : 1
                        }}
                        className="pagination-btn"
                        disabled={loading || page?.first}
                        onClick={() => onPageChange("backPage")}
                    >
                        Anterior
                    </button>

                    <span className="span">{page.list?.length ? activePage + 1 : activePage}</span>

                    <button
                        style={{
                            opacity: page?.last ? 0.5 : 1
                        }}
                        className="pagination-btn"
                        disabled={loading || page?.last}
                        onClick={() => onPageChange("nextPage")}
                    >
                        Próxima
                    </button>
                </div>
            </nav>
        </div>
    )
}