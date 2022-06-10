import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Markdown.module.scss";

const Markdown = (props: {
  loadedFileContent: string;
  setLoadedFileContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const setLoadedFileContent = props.setLoadedFileContent;
  const loadedFileContent = props.loadedFileContent;
  const [markdownData, setMarkdownData] = useState<string>(
    props.loadedFileContent
  );

  useEffect(() => {
    setLoadedFileContent(markdownData);
  }, [markdownData, setLoadedFileContent]);

  useEffect(() => {
    setMarkdownData(loadedFileContent);
  }, [setMarkdownData, loadedFileContent]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownData(event.target.value);
  };

  console.log(`inside Markdown, markdownData=${markdownData}`);

  return (
    <div className={styles.markdown}>
      <textarea value={markdownData} onChange={(e) => handleChange(e)} />
    </div>
  );
};

export default Markdown;
