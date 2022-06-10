import { useEffect, useState } from "react";
import { MarkdownDocument } from "../../data/DataTypes";
import styles from "./Main.module.scss";
import Markdown from "./markdown/Markdown";
import Preview from "./preview/Preview";
import ToggleMarkdownPreview from "./toggle-markdown-preview/ToggleMarkdownPreview";

const Main = (props: {
  setLoadedFile: React.Dispatch<React.SetStateAction<MarkdownDocument>>;
  loadedFile: MarkdownDocument;
}) => {
  const [togglePreview, setTogglePreview] = useState(false);
  const loadedFile = props.loadedFile;
  const [loadedFileContent, setLoadedFileContent] = useState(
    loadedFile.content
  );

  useEffect(() => {
    setLoadedFileContent(loadedFile.content);
  }, [loadedFile]);

  return (
    <main className={styles.main}>
      <ToggleMarkdownPreview
        togglePreview={togglePreview}
        setTogglePreview={setTogglePreview}
      />
      {togglePreview && (
        <Preview
          loadedFileContent={loadedFileContent}
          setLoadedFileContent={setLoadedFileContent}
        />
      )}
      {!togglePreview && (
        <Markdown
          loadedFileContent={loadedFileContent}
          setLoadedFileContent={setLoadedFileContent}
        />
      )}
    </main>
  );
};

export default Main;
