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
  color: 'text',
  bg: 'secondary',
  borderColor: 'primary',
  '.react-calendar__navigation button': {
    color: 'text',
    '&:hover, &:focus': {
      bg: 'secondaryShade',
    },
  },
  '.react-calendar__month-view__weekdays': {
    textTransform: 'none',
    '& abbr': {
      textDecoration: 'none',
    },
  },
  '.react-calendar__month-view__days__day, .react-calendar__month-view__days__day--neighboringMonth':
    {
      color: 'text',
      '&:not(.react-calendar__tile--active):not(.react-calendar__tile--now):hover':
        {
          bg: 'secondaryShade',
        },
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
