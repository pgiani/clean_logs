const assert = require('assert');
const exec = require('child_process').exec;

const logging = require("./index");
const logger = logging.logger;

let records = [];


// Utils
function getArgs(record) {
  if (record)
    return Object.keys(record).map(function (key) {
      return record[key];
    });
  return [undefined]
}

describe('logger', () => {
  describe('#setLevel', () => {

    before(() => {
      records = [];
      logging.Logging.log = (level, data) => {
        records.push(data);
      };
    })

    it('should set level and have correct behaviour', () => {
      logger.setLevel(logging.LOGGING_LEVELS.INFO);
      logger.info("Output 1");
      assert.equal(records.length, 1);
      assert.deepEqual(getArgs(records[records.length - 1]), ["Output 1"]);

      logger.setLevel(logging.LOGGING_LEVELS.ERROR);
      logger.info("Output 2");
      assert.equal(records.length, 2);
    });

  });
});
