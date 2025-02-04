import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import PhoneSelect from "./../../Components/Common/PhoneSelect";
import TextInput from "./../../Components/Common/TextInput";
import "./Register.scss";
import SelectInput from "./../../Components/Common/SelectInput";
import { RegisterInputs } from "./../../Utils/Types";
import { useYupValidationResolver } from "./../../Utils";
import { samlaIcon } from "./../../Utils/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterInfo } from "../../Redux/slice/formData";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  firstName: yup.string().required("Campo requerido"),
  lastName: yup.string().required("Campo requerido"),
  email: yup.string().required("Campo requerido"),
  phoneCountryCode: yup.string().required("Campo requerido"),
  telephone: yup
    .string()
    .test(
      "min-length",
      "El número de teléfono debe tener al menos 7 digitos",
      function (value) {
        const { phoneCountryCode } = this.parent;
        if (!value || !phoneCountryCode) return false;

        return value.length - phoneCountryCode.length >= 7;
      }
    )
    .required("Required"),
  idType: yup.string().required("Campo requerido"),
  idNumber: yup.string().required("Campo requerido"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(validationSchema);
  const registerInfo = useSelector((state: any) => state.form.registerInfo);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInputs>({
    resolver,
    defaultValues: {
      firstName: registerInfo?.firstName || "",
      lastName: registerInfo?.lastName,
      email: registerInfo?.email,
      phoneCountryCode: registerInfo?.phoneCountryCode,
      telephone: `${registerInfo?.phoneCountryCode}${registerInfo?.telephone}`,
      idType: registerInfo?.idType,
      idNumber: registerInfo?.idNumber,
    },
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<RegisterInputs> = (data: any) => {
    const dialCode = watch("phoneCountryCode") || "";
    const telephone = watch("telephone");

    // Remove the dial code from the phone number
    const localNumber = telephone.startsWith(dialCode)
      ? telephone.slice(dialCode.length)
      : telephone;
    dispatch(setRegisterInfo({ ...data, telephone: localNumber }));
    navigate("/additionalData");
  };

  return (
    <div className="main-container register-main-container">
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
      <div className="d-flex flex-column p-4 justify-content-center w-50 w-md-50 main-info-container">
        <div className="side-container">
          <div className="mb-4 blue-white-logo-container">
            {samlaIcon}
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
              <label
                htmlFor="telefono"
                className={`form-label small ${
                  errors?.["telephone"] ? "text-danger" : ""
                }`}
              >
                Número de teléfono
              </label>
              <PhoneSelect
                selectedCountryCode={watch("phoneCountryCode")}
                phoneNumber={watch("telephone")}
                onChange={(data: {
                  countryCode: string;
                  phoneNumber: string;
                }) => {
                  setValue("phoneCountryCode", data.countryCode);
                  setValue("telephone", data.phoneNumber);
                }}
                hasError={!!errors?.["telephone"]}
              />
              {errors?.["telephone"] && (
                <p className="errorMessage">{errors?.["telephone"].message}</p>
              )}
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
