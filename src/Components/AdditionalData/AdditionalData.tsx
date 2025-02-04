import { useEffect, useRef, useState } from "react";
import TextInput from "Components/Common/TextInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdditionalDataInputs } from "./../../Utils/Types";
import { useYupValidationResolver } from "Utils";
import * as yup from "yup";
import SelectInput from "../../Components/Common/SelectInput";
import ImageDropZone from "../../Components/Common/ImageDropZone";
import DecorativeHeader from "../../Components/Common/DecorativeHeader";
import { samlaIcon } from "./../../Utils/Icons";
import { useNavigate } from "react-router-dom";
import "./AdditionalData.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAdditionalField } from "./../../Redux/slice/formData";

const validationSchema = yup.object({
  department: yup.string().required("Nombres es requerido"),
  municipality: yup.string().required("Required"),
  direction: yup.string().required("Required"),
  monthlyEarns: yup.string().required("Required"),
  photos: yup.mixed().required("required"),
});

const maxNumFiles = 2;

const AdditionalData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AdditionalDataInputs>({ resolver });

  const [files, setFiles] = useState<Array<File>>([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit: SubmitHandler<AdditionalDataInputs> = (data: any) => {
    if (files.length === maxNumFiles && watch("photos") && data) {
      dispatch(setAdditionalField(data));
      navigate("/selfie");
    }
  };

  const registerInfo = useSelector((state: any) => state.form.registerInfo);

  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  useEffect(() => {
    if (!registerInfo) {
      navigate("/register");
    }
  }, [registerInfo, navigate]);

  return (
    <div className="main-container" style={{ flexDirection: "column" }}>
      <DecorativeHeader />
      <div className="content-container">
        <div className="home-data">
          <div className="side-container">
            <div className="mb-4 title-container">
              {samlaIcon}
              <h2 className="fs-3 fw-semibold">Datos de vivienda</h2>
            </div>

            <form
              ref={formRef}
              className="needs-validation"
              onSubmit={handleSubmit(onSubmit)}
            >
              <SelectInput
                label={"Departamento"}
                name="department"
                register={register}
                errors={errors}
                placeholder="Seleccionar"
                options={[
                  { value: "department1", label: "Departamento 1" },
                  { value: "department2", label: "Departamento 2" },
                  { value: "department3", label: "Departamento 3" },
                ]}
              />
              <SelectInput
                label={"Municipio"}
                name="municipality"
                register={register}
                errors={errors}
                placeholder="Seleccionar"
                options={[
                  { value: "municipio1", label: "Municipio 1" },
                  { value: "municipio2", label: "Municipio 2" },
                  { value: "municipio3", label: "Municipio 3" },
                ]}
              />
              <SelectInput
                label={"Dirección"}
                name="direction"
                register={register}
                errors={errors}
                placeholder="Seleccionar"
                options={[
                  { value: "direccion1", label: "Dirección 1" },
                  { value: "direccion2", label: "Dirección 2" },
                  { value: "direccion3", label: "Dirección 3" },
                ]}
              />

              <TextInput
                name="monthlyEarns"
                register={register}
                errors={errors}
                label="Ingresos Mensuales"
                placeholder="$0.00"
              />
            </form>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center w-50 w-md-50 drop-zone-wrapper">
          <ImageDropZone
            setFiles={(images: Array<File>) => {
              setFiles(images);
              setValue("photos", images);
            }}
            files={files}
            label="Fotografía de documento de identidad"
            maxFiles={maxNumFiles}
          />
        </div>
      </div>
      <div className="button-container">
        <button onClick={() => {}} className="btn btn-secondary mt-3">
          Cancelar
        </button>
        <button onClick={triggerSubmit} className="btn btn-primary mt-3">
          Continuar
        </button>
      </div>
    </div>
  );
};

export default AdditionalData;
