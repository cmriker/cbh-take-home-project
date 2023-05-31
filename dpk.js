const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let partitionKey = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
      partitionKey = event.partitionKey;
      if (typeof partitionKey !== "string") {
        partitionKey = JSON.stringify(partitionKey);
      }
    } else {
      const data = JSON.stringify(event);
      return crypto.createHash("sha3-512").update(data).digest("hex");
    }

    if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
      return crypto.createHash("sha3-512").update(partitionKey).digest("hex");
    }
  }

  return partitionKey;
};
