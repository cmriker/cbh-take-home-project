const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  describe('when an event is present', () => {
    it('returns the partition key when present', function () {
      const partitionKey = deterministicPartitionKey({ partitionKey: 'some-key' });
      expect(partitionKey).toBe('some-key');
    });

    it('converts the partitionKey to a string if it is not one', function () {
      const event = { partitionKey: { key: 'some-key-value' } }
      const partitionKey = deterministicPartitionKey(event);
      expect(partitionKey).toBe(JSON.stringify(event.partitionKey));
    });

    it('creates a hash of the event when no partitionKey is present', function () {
      const event = { otherProperty: 'other' }
      const eventString = JSON.stringify(event);
      const partitionKey = deterministicPartitionKey(event);
      expect(partitionKey).toBe(crypto.createHash("sha3-512").update(eventString).digest("hex"));
    });

    it('hashes the partitionKey if it is too long', function () {
      const event = { partitionKey: 'some-key'.repeat(100) }
      const partitionKey = deterministicPartitionKey(event);
      expect(partitionKey).toBe(crypto.createHash("sha3-512").update(event.partitionKey).digest("hex"));
    })
  })

  describe('when an event is not present', () => {
    it('returns the trivial key', function () {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  })
});
