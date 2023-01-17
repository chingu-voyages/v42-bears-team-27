/* eslint-disable react/jsx-props-no-spreading */
import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import ReactCalendar, {
  CalendarProps as ReactCalenderProps,
} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export interface CalendarProps extends ReactCalenderProps {
  sx?: ThemeUIStyleObject;
}

const resetStyles: ThemeUIStyleObject = {
  variant: 'text.link',
  borderColor: 'gray',
  '.react-calendar__month-view__weekdays': {
    textTransform: 'none',
    '& abbr': {
      textDecoration: 'none',
    },
  },
  '.react-calendar__month-view__days__day': {
    color: 'primary',
  },
  '.react-calendar__month-view__days__day--neighboringMonth': {
    color: 'gray',
  },
  '.react-calendar__month-view__days__day--weekend': {
    color: '#ff5c58',
  },
};

export const Calendar: ForwardRefExoticComponent<
CalendarProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ sx, ...rest }, ref) => (
  <ReactCalendar ref={ref} sx={{ ...resetStyles, ...sx }} {...rest} />
));

if (process.env.NODE_ENV !== 'production') {
  Calendar.displayName = 'Calendar';
}
