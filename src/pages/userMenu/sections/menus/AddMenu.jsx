import React, { useContext, useState } from "react";
import Input, {
  InputSwitchAction,
  InputTextArea,
} from "../../../../components/Input";
import Axios from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";
import format from "../../../../assets/format";

function AddMenu() {
  const [body, setBody] = useState({});
  const [submenus, setSubmenus] = useState(false);
  const [autoMainRoute, setAutoMainRoute] = useState(true);
  const { showSuccess, showError } = useContext(AlertsContexts);

  const handle = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
    if (
      document.activeElement === document.getElementById("categoria") &&
      !submenus
    ) {
      const newValue = format.formatRoute(value);
      setBody((prev) => ({ ...prev, ruta: newValue }));
    }
  };

  const handleRuta = (e) => {
    const { name, value } = e.target;
    const newValue = value
      .replace(/\s/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    setBody({ ...body, [name]: newValue });
  };
  console.log(body);
  const save = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/categorias/crear", body);
      showSuccess();
    } catch (error) {
      showError();
    }
  };

  return (
    <div className="w-100 h-100 d-flex gap-2">
      <form
        className="bg-dark-mode-base rounded p-2 h-100 w-100 d-flex flex-column"
        onSubmit={save}
      >
        <h3 className="border-bottom">Crear menú</h3>
        <Input
          label="Titulo del menú"
          placeholder="Titulo"
          handle={handle}
          name="categoria"
          value={body}
          id="categoria"
          required={true}
        />
        <div className="flex-grow-1">
          <InputTextArea
            label="Descripción"
            placeholder="Descripción"
            handle={handle}
            name="descripcion"
            value={body}
            required={true}
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="flex-grow-1">
            <Input
              label="Ruta"
              placeholder="Ruta"
              handle={handleRuta}
              name="ruta"
              value={body}
              disabled={autoMainRoute}
            />
          </div>
          <InputSwitchAction
            label="Ruta automatica"
            initialChecked={autoMainRoute}
            checkedAction={() => {
              setAutoMainRoute(true);
              return true;
            }}
            uncheckedAction={() => {
              setAutoMainRoute(false);
              return true;
            }}
          />
        </div>
        <InputSwitchAction
          label="¿Este menú tendrá submenus?"
          initialChecked={submenus}
          checkedAction={() => {
            setSubmenus(true);
            setBody((prev) => {
              delete prev.ruta;
              return prev;
            });
            return true;
          }}
          uncheckedAction={() => {
            setSubmenus(false);
            setBody((prev) => ({
              ...prev,
              ruta: format.formatRoute(prev.categoria),
            }));
            return true;
          }}
        />
        <button className="mx-auto" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default AddMenu;