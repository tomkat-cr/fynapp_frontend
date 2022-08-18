import React,{useState} from 'react';
import { Modal, Button } from "react-bootstrap";
// import {HOSTNAME} from './environment';
export const HOSTNAME="localhost";

export default function LinkWrapper({link}) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = new URL(link)
    // console.log('LinkWrapper | url:');
    // console.log(url);
    // console.log('HOSTNAME: ' + HOSTNAME);
    if (url.hostname === HOSTNAME ) return <a target="_blank" rel="noreferrer" href={link}>{link}</a>
    else
    return (
      <>
        <br/>
        <div/>
        <Button variant="primary" onClick={handleShow}>
          Open Link
        </Button>
        <spam>   </spam>
        <Button variant="primary" onClick={handleShow}>
          Open Link 2
        </Button>
        <spam>   </spam>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Title>Link Popup</Modal.Title>
            <Modal.Body><iframe src={link} style={{width:'100%',height:'400px'}}/></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }