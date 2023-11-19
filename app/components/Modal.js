"use client";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalData(props) {
    const handleClose = () => props.setShow(false);

    return (
        <>
            <Modal show={props.show} onHide={handleClose}
            size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title style={{width: "95%"}}>
                        <div onClick={() => props.clickEdit(props.data.nickname)}
                            className="d-flex justify-content-between align-self-center align-items-center" style={{cursor: "pointer"}}>
                            <span>{ props.data.name }</span>
                            <span className="fw-bold" style={{fontSize: "11px", color: "blue"}}>Edit</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        props.isLoading ?
                        <>
                            <div className="d-flex justify-content-center align-self-center align-items-center" style={{minHeight: "300px"}}>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </>

                        :

                        <>
                            <div className="d-flex flex-column">
                                <div className="d-flex">
                                    <img 
                                    src={props.data.detail && props.data.detail.sprites ? props.data.detail.sprites.back_default : ''} 
                                    className="align-self-center" 
                                    alt={props.data.name}
                                    style={{width: "200px"}}
                                    onError={({currentTarget}) => {
                                        // console.log("asds");
                                        // currentTarget.onerror = null; // prevents looping
                                        // currentTarget.src="/image/default-image.png";
                                    }} />
                                    <img 
                                    src={props.data.detail && props.data.detail.sprites ? props.data.detail.sprites.front_default : ''} 
                                    className="align-self-center" 
                                    alt={props.data.name}
                                    style={{width: "200px"}}
                                    onError={({currentTarget}) => {
                                        // console.log("asds");
                                        // currentTarget.onerror = null; // prevents looping
                                        // currentTarget.src="/image/default-image.png";
                                    }} />
                                    <img 
                                    src={props.data.detail && props.data.detail.sprites ? props.data.detail.sprites.front_shiny : ''} 
                                    className="align-self-center" 
                                    alt={props.data.name}
                                    style={{width: "200px"}}
                                    onError={({currentTarget}) => {
                                        // console.log("asds");
                                        // currentTarget.onerror = null; // prevents looping
                                        // currentTarget.src="/image/default-image.png";
                                    }} />
                                    <img 
                                    src={props.data.detail && props.data.detail.sprites ? props.data.detail.sprites.back_shiny : ''} 
                                    className="align-self-center" 
                                    alt={props.data.name}
                                    style={{width: "200px"}}
                                    onError={({currentTarget}) => {
                                        // console.log("asds");
                                        // currentTarget.onerror = null; // prevents looping
                                        // currentTarget.src="/image/default-image.png";
                                    }} />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="fw-light" style={{fontSize: "13px", marginRight: "5px"}}>Moves :</span>
                                        <div className="d-flex gap-2 flex-wrap mb-2" style={{height: "100px", overflow: "scroll"}}>
                                            {
                                                props.data.detail && props.data.detail.moves && props.data.detail.moves.length > 0 ?
                                                    props.data.detail.moves.map((data, i) => {
                                                        return <div key={`move${i}`}>
                                                                <span 
                                                                    className={`mt-1 badge bg-primary d-flex align-items-center self-items-center ${i}`}
                                                                    style={{fontSize: "9px"}}>
                                                                        {data.move.name}
                                                                </span>
                                                            </div>
                                                    })
                                                :
                                                <>
                                                    -
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="fw-light" style={{fontSize: "13px", marginRight: "5px"}}>Types :</span>
                                        <div className="d-flex gap-2 flex-wrap" style={{height: "100px", overflow: "scroll"}}>
                                            {
                                                props.data.detail && props.data.detail.types && props.data.detail.types.length > 0 ?
                                                    props.data.detail.types.map((data, i) => {
                                                        return <div key={`type${i}`}>
                                                            <span 
                                                                className={`mt-1 badge bg-warning d-flex align-items-center self-items-center ${i}`}
                                                                style={{fontSize: "9px"}}>
                                                                    {data.type.name}
                                                            </span>
                                                        </div>
                                                    })
                                                :
                                                <>
                                                    -
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="fw-light" style={{fontSize: "13px", marginRight: "5px"}}>Species :</span>
                                        <div className="d-flex gap-2">
                                            {
                                                props.data.detail && props.data.detail.species ?
                                                    <span 
                                                        className={`mt-1 badge bg-warning d-flex align-items-center self-items-center`}
                                                        style={{fontSize: "9px"}} >
                                                            {props.data.detail.species.name}
                                                    </span>
                                                :
                                                <>
                                                    -
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="fw-light" style={{fontSize: "13px", marginRight: "5px"}}>Abilities :</span>
                                        <div className="d-flex gap-2 flex-wrap" style={{height: "100px", overflow: "scroll"}}>
                                            {
                                                props.data.detail && props.data.detail.abilities && props.data.detail.abilities.length > 0 ?
                                                    props.data.detail.abilities.map((data, i) => {
                                                        return <div key={`abilities${i}`}>
                                                            <span 
                                                                className={`mt-1 badge bg-warning d-flex align-items-center self-items-center ${i}`}
                                                                style={{fontSize: "9px"}}>
                                                                    {data.ability.name}
                                                            </span>
                                                        </div>
                                                    })
                                                :
                                                <>
                                                    -
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="d-flex mt-4">
                                    <span style={{fontSize: "12px"}}>Do you wanna see more details ? click here</span>
                                </div> */}
                                {
                                    props.data.is_catched == 2 ?
                                        <div className="d-flex mt-2">
                                            <span className="text-danger" style={{fontSize: "12px"}}>Pokemon Failed Catched.</span>
                                        </div> : ''
                                }
                            </div>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                   {
                    props.data.is_catched == 1 ?
                        <Button variant="success" onClick={() => props.handleRelease()} disabled={props.isLoading || props.isLoadingCatch || props.data.is_catched == 0}>
                            <div className="d-flex gap-2 align-items-center self-align-center">
                            {
                                props.isLoadingCatch ? 
                                <>
                                    <div className="spinner-border text-white spinner-border-sm" role="status">
                                    </div>
                                </> : ''
                            }
                            <span>Release Pokemon</span>
                            </div>
                        </Button>:
                        <Button variant="success" onClick={() => props.handleCatch()} disabled={props.isLoading || props.isLoadingCatch || props.data.is_catched != 0}>
                            <div className="d-flex gap-2 align-items-center self-align-center">
                            {
                                props.isLoadingCatch ? 
                                <>
                                    <div className="spinner-border text-white spinner-border-sm" role="status">
                                    </div>
                                </> : ''
                            }
                            <span>Catch Pokemon</span>
                            </div>
                        </Button>
                   }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalData;