import React, { useState } from "react";
import Input, {
  InputSwitchAction,
  InputTextArea,
} from "../../../../components/Input";

function AddMenu() {
  const [body, setBody] = useState({});
  const [submenus, setSubmenus] = useState(false);
  const [autoMainRoute, setAutoMainRoute] = useState(true);

  const handle = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
    if (document.activeElement === document.getElementById("categoria")) {
      const newValue = value
        .replace(/\s/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

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

  return (
    <div className="w-100 h-100 d-flex gap-2">
      <form
        className={`bg-dark-mode-base rounded p-2 ${
          submenus ? "w-75" : "w-100"
        } h-100 d-flex flex-column`}
        style={{ transition: "all 300ms ease-in-out " }}
      >
        <h3 className="border-bottom">Crear menú</h3>
        <Input
          label="Titulo del menú"
          placeholder="Titulo"
          handle={handle}
          name="categoria"
          value={body}
          id="categoria"
        />
        <div className="flex-grow-1">
          <InputTextArea
            label="Descripción"
            placeholder="Descripción"
            handle={handle}
            name="descripcion"
            value={body}
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
            label="¿Establecer ruta automaticamente?"
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
            return true;
          }}
          uncheckedAction={() => {
            setSubmenus(false);
            return true;
          }}
        />
      </form>
      {submenus && (
        <div
          className="flex-grow-1 h-100 d-flex flex-column"
          /* style={{
            transition: "all 300ms ease-in-out",
          }} */
        >
          <form
            className="bg-dark-mode-base rounded p-2 
           d-flex flex-column h-60 w-100"
          >
            <h4 className="border-bottom">Añadir submenus</h4>
            <Input
              label="Titulo del submenú"
              placeholder="Titulo"
              handle={handle}
              name="categoria"
              value={body}
              id="categoria"
            />
            <div className="flex-grow-1 mb-3">
              <InputTextArea
                label="Descripción"
                placeholder="Descripción"
                handle={handle}
                name="descripcion"
                value={body}
              />
            </div>

            <Input
              label="Ruta"
              placeholder="Ruta"
              handle={handleRuta}
              name="ruta"
              value={body}
              disabled={autoMainRoute}
            />

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
          </form>
        </div>
      )}
    </div>
  );
}

export default AddMenu;
