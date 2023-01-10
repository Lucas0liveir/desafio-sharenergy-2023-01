import { useState } from 'react';

const useModal = () => {
    const [selected, setSelected] = useState<any | null>(null);
    const [isShowing, setIsShowing] = useState<boolean>(false);

    const open = (ads: any) => {
        setSelected(ads);
        setIsShowing(true);
    };

    const close = () => {
        setSelected(null);
        setIsShowing(false);
    };

    return {
        isShowing,
        open,
        close,
        selected
    };
};

export default useModal;