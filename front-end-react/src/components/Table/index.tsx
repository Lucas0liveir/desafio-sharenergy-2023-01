import { ReactNode } from "react";
import { Page, Pagination } from "../Pagination";
import "./styles.css"

interface DefaultTableItem {
    [name: string]: string | number | ReactNode;
}

type TableHeaders<T extends DefaultTableItem> = Record<keyof T, string>;

interface TableProps<T extends DefaultTableItem> {
    items: T[];
    headers: TableHeaders<T>;
    caption: string;
}

function objectValues<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

export function Table<T extends DefaultTableItem>({ caption, headers, items }: TableProps<T>) {

    return (
        <div className="table-container">
            <h2>{caption}</h2>
            <div className="input-container">
                <input
                    className="input-table"
                    placeholder="nome"
                    type="text" />
            </div>
            <table className="table">
                <thead className="thead">
                    {objectValues(headers).map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </thead>
                <tbody className="tbody">
                    {items.map((td) => (
                        <tr className="tr">
                            {objectValues(td).map((entry) => (
                                <td className="td">{entry}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                activePage={0}
                loading={false}
                onPageChange={() => { }}
                page={{} as Page<T>}
            />
        </div>
    )
}