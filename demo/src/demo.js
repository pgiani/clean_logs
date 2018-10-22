import React, { Component } from 'react';
import { LOGGING_LEVELS, logger } from 'clean_logs';

logger.setLevel(LOGGING_LEVELS.DEBUG);

class Demo extends Component {
  render() {
    console.log(this.props, 'Demo Render');
    logger.debug('Demo Render', this.props); // No output
    return <div>Test</div>;
  }
}

export default Demo;
