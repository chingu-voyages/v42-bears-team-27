import { render } from 'test-utils';

import { Progress } from './Progress';

describe('<Progress />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Progress />);
      expect(container).toMatchSnapshot();
    });
  });
});
