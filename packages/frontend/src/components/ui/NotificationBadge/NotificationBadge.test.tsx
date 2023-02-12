import { render } from 'test-utils';

import { NotificationBadge } from './NotificationBadge';

describe('<NotificationBadge />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<NotificationBadge />);
      expect(container).toMatchSnapshot();
    });
  });
});
