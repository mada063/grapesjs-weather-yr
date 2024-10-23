import blockManager from './blocks';
import componentManager from './components';

export default (editor, opts = {}) => {
  // Plugin options can be passed here
  const options = {
    ...{
      // default options
    },
    ...opts,
  };

  // Initialize block and component
  blockManager(editor, options);
  componentManager(editor, options);
};
