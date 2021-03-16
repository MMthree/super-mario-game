import React, { useEffect, useRef } from 'react'

const ContactModal = ({ showModal, setShowModal }) => {

    const node = useRef();

    const handleClickOutside = e => {
      if (node.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      setShowModal(false);
    };

    useEffect(() => {
        if (showModal) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [showModal]);


    return (
        <div className={`contact-modal ${showModal ? "show-modal" : "hide"}`} > 
                <div ref={node} className={`${showModal ? "contact-container " : ""}`}>
                    <h3>Send Me a Message</h3>

                    <form >
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                        <button>Submit</button>
                    </form>
                </div>
        </div>
    )
}

export default ContactModal
