import styles from "./MarkdownWrapper.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

interface Props {
  children: string;
}
const MarkdownWrapper = ({ children }: Props) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.MarkdownWrapper}>{children}</ReactMarkdown>;
};

export default MarkdownWrapper;