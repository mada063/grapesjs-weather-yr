export default (editor, options = {}) => {
    editor.BlockManager.add('weather-block', {
      label: 'Værmelding',
      category: 'Ekstra',
      content: {
        type: 'weather-component',
        content: '<div class="weather-block"></div>',
      },
      attributes: { class: 'fa fa-sun-o' }, // Optional icon for the block
    });
  };
  