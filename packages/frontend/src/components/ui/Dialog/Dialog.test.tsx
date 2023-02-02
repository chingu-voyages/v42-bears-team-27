import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { Dialog, DialogContent, DialogTrigger } from './Dialog';
import { Button } from '../Button';

describe('<Dialog />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Foo</Button>
          </DialogTrigger>
        </Dialog>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Dialog state', () => {
    it('should display Dialog children when state open', async () => {
      render(
        <Dialog open>
          <DialogContent title="Foo" width={320} height={480}>
            Hello, World
          </DialogContent>
        </Dialog>,
      );
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByText(/hello, world/i));
    });
  });
});
