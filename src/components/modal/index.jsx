import { useState } from "react";
import "./index.css";

export default function Modal(props) {
    // const [showModal, setShowModal] = useState(props.modalState);

    return (
        <>

            {
                props.modalState ?
                    <>
                        <div className="modal-backdrop" onClick={() => { props.setModalState(false) }}></div>
                        <div className="modal-wrapper" onClick={() => { props.setModalState(false) }}>
                            <div className="modal-content" onClick={(e) => { e.stopPropagation() }}>
                                {props.children}
                            </div>
                        </div>
                    </>
                    : null
            }
        </>
    )
}