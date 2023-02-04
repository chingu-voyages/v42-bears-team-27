import { render } from 'test-utils';

import { Calendar } from './Calendar';

describe('<Calendar />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Calendar />);
      expect(container).toMatchSnapshot();
    });
  });
});
