import { render, screen, waitFor } from 'test-utils';

import { Avatar } from './Avatar';

describe('<Avatar />', () => {
  describe('alt prop', () => {
    it('should display alt as Avatar children', async () => {
      render(<Avatar alt="Foo" />);
      await waitFor(() => expect(screen.getByText('Foo')));
    });
  });
});
