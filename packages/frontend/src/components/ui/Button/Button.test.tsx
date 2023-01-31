import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('<Button />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Button />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size prop equals lg', () => {
      const { container } = render(<Button size="lg">Foo</Button>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size prop equals sm', () => {
      const { container } = render(<Button size="sm">Foo</Button>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outlined variant', () => {
      const { container } = render(<Button variant="outlined">Foo</Button>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with rounded prop', () => {
      const { container } = render(<Button rounded>Foo</Button>);
      expect(container).toMatchSnapshot();
    });
  });

  describe('value prop', () => {
    it('should display value as Button children', () => {
      render(<Button>Foo</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Foo');
    });
  });

  describe('onClick prop', () => {
    it('should call onClick function when Button is clicked', async () => {
      const mockFn = jest.fn();
      render(<Button onClick={mockFn}>Foo</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
