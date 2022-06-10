import styles from "./Header.module.scss";
import iconMenu from "../../images/icon-menu.svg";
import iconClose from "../../images/icon-close.svg";
import iconDocument from "../../images/icon-document.svg";
import iconSave from "../../images/icon-save.svg";
import iconDelete from "../../images/icon-delete.svg";
import { MarkdownDocument } from "../../data/DataTypes";

const Header = (props: {
  slideClassname: string;
  openClassname: string;
  loadedFile: MarkdownDocument;
}) => {
  const loadedFile = props.loadedFile;

  const openNav = () => {
    const mySidenav = document.getElementById("mySidenav");
    const mainContainer = document.getElementById("main-container");
    const openCloseMenu = document.getElementById("open-close-menu");

    if (mySidenav) {
      mySidenav.classList.toggle(props.openClassname);
    }

    if (mainContainer) {
      mainContainer.classList.toggle(props.slideClassname);
    }

    if (openCloseMenu) {
      openCloseMenu.classList.toggle(styles["open"]);
    }
  };

  return (
    <header>
      <div
        id="open-close-menu"
        className={styles["open-menu"]}
        onClick={openNav}
      >
        <img src={iconMenu} alt="open menu" className={styles["icon-open"]} />
        <img
          src={iconClose}
          alt="close menu"
          className={styles["icon-close"]}
        />
      </div>
      <div className={styles["document"]}>
        <img src={iconDocument} alt="document" />
        <span className={styles["filename"]}>{loadedFile.name}</span>
      </div>
      <div className={styles["delete"]}>
        <img src={iconDelete} alt="delete" />
      </div>
      <div className={styles["save"]}>
        <img src={iconSave} alt="save" />
      </div>
    </header>
  );
};

export default Header;
