import { render } from 'test-utils';

import { Checkbox } from './Checkbox';

describe('<Checkbox />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Checkbox />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with label prop equals Foo', () => {
      const { container } = render(<Checkbox label="Foo" />);
      expect(container).toMatchSnapshot();
    });
  });
});
