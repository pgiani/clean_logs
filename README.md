**console-logging**

A wrapper around usual console.log() - This is a utility that I want to use along my frontend projects where I need to include logs for debugging and can easily turn them on/off by setting the logging level.

## Usage

```
const logging = require("console-logging");
const logger = logging.logger;
```

or ES6 import
```
import {LOGGING_LEVELS, logger } from 'console-logging';
```

The use case of logger.setLevel() is in production environment, just switch on/off the logger and you have extra debug logs!
So remember to include logger.xyz() during app development.

```
logger.setLevel(logging.LOGGING_LEVELS.CRITICAL)
logger.setLevel("CRITICAL")  // Supports string levels: DEBUG, INFO, WARNING, ERROR, CRITICAL

// or get level from environment variable
logger.setLevel(process.env.LOGGING_LEVEL)  // process.env.LOGGING_LEVEL = "DEBUG|INFO|WARNING|ERROR|CRITICAL"

logger.error("Transaction fail, transaction id 1")  // No output

logger.setLevel(logging.LOGGING_LEVELS.ERROR)
logger.error("Transaction fail, transaction id 1")  // Output 'Transaction fail, transaction id 1'

// multi-args is supported
logger.error("Hi", "I am", "an error")  // Output 'Hi I am an error'

```

