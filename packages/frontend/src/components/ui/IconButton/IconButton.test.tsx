import { render } from 'test-utils';

import { IconButton } from './IconButton';

describe('<IconButton />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<IconButton />);
      expect(container).toMatchSnapshot();
    });
  });
});
