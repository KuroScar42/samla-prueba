import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import DecorativeHeader from "Components/Common/DecorativeHeader";
import { cameraIcon, samlaIcon } from "Utils/Icons";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useDetectFaceMutation,
  useSelfieUploadImageMutation,
  useUploadImageMutation,
} from "./../../Services/apiUsers";
import Spinner from "./../../Components/Common/Spinner";
import { resetForm } from "./../../Redux/slice/formData";
import "./Selfie.scss";
import MobileCornerButton from "Components/Common/MobileCornerButton";

const videoConstraints = {
  width: 1920, // Set to maximum supported resolution
  height: 1080,
  facingMode: "user", // Ensures front camera for selfies
};

const Selfie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidFace, setIsInvalidFace] = useState(false);
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

      setSelfie(file);
      setModalOpen(false);
    }
  }, []);

  const handleSubmitData = async () => {
    if (selfie) {
      setIsLoading(true);
      try {
        const res = await validateFaceOnPhoto(selfie);
        if (!res.data.validFace) {
          setIsInvalidFace(true);
          return;
        }
        setIsInvalidFace(false);

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

        // testing a possible issue when uploading several images at the same time
        // ->'Memory limit of 256 MiB exceeded with 259 MiB used. Consider increasing the memory limit, see https://cloud.google.com/functions/docs/configuring/memory

        const imageDocument1 = await uploadDocumentImage({
          file: additionalData.photos?.[0],
          id: userId,
          type: `document-${0}`,
        });
        const imageDocument2 = await uploadDocumentImage({
          file: additionalData.photos?.[1],
          id: userId,
          type: `document-${1}`,
        });

        // await Promise.all(
        //   additionalData.photos?.map(async (file: any, index: number) => {
        //     return await uploadDocumentImage({
        //       file: file,
        //       id: userId,
        //       type: `document-${index}`,
        //     });
        //   })
        // );

        await uploadSelfieImage({
          file: selfie,
          id: userId,
        });

        dispatch(resetForm());
        setSelfie(null);
        navigate("/history");
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const goToAdditionalData = () => {
    navigate("/additionalData");
  };

  useEffect(() => {
    if (!registerInfo || !additionalData) {
      navigate("/register");
    }
  }, [registerInfo, additionalData, navigate]);

  return (
    <div className="main-container selfie-container">
      <DecorativeHeader />
      {isLoading && (
        <div className="loading-info">
          <Spinner label={"Guardando información del usuario"}></Spinner>
        </div>
      )}
      <div className="main-content">
        <MobileCornerButton onClick={goToAdditionalData} />
        <div className="icon-samla">{samlaIcon}</div>
        <div className="icon-camera">{cameraIcon}</div>
        <div className={`description-container ${selfie ? "m-0" : ""}`}>
          <p className="selfie-time">¡Es hora de la selfie!</p>
          <p className="selfie-smile">
            Sonríe y asegúrate de tener buena iluminación.
          </p>
        </div>

        {selfie && (
          <div className="captured-container mt-3 text-center">
            {isInvalidFace && (
              <p className="danger-text">
                La foto tomada no parece tener un rostro. Por favor revisa que
                las condiciones de luz del ambiente sean optimas y recuerda
                mirar a la camara.
              </p>
            )}
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
          <div className="take-photo-container">
            <Button color="primary" onClick={toggleModal} className="mt-3">
              Tomar Foto
            </Button>
          </div>
        )}

        <Modal isOpen={modalOpen} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>Capturar Selfie</ModalHeader>
          <ModalBody className="text-center">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={1.0}
              width="100%"
              className="selfie-camera"
              mirrored
              videoConstraints={videoConstraints}
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
