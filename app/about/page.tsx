import { getMarkdownContent } from '@/lib/markdown';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import styles from './about.module.css';

const About = () => {
  const content = getMarkdownContent('README.md');

  return (
    <div className={styles.container}>
      <h1>About</h1>
      <MarkdownWrapper>{content}</MarkdownWrapper>
    </div>
  );
};

export default About;
