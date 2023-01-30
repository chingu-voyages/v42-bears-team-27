import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';

describe('<Modal />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <Modal title="Foo" width={320} height={480} />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Modal state', () => {
    it('should display Modal children when state open', async () => {
      render(
        <Modal title="Foo" width={320} height={480}>
          Hello, World
        </Modal>,
      );
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByText(/hello, world/i));
    });
  });

  describe('title prop', () => {
    it('should display text as Modal button children', () => {
      render(<Modal title="Foo" width={320} height={480} />);
      expect(screen.getByRole('button')).toHaveTextContent('Foo');
    });
  });
});
