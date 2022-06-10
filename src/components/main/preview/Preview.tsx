import styles from "./Preview.module.scss";
import { marked } from "marked";

const Preview = (props: {
  loadedFileContent: string;
  setLoadedFileContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const parsedMarkdown = marked.parse(props.loadedFileContent);

  return (
    <div
      className={styles.preview}
      dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
    ></div>
  );
};

export default Preview;
