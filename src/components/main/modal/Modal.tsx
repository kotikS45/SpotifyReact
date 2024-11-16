import React, {useRef} from 'react';
import { useModal } from './ModalContext';
import {useEffect} from "react";

const Modal: React.FC = () => {
    const { modalState, closeModal } = useModal();
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                console.log("close")
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeModal]);

    if (!modalState) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
            <div className="bg-black py-[60px] px-[45px] relative rounded-[16px]"
                 ref={modalRef}
                 style={{ boxShadow: '0px 0px 10px 0px #F41A30B2' }}>
                {modalState.content}
            </div>
        </div>
    );
};

export default Modal;
