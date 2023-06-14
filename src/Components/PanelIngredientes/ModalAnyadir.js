import axios from 'axios';
import Alerta from 'Components/Base/Alerta';
import Snackbar from '@mui/material/Snackbar';
import { BASE_URL } from 'constant/constantes';
import { useAlert } from 'hooks/useAlert';
import { useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';

function ModalAnyadir({show,onHide, actualizar}){
    const initialIngrediente = {
        nombre: '',
        imagen: ''
    }
    const [ingredienteID,setIngredienteID] = useState(initialIngrediente);
    const { alert, handleErrorClose, mensajeConfirmacion, mensajeError  } = useAlert();
    
    //Mejoras para el futuro.

    /*const [ preview,setPreview ] = useState('');
    const handleImage = event => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp','image/avif'];

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
         
        if (file && allowedTypes.includes(file.type)){
            reader.readAsDataURL(file);
            setIngredienteID(prev => ({...prev,imagen: file}));
        }
    } */

    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            const datos = await axios.post(`${BASE_URL}/ingrediente`, ingredienteID);
            onHide();
            actualizar();
            mensajeConfirmacion(datos.data.mensaje);
            setIngredienteID(initialIngrediente);
        }catch(error){
            mensajeError(error.message);
        }

    }

    return (
        <>
        <Modal centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Ingrediente</Modal.Title>
            </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body >
                        <Row>
                            <Col xs={6}>
                                <Image src={ingredienteID.imagen} width={190} rounded />
                            </Col>
                            <Col xs={6}>
                            <Row>
                                <Form.Group controlId='formBasicEmail'>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='arroz'
                                            value={ingredienteID.nombre}
                                            onChange={(e)=> setIngredienteID(prev => ({...prev, nombre: e.target.value})) }
                                        />
                                </Form.Group>
                                <Form.Group controlId='formBasicEmail' style={{marginTop:10}}>
                                        <Form.Label>Imagen/URL</Form.Label>
                                        <Form.Control
                                        onChange={ e => setIngredienteID( prev => ({...prev, imagen: e.target.value}))}
                                        type='text'
                                        placeholder='http://arroz.webp'
                                        />
                                </Form.Group>
                            </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" style={{display:'block', margin:'0 auto'}}>Guardar</Button>
                    </Modal.Footer>
                </Form>
        </Modal>
        <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center', }}>
            <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%', alignItems:'center' }}>
                {alert.message}
            </Alerta>
        </Snackbar>
        </>
    )
}export default ModalAnyadir;