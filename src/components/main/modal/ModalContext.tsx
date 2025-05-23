import React, { createContext, useState, ReactNode, useContext } from 'react';

//type ModalType = 'Profile' | 'Playlists' | null;

interface ModalContextProps {
    modalState: { type: string; content: ReactNode } | null;
    openModal: (type: string, content: React.ReactNode) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalState, setModalState] = useState<{ type: string; content: ReactNode } | null>(null);

    const openModal = (type: string, content: ReactNode) => {
        setModalState({ type, content });
    };

    const closeModal = () => {
        setModalState(null);
    };

    return (
        <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};