import React from 'react';
import './modal.css';

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    //transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Creative Labs Color Fall 2k18 </h3>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                </div>
                <div className="modal-footer">
                </div>
            </div>
        </div>
    )
}

export default modal;