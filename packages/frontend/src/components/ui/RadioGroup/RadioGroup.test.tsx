import { render } from 'test-utils';

import { RadioGroup, Radio } from './RadioGroup';

describe('<RadioGroup />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <RadioGroup>
          <Radio value="foo" label="Foo" />
          <Radio value="bar" label="Bar" />
          <Radio value="baz" label="Baz" />
        </RadioGroup>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
