/* eslint-disable arrow-body-style */
import React from 'react';
import { ITopic } from 'src/interfaces';
import TopicItem from './TopicItem';

type Props = {
  topics: ITopic[];
  type: 'lesson' | 'exercise';
};

const SubjectTopics: React.FC<Props> = ({ topics, type }) => {
  return (
    <ul sx={{ listStyle: 'none' }}>
      {topics.map((topic) => {
        if (topic.types.indexOf(type) !== -1) {
          return <TopicItem key={topic._id} topic={topic} />;
        }

        return null;
      })}
    </ul>
  );
};

export default SubjectTopics;
