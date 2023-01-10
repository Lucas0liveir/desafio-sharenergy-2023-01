import { ReactNode } from "react";
import { FaSearch } from "react-icons/fa";
import "./styles.css"

interface DefaultTableItem {
    [name: string]: string | number | ReactNode;
}

type TableHeaders<T extends DefaultTableItem> = Record<keyof T, string>;

interface TableProps<T extends DefaultTableItem> {
    items: T[];
    headers: TableHeaders<T>;
    caption: string;
    searchValue: string;
    search: Function;
}

function objectValues<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

export function Table<T extends DefaultTableItem>({
    caption,
    headers,
    items,
    search,
    searchValue
}: TableProps<T>) {

    return (
        <div className="table-container">
            <h2>{caption}</h2>
            <div className="input-container">
                <FaSearch
                    style={{
                        position: "relative",
                        left: "50.5%",
                        padding: "0 10px"
                    }}
                />
                <input
                    value={searchValue}
                    onChange={(e) => search(e)}
                    name="search"
                    className="input-table"
                    placeholder="procurar"
                    type="text" />
            </div>
            <table className="table">
                <thead className="thead">
                    <tr className="tr-header">
                        {objectValues(headers).map((header, index) => (
                            <th key={index}>{header}</th>

                        ))}
                    </tr>
                </thead>
                <tbody className="tbody">
                    {items.map((td, index) => (
                        <tr key={index} className="tr">
                            {objectValues(td).map((entry, index) => (
                                <td key={index} className="td">{entry}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}