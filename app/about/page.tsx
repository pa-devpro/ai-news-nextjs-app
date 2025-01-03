import { GetStaticProps } from 'next';
import { getMarkdownContent } from '@/lib/markdown';
import MarkdownWrapper from '@/components/markdown-wrapper/MarkdownWrapper';
import styles from './about.module.css';

interface AboutProps {
  content: string;
}

const About = () => {
    const content = getMarkdownContent('README.md');

  return (
    <div className={styles.container}>
      <h1>About</h1>
      <MarkdownWrapper>{content}</MarkdownWrapper>
    </div>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const content = getMarkdownContent('README.md');
//   return {
//     props: {
//       content,
//     },
//   };
// };

export default About;