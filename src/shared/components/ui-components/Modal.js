import ModalBootstrap from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';
import { Fragment, useState } from 'react';

export const  MyVerticallyCenteredModal = ({ modalTitle, modalBody, onAccept, onCloseModal }) => {

    const handleClose = () => onCloseModal();
    const onClickAcceptButton = () =>{
        onAccept();
        onCloseModal()
    }
    return (
        <Fragment>
            <ModalBootstrap
            centered={true}
            show={true}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
                <ModalBootstrap.Header closeButton>
                    <ModalBootstrap.Title>{modalTitle}</ModalBootstrap.Title>
                </ModalBootstrap.Header>
                <ModalBootstrap.Body>
                    {modalBody}
                </ModalBootstrap.Body>
                <ModalBootstrap.Footer>
                    <ButtonBootstrap variant="secondary" onClick={handleClose}>
                         Cancelar
                    </ButtonBootstrap>
                    <ButtonBootstrap variant="primary" onClick={onClickAcceptButton}>Aceptar</ButtonBootstrap>
                </ModalBootstrap.Footer>
            </ModalBootstrap>
      </Fragment>
    );
  }