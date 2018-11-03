import React from 'react';
import './modal.css';

//how to use: paste the stuff below into app.js under <Button>
// use Ctrl / to block uncomment
// { this.state.isShowing ? <div onMouseLeave={this.closeModalHandler} className="back-drop"></div> : null }
// <button className="open-modal-btn" onMouseEnter={this.openModalHandler} onMouseLeave={this.closeModalHandler}>?</button>
// <Modal
//    className="modal"
//    show={this.state.isShowing}
//    close={this.closeModalHandler}>
//        This is such a cool project whoo go draw shit and hear it make music amazing <br/>
//        Brought to u by us
// </Modal>

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