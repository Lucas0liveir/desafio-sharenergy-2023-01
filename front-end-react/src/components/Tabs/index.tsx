import { useState } from 'react';
import './styles.css'

interface PropsTabs {
    children: JSX.Element[],
    labels: string[],
}

function Tabs(props: PropsTabs) {

    const [activeTab, setActiveTab] = useState(props.labels[0]);

    const onClickTabItem = (tab: string) => {
        setActiveTab(tab);
    }

    return (
        <div className="tabs">
            <ol className="tab-list">
                {props.labels.map((label) => {
                    return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClick={onClickTabItem}
                        />
                    );
                })}
            </ol>
            <div className="tab-content">
                {props.children.map((child, index) => {
                    if (props.labels[index] !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
}

interface TabProps {
    activeTab?: string;
    label: string;
    onClick?: (tab: string) => void;
}

export function Tab(props: TabProps) {
    
    const onClick = () => {
        const { label, onClick } = props;
        onClick!(label);
    }

    let className = 'tab-list-item';

    if (props.activeTab === props.label) {
        className += ' tab-list-active';
    }

    return (
        <li
            className={className}
            onClick={onClick}
        >
            {props.label}
        </li>
    );
}

export default Tabs;
