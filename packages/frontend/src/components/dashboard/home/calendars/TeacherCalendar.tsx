/* eslint-disable react/jsx-props-no-spreading */
import { Calendar, type CalendarProps } from '../../../UI';

type Props = CalendarProps;

const TeacherCalendar: React.FC<Props> = ({ sx, ...props }) => (
  <div
    sx={{
      display: ['block', null, 'inline-block'],
      ml: [null, null, 4],
      mx: 'auto',
      ...sx,
    }}
  >
    <Calendar sx={{ width: [448, null, null, 520] }} {...props} />
  </div>
);

export default TeacherCalendar;
