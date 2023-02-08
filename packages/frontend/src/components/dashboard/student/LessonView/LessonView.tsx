/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';

import Loader from 'src/components/common/Loader';
import { IconButton } from 'src/components/ui';
import type { ILesson } from 'src/interfaces';

// const DUMMY_LESSON_DATA: ILesson = {
//   topic: 'Similes',
//   subject: '123',
//   content: {
//     _id: '1222313',
//     pages: [
//       {
//         _id: '0',
//         text: 'A **simile** is a figure of speech ![example](https://imgs.search.brave.com/ZnS1kpxSKaUqz9WDGITgyVXY4_zy3D2LI0sghuVL5iQ/rs:fit:1200:1147:1/g:ce/aHR0cHM6Ly9jZG4u/bGV2ZXJhZ2VlZHUu/Y29tL2Jsb2cvd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDkv/MTAyMDI5MDYvZXhh/bXBsZXMtb2Ytc2lt/aWxpZS5wbmc) "Figure of speech") that directly *compares* two things.^[[1]](https://en.wikipedia.org/wiki/Simile#cite_note-Bedford447-1)^^[[2]](https://en.wikipedia.org/wiki/Simile#cite_note-2)^ Similes differ from metaphors by highlighting the similarities between two things using comparison words such as "like", "as", "so", or "than",^[[3]](https://en.wikipedia.org/wiki/Simile#cite_note-3)^ while [metaphors](https://en.wikipedia.org/wiki/Metaphors "Metaphors") create an implicit comparison (i.e. saying something "*is*" something else).',
//       },
//       {
//         _id: '1',
//         text: '^[[1]](https://en.wikipedia.org/wiki/Simile#cite_note-Bedford447-1)^^[[4]](https://en.wikipedia.org/wiki/Simile#cite_note-4)^ This distinction is evident in the etymology of the words: simile derives from the Latin word *similis* ("similar, like"), while metaphor derives from the Greek word *metapherein* ("to transfer").^[[5]](https://en.wikipedia.org/wiki/Simile#cite_note-5)^ Like in the case of metaphors, the thing that is being compared is called the tenor, and the thing it is being compared to is called the vehicle.',
//       },
//     ],
//   },
// };

const LessonView = () => {
  const [lesson] = useState<ILesson>();
  const [pageIdx, setPageIdx] = useState(0);

  const currPage = useMemo(() => {
    if (!lesson) {
      return null;
    }

    return lesson.content.pages[pageIdx];
  }, [lesson, pageIdx]);

  const navigatePagesHandler = (dir: -1 | 1) => {
    if (!lesson) {
      return;
    }

    if (dir === -1) {
      if (pageIdx === 0) {
        // Check if on the first page
        return;
      }
      // Go one page backward
      setPageIdx((prevIdx) => prevIdx - 1);
    }

    if (dir === 1) {
      if (pageIdx === lesson.content.pages.length - 1) {
        // Check if on the last page
        return;
      }
      // Go one page forward
      setPageIdx((prevIdx) => prevIdx + 1);
    }
  };

  if (!currPage) {
    return <Loader>Loading Lesson...</Loader>;
  }

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '95%',
        width: '60rem',
        height: '34rem',
        p: 3,
        my: 5,
        mx: 'auto',
        overflowY: 'auto',
        bg: 'muted',
        border: '2px solid',
        borderColor: 'primary',
        borderRadius: 5,
      }}
    >
      <h2 sx={{ variant: 'text.h3' }}>{lesson?.topic}</h2>
      <div
        sx={{
          variant: 'text.h4',
          flexGrow: 1,
          maxWidth: '95%',
          width: '75ch',
          height: 'min-content',
          '& img': {
            display: 'inline-block',
            float: 'left',
            width: 'min(32rem, 100%)',
            height: 'auto',
            mx: 3,
          },
        }}
      >
        <ReactMarkdown>{currPage.text}</ReactMarkdown>
      </div>
      <div
        sx={{
          mt: 4,
          mb: 1,
          mx: 'auto',
          '& > button': {
            mx: 4,
            borderRadius: 5,
            '&:hover': {
              bg: '#c3c3c3',
            },
          },
        }}
      >
        <IconButton onClick={() => navigatePagesHandler(-1)}>
          <MdArrowBack />
        </IconButton>
        <IconButton onClick={() => navigatePagesHandler(1)}>
          <MdArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default LessonView;
