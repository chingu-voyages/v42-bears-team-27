/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';

import Loader from 'src/components/common/Loader';
import { IconButton } from 'src/components/ui';
import type { ILesson } from 'src/interfaces';
import { fetcher } from 'src/services';

type Props = {
  lessonId: string;
  onLessonEnd: () => void;
};

const LessonView: React.FC<Props> = ({ lessonId, onLessonEnd }) => {
  const { data: lessonData, isLoading } = useSWR<ILesson>(
    lessonId ? `/api/v0/material/lessons/${lessonId}` : null,
    fetcher,
  );

  const [pageIdx, setPageIdx] = useState(0);

  const currPage = useMemo(() => {
    if (!lessonData) {
      return null;
    }

    return lessonData.content.pages[pageIdx];
  }, [lessonData, pageIdx]);

  const navigatePagesHandler = (dir: -1 | 1) => {
    if (!lessonData) {
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
      if (pageIdx === lessonData.content.pages.length - 1) {
        // If on last page of lesson call appropriate handler
        onLessonEnd();
      } else {
        // Go one page forward
        setPageIdx((prevIdx) => prevIdx + 1);
      }
    }
  };

  if (!currPage || isLoading) {
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
        p: 4,
        my: 5,
        mx: 'auto',
        overflowY: 'auto',
        bg: 'muted',
        border: '2px solid',
        borderColor: 'primary',
        borderRadius: 5,
      }}
    >
      <div
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          justifyContent: 'center',
          columnGap: 3,
        }}
      >
        <h1 sx={{ variant: 'text.h2' }}>
          {lessonData?.topic}
          <span>:</span>
        </h1>

        <h2 sx={{ variant: 'text.h3' }}>{currPage.headline}</h2>
      </div>

      <div
        sx={{
          variant: 'text.h4',
          flexGrow: 1,
          maxWidth: '95%',
          width: '75ch',
          textAlign: ['center', null, 'start'],
          whiteSpace: 'pre-wrap',
          '& img': {
            display: [null, 'inline-block'],
            float: [null, null, 'left'],
            width: 'min(26rem, 95%)',
            height: 'auto',
            my: [1, null],
            mx: ['auto', 3],
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
          <MdArrowBack size={32} />
        </IconButton>
        <IconButton onClick={() => navigatePagesHandler(1)}>
          <MdArrowForward size={32} />
        </IconButton>
      </div>
    </div>
  );
};

export default LessonView;
