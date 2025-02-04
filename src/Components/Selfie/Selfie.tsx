import { useState, useRef, useCallback, useEffect } from "react";

import Webcam from "react-webcam";
import DecorativeHeader from "Components/Common/DecorativeHeader";
import "./Selfie.scss";
import { cameraIcon, samlaIcon } from "Utils/Icons";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useDetectFaceMutation,
  useSelfieUploadImageMutation,
  useUploadImageMutation,
} from "Services/apiUsers";

const Selfie = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selfie, setSelfie] = useState<File | null>(null);
  const webcamRef = useRef<any>(null);

  const [uploadDocumentImage] = useUploadImageMutation();
  const [uploadSelfieImage] = useSelfieUploadImageMutation();
  const [createUser] = useCreateUserMutation();
  const [validateFaceOnPhoto] = useDetectFaceMutation();

  const toggleModal = () => setModalOpen(!modalOpen);

  const registerInfo = useSelector((state: any) => state.form.registerInfo);
  const additionalData = useSelector((state: any) => state.form.additionalData);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) return;

      // Convert base64 to file
      const byteString = atob(imageSrc.split(",")[1]); // Decode base64
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0]; // Extract MIME type

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "selfie.jpg", { type: mimeString });

      setSelfie(file); // Store file instead of base64
      // setSelfie(imageSrc);
      setModalOpen(false);
    }
  }, []);

  const handleSubmitData = async () => {
    if (selfie) {
      try {
        const res = await validateFaceOnPhoto(selfie);
        if (!res.data.validFace) return;

        // register user
        const userPayload = {
          firstName: registerInfo.firstName,
          lastName: registerInfo.lastName,
          email: registerInfo.email,
          phoneCountryCode: registerInfo.phoneCountryCode,
          telephone: registerInfo.telephone,
          idType: registerInfo.idType,
          idNumber: registerInfo.idNumber,
          department: additionalData.department,
          municipality: additionalData.municipality,
          direction: additionalData.direction,
          monthlyEarns: additionalData.monthlyEarns,
        };
        const userRes = await createUser(userPayload);
        const userId = userRes?.data?.id;
        debugger;
        await Promise.all(
          additionalData.photos?.map(async (file: any, index: number) => {
            return await uploadDocumentImage({
              file: file,
              id: userId,
              type: `document-${index}`,
            });
          })
        );
        uploadSelfieImage({
          file: selfie,
          id: userId,
        });

        setSelfie(null);
        navigate("/history");
      } catch (error) {
        console.error(error);
      }
    }
  };

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
        {selfie && (
          <div className="captured-container mt-3 text-center">
            <p>Imagen Capturada:</p>
            <img
              src={URL.createObjectURL(selfie)}
              alt="Selfie"
              className="img-fluid captured-image"
            />
          </div>
        )}

        {selfie ? (
          <div className="image-buttons-container">
            <Button
              color="secondary"
              onClick={() => {
                setSelfie(null);
                toggleModal();
              }}
              className="mt-3"
            >
              Volver a tomar Selfie
            </Button>
            <Button color="primary" onClick={handleSubmitData} className="mt-3">
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
