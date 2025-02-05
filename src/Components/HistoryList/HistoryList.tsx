import { useState } from "react";
import DecorativeHeader from "../../Components/Common/DecorativeHeader";
import { IUser, useGetAllUsersQuery } from "../../Services/apiUsers";
import { samlaIconWhite } from "../../Utils/Icons";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Pagination from "../../Components/Common/Pagination";
import "./HistoryList.scss";

const HistoryList = () => {
  const { data: users } = useGetAllUsersQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState<IUser | null>(null);
  const [currentItems, setCurrentItems] = useState<Array<IUser>>([]);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <div
      className="main-container history-list-container"
      style={{ flexDirection: "column" }}
    >
      <DecorativeHeader
        content={<div className="logo-container">{samlaIconWhite}</div>}
        className="history-header"
      />
      <div className="container mt-4">
        <h2 className="mb-4">Historial de registro</h2>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nombres y apellidos</th>
                <th scope="col">Correo electrónico</th>
                <th scope="col">Número telefónico</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {(currentItems ?? []).map((user, index) => {
                const fullName = `${user.firstName} ${user.lastName}`;
                return (
                  <tr key={index}>
                    <td>{fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.telephone}</td>
                    <td>
                      <a
                        className="text-primary cursor-pointer"
                        onClick={() => {
                          setUserSelected(user);
                          toggleModal();
                        }}
                      >
                        Ver detalle
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          items={users ?? []}
          itemsPerPage={10}
          setCurrentItems={setCurrentItems}
        />
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          centered
          className="modal-info"
        >
          <ModalHeader toggle={toggleModal}></ModalHeader>
          <ModalBody className="text-center">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="selfie-container">
                  <img
                    src={userSelected?.selfieImage}
                    alt="ID Document Front"
                    width={200}
                    height={150}
                    className="img-fluid"
                  />
                </div>
              </div>

              <div className="col-md-8 info-container">
                <p className="user-full-name">
                  {userSelected?.firstName} {userSelected?.lastName}
                </p>

                <div className="row">
                  <div className="col-md-6 info-column">
                    <div className="mb-4 info-row">
                      <label className="mb-1">Correo electrónico</label>
                      <div className="text-secondary">
                        {userSelected?.email}
                      </div>
                    </div>

                    <div className="mb-4 info-row">
                      <label className="mb-1">Número de teléfono</label>
                      <div className="text-secondary">
                        {userSelected?.telephone}
                      </div>
                    </div>

                    <div className="mb-4 info-row">
                      <label className="mb-1">Tipo de documento</label>
                      <div className="text-secondary">
                        {userSelected?.idType}
                      </div>
                    </div>

                    <div className="mb-4 info-row">
                      <label className="mb-1">Número de documento</label>
                      <div className="text-secondary">
                        {userSelected?.idNumber}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 info-column">
                    <div className="mb-4 info-row">
                      <label className="mb-1">Departamento</label>
                      <div className="text-secondary">
                        {userSelected?.department}
                      </div>
                    </div>

                    <div className="mb-4 info-row">
                      <label className="mb-1">Municipio</label>
                      <div className="text-secondary">
                        {userSelected?.municipality}
                      </div>
                    </div>

                    <div className="mb-4 info-row">
                      <label className="mb-1">Dirección</label>
                      <div className="text-secondary">
                        {userSelected?.direction}
                      </div>
                    </div>

                    <div className="mb-4 info-row">
                      <label className="mb-1">Ingresos mensuales</label>
                      <div className="text-secondary">
                        ${userSelected?.monthlyEarns}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 documents">
              <p className="text-secondary mb-3">Documento de identidad</p>
              <div className="row g-3 documents-container">
                {userSelected?.documentImageUrl?.map((image) => {
                  return (
                    <div className="col-md-6">
                      <div className="rounded text-center document-image-container">
                        <img
                          src={image}
                          alt="ID Document Front"
                          width={200}
                          height={150}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default HistoryList;
