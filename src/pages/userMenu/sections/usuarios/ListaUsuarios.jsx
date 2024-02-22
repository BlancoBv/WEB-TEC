import React, { useState } from "react";
import Modal, { ModalBottom } from "../../../../components/Modal";
import Input, { InputSelect } from "../../../../components/Input";
import Button from "../../../../components/Button";

function ListaUsuarios() {
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState({});
  const handle = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="h-100 w-100 ">
      <Modal
        title="Añadir usuario"
        show={showModal}
        close={() => setShowModal(false)}
        size="md"
      >
        <form className="d-flex flex-column w-100 h-100">
          <div className="flex-grow-1">
            <Input label="Nombre de usuario" placeholder="Administrador@1" />
            <Input label="Nombres" placeholder="Juan" />
            <Input label="Apellido Paterno" />
            <Input label="Apellido Materno" />
            <Input label="Contraseña" />
            {/*  <InputSelect /> */}
          </div>
          <ModalBottom>
            <Button text="Guardar" />
          </ModalBottom>
        </form>
      </Modal>
      <div className="h-10">
        <span
          className="h-100 fit-content-width d-flex align-items-center gap-2 "
          role="button"
          title="Añadir etiqueta"
          onClick={() =>
            setShowModal({
              status: true,
              title: "Añadir etiqueta",
              type: "add",
            })
          }
        >
          <i className="fa-solid fa-square-plus fs-1" /> Añadir etiqueta
        </span>
      </div>
      <div className="bg-dark-mode-base rounded p-2 h-90">Proximamente</div>
    </div>
  );
}

export default ListaUsuarios;
