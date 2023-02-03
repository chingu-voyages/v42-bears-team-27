import { render, screen } from 'test-utils';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from './AlertDialog';
import { Button } from '../Button';

describe('<AlertDialog />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Foo</Button>
          </AlertDialogTrigger>
        </AlertDialog>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('AlertDialog state', () => {
    it('should display AlertDialog children when state open', async () => {
      render(
        <AlertDialog open>
          <AlertDialogContent
            title="Foo"
            description="Foo Bar Baz"
            width={448}
            height={128}
          >
            Hello, World
          </AlertDialogContent>
        </AlertDialog>,
      );
      expect(screen.getByText(/hello, world/i));
    });
  });
});
