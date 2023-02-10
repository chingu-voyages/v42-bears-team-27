import type { ISubject } from 'src/interfaces';
import SubjectCard from './SubjectCard';

type Props = {
  subjects: ISubject[];
};

const ClassroomSubjects: React.FC<Props> = ({ subjects }) => (
  <div sx={{ display: 'flex', justifyContent: 'center', columnGap: 5, my: 5 }}>
    {subjects.map(({ _id, ...subject }) => (
      <SubjectCard key={_id} subject={subject} />
    ))}
  </div>
);
export default ClassroomSubjects;
