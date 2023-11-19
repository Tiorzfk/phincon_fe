"use client";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalData(props) {
    const handleClose = () => props.handleClose();
    const [nickname, setNickname] = useState('')

    return (
        <>
            <Modal show={props.show} onHide={handleClose}
            size='md'>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Pokemon Nickname</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        props.handleSave(nickname)
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter nickname"
                                autoFocus
                                onChange={(val) => {
                                    setNickname(val.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={() => props.handleSave(nickname)} disabled={props.isLoading}>
                        <div className="d-flex gap-2 align-items-center self-align-center">
                        {
                            props.isLoading ? 
                            <>
                                 <div className="spinner-border text-white spinner-border-sm" role="status">
                                </div>
                            </> : ''
                        }
                        <span>Save</span>
                        </div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalData;