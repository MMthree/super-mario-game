import React, { useState } from 'react'
// import ContactModal from './ContactModal';

const Footer = () => {

    const [showModal, setShowModal] = useState(true);

    const handleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <footer>
            <div className="social">
                <ul>
                    <li>
                        <a href="https://github.com/MMthree" target="_blank" title="Github" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/mario-miramontes/" target="_blank" title="Linked In" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        {/* <div onClick={() => handleModal()} title="Email me">
                            <i className="fas fa-envelope"></i>
                        </div> */}
                        <a onClick={handleModal} href="mailto:mario@miramontes.me" target="_blank" title="Email me" rel="noopener noreferrer">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </li>
                </ul>
            </div>

            {/* <ContactModal  showModal={showModal} setShowModal={setShowModal} /> */}
        </footer>
    )
}
export default Footer
