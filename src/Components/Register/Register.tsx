import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import PhoneSelect from "Components/Common/PhoneSelect";
import TextInput from "Components/Common/TextInput";
import "./Register.scss";
import SelectInput from "Components/Common/SelectInput";
import { RegisterInputs } from "Utils/Types";
import { useYupValidationResolver } from "Utils";

const validationSchema = yup.object({
  firstName: yup.string().required("Nombres es requerido"),
  lastName: yup.string().required("Required"),
  email: yup.string().required("Required"),
  phoneCountryCode: yup.string().required("Required"),
  telephone: yup.string().required("Required"),
  idType: yup.string().required("Required"),
  idNumber: yup.string().required("Required"),
});

const RegistrationForm = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInputs>({ resolver });

  const onSubmit: SubmitHandler<RegisterInputs> = (data: any) =>
    console.log(data);

  return (
    <div className="main-container">
      {/* Left section with image */}
      <div className="register-background">
        <div className="register-backgroundImage"></div>
        <div className="register-left" />
        <div className="position-relative p-4 d-flex align-items-center justify-content-center h-100">
          <div className="rounded-4 overflow-hidden position-relative team-collab">
            <img
              className="image"
              src="https://www.figma.com/file/F1HCkff1yL2MRgOWslXTcE/image/36512f6c6b37477a40c72c4c8474921fde5e333c"
              alt="Team Collaboration"
            />
          </div>
        </div>
      </div>

      {/* Right section with form */}
      <div className="d-flex flex-column p-4 justify-content-center w-50 w-md-50">
        <div className="side-container">
          <div className="mb-4">
            <h1 className="fs-2 fw-bold mb-1">
              Sam<span className="text-primary">la</span>
            </h1>
            <h2 className="fs-3 fw-semibold">Registro</h2>
          </div>

          <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="firstName"
              register={register}
              errors={errors}
              label="Nombres"
              placeholder="Ingresar Nombres"
            />
            <TextInput
              name="lastName"
              register={register}
              errors={errors}
              label="Apellidos"
              placeholder="Ingresar Apellidos"
            />
            <TextInput
              name="email"
              type="email"
              register={register}
              errors={errors}
              label="Correo electrónico"
              placeholder="ejemplo@mail.com"
            />

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label small">
                Número de teléfono
              </label>
              <PhoneSelect
                selectedCountryCode={watch("phoneCountryCode")}
                phoneNumber={watch("telephone")}
                onChange={(data: {
                  countryCode: string;
                  phoneNumber: string;
                }) => {
                  setValue("telephone", data.phoneNumber);
                  setValue("phoneCountryCode", data.countryCode);
                }}
              />
            </div>

            <SelectInput
              label={"Tipo de identificacion"}
              name="idType"
              register={register}
              errors={errors}
              options={[
                { value: "dni", label: "DNI" },
                { value: "passport", label: "Pasaporte" },
                { value: "other", label: "Otro" },
              ]}
            />

            <TextInput
              name="idNumber"
              register={register}
              errors={errors}
              label="Numero de identificación"
              placeholder="0000-0"
            />

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: "#FF5C00" }}
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
