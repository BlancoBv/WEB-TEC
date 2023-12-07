import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export const { show } = useContextMenu({
  id: "context-menu-options",
});

function ContextualMenu({ elements }) {
  const SEPARATOR = "separator";
  return (
    <Menu id="context-menu-options">
      {elements.map((el, i) => {
        if (el.content === SEPARATOR) {
          return <Separator key={i} />;
        }
        if (el.content === "submenu") {
          return (
            <Submenu label={el.label} key={i}>
              {el.subOptions.map((option) => (
                <Item key={option.content} onClick={option.action}>
                  {option.content}
                </Item>
              ))}
            </Submenu>
          );
        }

        return (
          <Item onClick={el.action} key={i}>
            <span className={el.style}>
              <i className={`fa-solid ${el.icon}`} /> {el.content}
            </span>
          </Item>
        );
      })}

      {/* <Submenu label="Submenu">
          <Item onClick={handleItemClick}>Sub Item 1</Item>
          <Item onClick={handleItemClick}>Sub Item 2</Item>
        </Submenu> */}
    </Menu>
  );
}

export default ContextualMenu;
