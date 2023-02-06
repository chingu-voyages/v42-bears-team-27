/* eslint-disable react/jsx-props-no-spreading */
import type { SVGAttributes } from 'react';
import { keyframes } from '@emotion/react';

const animationKeyframe = keyframes`
  0% { stroke-dashoffset: 306; }
  50% { stroke-dasharray: 40, 134; }
  100% {
    stroke-dasharray: 1, 174;
    stroke-dashoffset: 132;
  }
`;

type Props = {
  svgProps?: SVGAttributes<SVGSVGElement>;
};

const Spinner: React.FC<Props> = ({ svgProps }) => (
  <svg fill="none" viewBox="0 0 66 66" {...svgProps}>
    <circle
      sx={{ color: 'muted' }}
      cx="33"
      cy="33"
      fill="none"
      r="28"
      stroke="currentColor"
      strokeWidth={4}
    />
    <circle
      sx={{
        color: 'primary',
        animation: `${animationKeyframe} 1.4s linear infinite`,
      }}
      cx="33"
      cy="33"
      fill="none"
      r="28"
      stroke="currentColor"
      strokeDasharray="1, 174"
      strokeDashoffset="306"
      strokeLinecap="round"
      strokeWidth={4}
    />
  </svg>
);

export default Spinner;
