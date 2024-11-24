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
                <button className="absolute top-[40px] p-[10px] right-[40px] hover:before:bg-[#7C7C7C] hover:before:opacity-35 before:content-[''] before:absolute before:inset-0 before:rounded-full flex items-center justify-center" onClick={closeModal}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.07507 6.865L13.4751 1.46501C13.8151 1.12501 13.8151 0.585 13.4751 0.255C13.1351 -0.085 12.595 -0.085 12.265 0.255L6.86511 5.65501L1.46508 0.255C1.12508 -0.085 0.585 -0.085 0.255 0.255C-0.075 0.595 -0.085 1.13501 0.255 1.46501L5.65502 6.865L0.255 12.265C-0.085 12.605 -0.085 13.145 0.255 13.475C0.595 13.805 1.13508 13.815 1.46508 13.475L6.86511 8.07501L12.265 13.475C12.605 13.815 13.1451 13.815 13.4751 13.475C13.8151 13.135 13.8151 12.595 13.4751 12.265L8.07507 6.865Z"
                            fill="white"/>
                    </svg>
                </button>
                {modalState.content}
            </div>
        </div>
    );
};

export default Modal;
