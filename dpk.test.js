const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  describe('when an event is not present', () => {
    it('returns the trivial key', function () {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  })
});
