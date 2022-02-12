import React, {useEffect, useState} from 'react'
import {Modal, ModalBody, Tooltip} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import WomenAvatar1 from "../../assets/img/avatar.png"

function VideoCallModal() {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    useEffect(() => {
        let getDemoParam = (window.location.search).replace('?demo=', '');
        if (getDemoParam === 'call-screen') {
            setModal(true);
        }
    }, []);

    return (
        <div>
            <button className="btn btn-outline-light text-warning" onClick={modalToggle} id="Tooltip-Video-Call">
                <FeatherIcon.Video/>
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={"Tooltip-Video-Call"}
                toggle={tooltipToggle}>
                Video Call
            </Tooltip>
            <Modal isOpen={modal} toggle={modalToggle} centered className="modal-dialog-zoom call">
                <ModalBody>
                    <div className="call">
                        <div>
                            <figure className="avatar avatar-xl mb-4">
                                <img src={WomenAvatar1} className="rounded-circle" alt="avatar"/>
                            </figure>
                            <h4>Brietta Blogg <span className="text-success">video calling...</span></h4>
                            <div className="action-button">
                                <button type="button" onClick={modalToggle}
                                        className="btn btn-danger btn-floating btn-lg"
                                        data-dismiss="modal">
                                    <FeatherIcon.X/>
                                </button>
                                <button type="button" onClick={modalToggle}
                                        className="btn btn-success btn-pulse btn-floating btn-lg">
                                    <FeatherIcon.Video/>
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default VideoCallModal
