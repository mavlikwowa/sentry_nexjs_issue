import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import config from './next.config';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.env = Object.assign(process.env, { ...config().env });

Enzyme.configure({ adapter: new Adapter() });

/** для всех тестов фиксируем uuid, для работы snapshots */
jest.mock('nanoid', () => {
  return {
    nanoid: jest.fn(() => 1),
  };
});
