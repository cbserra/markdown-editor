import { useState } from "react";
import styles from "./App.module.scss";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";
import data from "./data/data.json";
import { MarkdownDocument } from "./data/DataTypes";

function App() {
  const importedData: MarkdownDocument[] = data;

  const [openClassname, setOpenClassname] = useState("");
  const [loadedFile, setLoadedFile] = useState<MarkdownDocument>(
    importedData[0]
  );
  const slideClassname = styles.slide;

  return (
    <div className={styles.App}>
      <Sidebar
        setOpenClassname={setOpenClassname}
        data={importedData}
        setLoadedFile={setLoadedFile}
      />
      <div id="main-container" className={styles["main-container"]}>
        <Header
          slideClassname={slideClassname}
          openClassname={openClassname}
          loadedFile={loadedFile}
        />
        <Main setLoadedFile={setLoadedFile} loadedFile={loadedFile} />
      </div>
    </div>
  );
}

export default App;
