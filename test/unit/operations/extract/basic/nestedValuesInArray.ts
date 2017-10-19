import { extract } from '../../../../../src/operations/extract';
import { Serializeable, StaticNodeId } from '../../../../../src/schema';
import { createSnapshot } from '../../../../helpers';

const { QueryRoot: QueryRootId } = StaticNodeId;

describe.skip(`operations.extract`, () => {
  describe(`nested values in an array`, () => {

    let extractResult: Serializeable.GraphSnapshot;
    beforeAll(() => {
      const snapshot = createSnapshot(
        {
          one: {
            two: [
              { three: { name: 'Gouda' } },
              { three: { name: 'Brie' } },
            ],
          },
        },
        `{ 
            one {
              two {
                three { name }
              }
            }
        }`,
      ).snapshot;

      extractResult = extract(snapshot);
    });

    it(`extracts JSON serialization object`, () => {
      expect(extractResult).to.deep.eq({
        [QueryRootId]: {
          type: Serializeable.NodeSnapshotType.EntitySnapshot,
          data: {
            one: {
              two: [
                { three: { name: 'Gouda' } },
                { three: { name: 'Brie' } },
              ],
            },
          },
        },
      });
    });

  });
});
