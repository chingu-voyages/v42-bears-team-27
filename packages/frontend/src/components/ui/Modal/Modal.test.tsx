import { render, screen } from 'test-utils';

import { Modal } from './Modal';

describe('<Modal />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Modal title="Foo" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('title prop', () => {
    it('should display text as Modal button children', () => {
      render(<Modal title="Foo" />);
      expect(screen.getByRole('button')).toHaveTextContent('Foo');
    });
  });
});
