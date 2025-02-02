import { useState, useRef, useCallback, useEffect } from "react";

import Webcam from "react-webcam";
import DecorativeHeader from "Components/Common/DecorativeHeader";
import "./Selfie.scss";
import { cameraIcon, samlaIcon } from "Utils/Icons";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Selfie = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const webcamRef = useRef<any>(null);

  const toggleModal = () => setModalOpen(!modalOpen);

  const registerInfo = useSelector((state: any) => state.form.registerInfo);
  const additionalData = useSelector((state: any) => state.form.additionalData);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current?.getScreenshot();
      debugger;
      setImage(imageSrc);
      setModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!registerInfo || !additionalData) {
      navigate("/register");
    }
  }, [registerInfo, navigate]);

  return (
    <div className="main-container selfie-container">
      <DecorativeHeader />
      <div className="main-content">
        {samlaIcon}
        {cameraIcon}
        <p className="selfie-time">¡Es hora de la selfie!</p>
        <p className="selfie-smile">
          Sonríe y asegúrate de tener buena iluminación.
        </p>
        {/* Display captured image */}
        {image && (
          <div className="captured-container mt-3 text-center">
            <p>Imagen Capturada:</p>
            <img
              src={image}
              alt="Selfie"
              className="img-fluid captured-image"
            />
          </div>
        )}

        {image ? (
          <div className="image-buttons-container">
            <Button
              color="secondary"
              onClick={() => {
                setImage(null);
                toggleModal();
              }}
              className="mt-3"
            >
              Volver a tomar Selfie
            </Button>
            <Button color="primary" onClick={() => {}} className="mt-3">
              Continuar
            </Button>
          </div>
        ) : (
          <Button color="primary" onClick={toggleModal} className="mt-3">
            Tomar Foto
          </Button>
        )}

        <Modal isOpen={modalOpen} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>Capturar Selfie</ModalHeader>
          <ModalBody className="text-center">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              className="selfie-camera"
              mirrored
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={capture}>
              Capturar
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Selfie;
