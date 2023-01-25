import { render } from 'test-utils';
import { MdMenu } from 'react-icons/md';

import { Menu } from './Menu';

describe('<Menu />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Menu icon={<MdMenu />} />);
      expect(container).toMatchSnapshot();
    });
  });
});
