import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/modal";

function Yucen() {
    // Modal state
    const [modalOpen, setModalOpen] = useState(false);

    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

    return (
        <>
            <div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="save-button"
                    onClick={() => (modalOpen ? close() : open())}
                >
                    Launch modal
                </motion.button>
            </div>

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {modalOpen && <Modal handleClose={close} />}
            </AnimatePresence>
        </>
    );
}

export default Yucen;
