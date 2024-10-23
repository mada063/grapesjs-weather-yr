# GrapesJS Weather Plugin
This plugin adds a weather block to the GrapesJS editor. It's part of a larger project to enhance web-building functionality with easy-to-use, customizable components. The weather plugin enables users to display weather information for selected locations using a dynamic iframe from Yr.no.

## About This Plugin
This GrapesJS plugin allows you to add a customizable weather widget block to your web pages. You can select different locations, and the weather information is fetched dynamically from Yr.no.

## Features
- Customizable weather block.
- Locations can be chosen dynamically from a list of Norwegian cities and towns.
- Uses Yr.no’s weather iframe to fetch and display live weather data.
- Fully integrated into the GrapesJS editor interface.
- Easy-to-use UI for selecting locations.
- Location Management: Select a location (Fylke, By, Sted) from a list of predefined options.
- Weather Display: Integrates an iframe from Yr.no that displays live weather data.
- Custom UI: The plugin provides a custom popup for selecting the location.

##How It Looks:


## Limitations
- This plugin currently supports only Norwegian locations.
- Locations are preconfigured, and the weather iframe data is fetched from Yr.no based on predefined IDs.

## How to Use the Plugin
### Install
You can install this plugin by cloning the repository from GitHub.

```
git clone https://github.com/your-username/grapesjs-weather-plugin.git
```

## Usage
### Include the Plugin in GrapesJS:
You can include this plugin by importing it if you're using a modern JavaScript setup.

Modern JavaScript
```
import grapesjs from 'grapesjs';
import weatherPlugin from 'grapesjs-weather-plugin';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container: '#gjs',
  plugins: [weatherPlugin],
});
```

### Weather Block Usage
- Add the Block: Once the plugin is installed, you can drag the weather block into your page from the GrapesJS block manager.
- Customize the Location: Click the block, and a popup will appear where you can select the location (Fylke, By, Sted).
- Save and Publish: The iframe will update with the weather information for the selected location.

## Development
To contribute or modify the plugin, follow these steps:

###Clone the Repository
```
git clone https://github.com/your-username/grapesjs-weather-plugin.git
cd grapesjs-weather-plugin
```
###Install Dependencies
```
npm install
```

###Start the Dev Server
```
npm start
```
This will start a local development server, and changes will be reflected immediately.

### Build the Plugin
```
npm run build
```
This will create the production build of the plugin in the dist folder.

## Options
The plugin can be customized by providing options when initializing it with GrapesJS.

```
const editor = grapesjs.init({
  container: '#gjs',
  plugins: ['grapesjs-weather-plugin'],
  pluginsOpts: {
    'grapesjs-weather-plugin': {
      // Add any custom options here
    }
  }
});
```

## Motivations
This plugin was developed to fill a need for dynamically displaying weather information in GrapesJS-based websites. By leveraging Yr.no’s weather service, this plugin provides a convenient solution for developers who need to display live weather data.

## Download
You can download this plugin from:

