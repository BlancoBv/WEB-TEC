import React, { useState, useContext } from "react";
import useGetData from "../../../../hooks/useGetData";
import Axios, { multipartHeader, urlMain } from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import Modal, { ModalBottom, ModalConfirm } from "../../../../components/Modal";
import Input, {
  InputTextArea,
  InputFile,
  InputImage,
} from "../../../../components/Input";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import PDFViewer from "../../../../components/PDFViewer";
import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";
import Tabla from "../../../../components/Tabla";
import format from "../../../../assets/format";
import Perm from "../../../../auth/Perm";

function ListaConvocatorias() {
  const [relativeData, setRelativeData] = useState({});
  const [actualizador, setActualizador] = useState(false);
  const [showModal, setShowModal] = useState({
    status: false,
    title: "",
    type: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const [bodyTitles, setBodyTitles] = useState({});
  const [bodyFiles, setBodyFiles] = useState({});

  const { showSuccess, showError } = useContext(AlertsContexts);
  const { data, isPending, error } = useGetData(
    "/convocatorias/obtener",
    actualizador
  );

  const display = (event, element) => {
    setRelativeData(element);
    show({ event });
  };

  const deleteData = async () => {
    try {
      await Axios.delete(
        `/convocatorias/eliminarxidconvocatoria/${relativeData.idconvocatoria}`
      );
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };
  const updateTitles = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `/convocatorias/actualizardatosxidconvocatoria/${relativeData.idconvocatoria}`,
        bodyTitles
      );
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };

  const updatePDF = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", bodyFiles.pdf.file);
    try {
      await Axios.put(
        `/convocatorias/actualizarpdfxidconvocatoria/${relativeData.idconvocatoria}`,
        formData,
        multipartHeader
      );
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };
  const updateImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagen", bodyFiles.imagen.file);

    try {
      await Axios.put(
        `/convocatorias/actualizarimgxidconvocatoria/${relativeData.idconvocatoria}`,
        formData,
        multipartHeader
      );
      showSuccess();
    } catch (error) {
      showError();
    }
  };

  const handle = (e, setVariable, variable) => {
    const { name, value } = e.target;
    setVariable({ ...variable, [name]: value });
  };

  const contextMenuOptions = [
    {
      content: "Editar titulo o descripción",
      icon: "fa-pen-to-square",
      action: () => {
        setBodyTitles({
          titulo: relativeData.titulo,
          fecha: relativeData.fecha,
          descripcion: relativeData.descripcion,
        });
        setShowModal({ status: true, title: "Editar titulos", type: "titles" });
      },
      show: Perm(14),
    },
    {
      content: "submenu",
      icon: "fa-file",
      label: "Editar archivos",
      subOptions: [
        {
          content: "Imagen",
          icon: "fa-image",
          action: () => {
            setBodyFiles({
              srcActual: `${urlMain}${relativeData.imagen}`,
            });
            setShowModal({
              status: true,
              title: "Editar imagen",
              type: "image",
            });
          },
        },
        {
          content: "PDF o enlace",
          icon: "fa-link",
          action: () => {
            setBodyFiles({
              srcActual: `${urlMain}${relativeData.pdf}`,
            });
            setShowModal({
              status: true,
              title: "Editar pdf o enlace",
              type: "pdf",
            });
          },
        },
      ],
      show: Perm(14),
    },

    { content: "separator", show: Perm(15) },

    {
      content: "Eliminar",
      icon: "fa-trash-can",
      style: "text-danger",
      action: () => {
        setShowConfirm(true);
      },
      show: Perm(15),
    },
  ];

  return (
    <div className="h-100 w-100 bg-dark-mode-base p-2 rounded">
      <ContextualMenu elements={contextMenuOptions} />
      <ModalConfirm
        darkMode={true}
        show={showConfirm}
        close={() => setShowConfirm(false)}
        action={deleteData}
      >
        <p>¿Realmente desea eliminar este elemento?</p>
      </ModalConfirm>
      <Modal
        title={showModal.title}
        darkMode={true}
        size={showModal.type === "titles" ? "sm" : "lg"}
        show={showModal.title}
        close={() => setShowModal({ status: false, title: "" })}
      >
        {showModal.type === "titles" && (
          <form
            className="w-100 h-100 d-flex flex-column justify-content-center align-items-center"
            onSubmit={updateTitles}
          >
            <div className="flex-grow-1 w-100">
              <ScrollbarCustom>
                <div className="w-100">
                  <Input
                    label="Titulo de la convocatoria"
                    name="titulo"
                    value={bodyTitles}
                    required={true}
                    handle={(e) => handle(e, setBodyTitles, bodyTitles)}
                  />
                </div>
                <div className="w-100 h-50 mb-3">
                  <InputTextArea
                    label="Descripción de la convocatoria"
                    name="descripcion"
                    value={bodyTitles}
                    required={true}
                    handle={(e) => handle(e, setBodyTitles, bodyTitles)}
                  />
                </div>
              </ScrollbarCustom>
            </div>
            <ModalBottom>
              <Button text="Guardar" type="submit" />
            </ModalBottom>
          </form>
        )}
        {showModal.type === "pdf" && (
          <form className="w-100 h-100 d-flex flex-column" onSubmit={updatePDF}>
            <InputFile
              label="Seleccionar archivo nuevo"
              name="pdf"
              variable={bodyFiles}
              setVariable={setBodyFiles}
              required={true}
            />
            <div className="flex-grow-1 d-flex gap-2">
              <div className="h-100 w-50 d-flex flex-column">
                <h3>Archivo actual</h3>
                <div className="flex-grow-1">
                  <ScrollbarCustom>
                    <PDFViewer url={bodyFiles.srcActual} />
                  </ScrollbarCustom>
                </div>
              </div>
              <div className="h-100 w-50 d-flex flex-column">
                <h3>Archivo Nuevo</h3>
                <div className="flex-grow-1">
                  <ScrollbarCustom>
                    {bodyFiles.hasOwnProperty("pdf") && (
                      <PDFViewer url={bodyFiles.pdf.src} />
                    )}
                  </ScrollbarCustom>
                </div>
              </div>
            </div>
            <ModalBottom>
              <Button text="Guardar" type="submit" />
            </ModalBottom>
          </form>
        )}
        {showModal.type === "image" && (
          <form
            className="w-100 h-100 d-flex flex-column"
            onSubmit={updateImage}
          >
            <InputImage
              label="Seleccionar archivo nuevo"
              name="imagen"
              variable={bodyFiles}
              setVariable={setBodyFiles}
              required={true}
            />
            <div className="flex-grow-1">
              <ScrollbarCustom>
                <div className=" d-flex gap-2">
                  <div className="h-100 w-50 d-flex flex-column">
                    <h3>Imagen actual</h3>
                    <div className="flex-grow-1">
                      <img
                        src={bodyFiles.srcActual}
                        className="image-fit"
                        width="350px"
                        height="400px"
                      />{" "}
                    </div>
                  </div>
                  <div className="h-100 w-50 d-flex flex-column">
                    <h3>Imagen nueva</h3>
                    <div className="flex-grow-1">
                      {bodyFiles.hasOwnProperty("imagen") && (
                        <img
                          src={bodyFiles.imagen.src}
                          className="image-fit"
                          width="350px"
                          height="400px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </ScrollbarCustom>
            </div>
            <ModalBottom>
              <Button text="Guardar" type="submit" />
            </ModalBottom>
          </form>
        )}
      </Modal>
      {!isPending && (
        <Success data={data.response} display={display} error={error} />
      )}
      {isPending && (
        <div className="d-flex w-100 h-100 align-items-center justify-content-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

const Success = ({ data, display, error }) => {
  const columnas = [
    {
      name: "Ultima vez actualizado",
      selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
    },
    { name: "Titulo", selector: (row) => row.titulo },
    { name: "Descripcion", selector: (row) => row.descripcion },
  ];
  console.log(data);
  return (
    <>
      <Tabla
        columnas={columnas}
        data={data}
        error={error}
        onContextAction={display}
      />
    </>
  );
};
export default ListaConvocatorias;
