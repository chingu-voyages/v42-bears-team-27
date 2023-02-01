import { render, screen } from 'test-utils';

import { TextField, TextFieldArea } from './TextField';

describe('<TextField />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<TextField label="Foo" />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when rendered as textarea', () => {
      const { container } = render(<TextFieldArea label="Foo" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('label prop', () => {
    it('should display label as TextField label text', () => {
      render(<TextField id="foo" label="Foo" />);
      expect(screen.getByLabelText('Foo'));
    });
  });
});
