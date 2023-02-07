// import { useContext, useState } from 'react';
// import useSWR from 'swr';
// import { MdAdd } from 'react-icons/md';

// import { fetcher } from 'src/services';
import { Button } from 'src/components/ui';
import type { IStudent } from 'src/interfaces';

type Props = {
  setForm: (form: string) => void;
  student?: IStudent | null;
};

const StudentProfileModal: React.FC<Props> = ({ setForm, student }) => (
  <div
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2em',
    }}
  >
    <p>Time Spent</p>
    <p>Points Achieved</p>
    <p>{JSON.stringify(student?.tasks)}</p>
    <Button
      onClick={() => setForm('directMessage')}
      variant="outlined"
      autoFocus
    >
      Send Message
    </Button>
  </div>
);

export default StudentProfileModal;
