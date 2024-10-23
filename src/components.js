import locationsData from './locations.json'

export default (editor = {}) => {
    const domComps = editor.DomComponents;
  
    domComps.addType('weather-component', {
      model: {
        defaults: {
          tagName: 'div',
          components: `
            <iframe class="weather-iframe" src="https://www.yr.no/nb/innhold/1-72837/card.html" frameborder="0" width="100%" height="250"></iframe>
          `,
          location: '1-72837', // Default location (Oslo)
        },
  
        init() {
          this.listenTo(this, 'change:location', this.updateIframe);
        },
  
        updateIframe() {
          const selectedLocation = this.get('location');
          const iframeEl = this.view.el.querySelector('iframe');
          const currentSrc = iframeEl ? iframeEl.getAttribute('src') : '';
          const newSrc = `https://www.yr.no/nb/innhold/${selectedLocation}/card.html`;
  
          if (iframeEl && currentSrc !== newSrc) {
            console.log(`Updating iframe src to: ${newSrc}`);
            iframeEl.setAttribute('src', newSrc);
          } else {
            console.log('Location is the same, no need to update iframe.');
          }
        }
      },
  
      view: {
        onRender() {
            // Create dark background overlay
          const overlay = document.createElement('div');
          overlay.className = 'overlay';
          overlay.style.display = 'none';
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100vw';
          overlay.style.height = '100vh';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Semi-transparent dark background
          overlay.style.zIndex = '999'; // Lower than the popup
          document.body.appendChild(overlay);

          // Popup container with updated styling
          const popupMenu = document.createElement('div');
          popupMenu.className = 'popup-menu';
          popupMenu.style.fontFamily = 'var(--gjs-main-font)';
          popupMenu.style.display = 'none';
          popupMenu.style.position = 'fixed';
          popupMenu.style.top = '50%';
          popupMenu.style.left = '50%';
          popupMenu.style.minWidth = '30vw'
          popupMenu.style.transform = 'translate(-50%, -50%)';
          popupMenu.style.backgroundColor = 'var(--custom-color-800)'; // New background color
          popupMenu.style.color = 'white'; // Text color
          popupMenu.style.margin = '1rem';
          popupMenu.style.borderRadius = '0.2rem'; // Rounded corners
          popupMenu.style.zIndex = '1000';
          popupMenu.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // Smooth fade and slide down
          popupMenu.style.opacity = '0';
          popupMenu.style.visibility = 'hidden';

          const showPopup = () => {
            overlay.style.display = 'block'; // Show darkened background
            popupMenu.style.display = 'block';
            setTimeout(() => {
              popupMenu.style.opacity = '1';
              popupMenu.style.visibility = 'visible';
              popupMenu.style.transform = 'translate(-50%, -50%) translateY(0)'; // Slide to normal position
            }, 10); // Small delay to allow for smooth transition
          };

          const hidePopup = () => {
            popupMenu.style.opacity = '0';
            popupMenu.style.visibility = 'hidden';
            popupMenu.style.transform = 'translate(-50%, -50%) translateY(-20px)'; // Move it back up
            overlay.style.display = 'none'; // Hide darkened background
            setTimeout(() => { popupMenu.style.display = 'none'; }, 200); // Match the duration with the transition
          };
  
          // Add header to the popup
          const header = document.createElement('h3');
          header.className = 'w-header'
          header.textContent = 'Lokasjon'; // Set header text
          header.style.textAlign = 'left'; // Center-align the text
          header.style.marginLeft = '1.5vh'
          header.style.marginBottom = '1vh'
          popupMenu.appendChild(header); // Append the header to the popup

          const darkLine = document.createElement('hr');
          darkLine.className = 'w-darkline'
          darkLine.style.border = 'none'; // Remove default border
          darkLine.style.borderTop = '1px solid rgba(0, 0, 0, 0.2)'; // Create a white line
          darkLine.style.width = '100%)'; // Set width to 80% of the popup\
          darkLine.style.marginBottom = '1vh'

          // Add 'X' button for closing
          const closeButton = document.createElement('button');
          closeButton.className = 'w-closebutton'
          closeButton.textContent = 'x';
          closeButton.style.position = 'absolute';
          closeButton.style.top = '1rem';
          closeButton.style.right = '1rem';
          closeButton.style.background = 'transparent';
          closeButton.style.border = 'none';
          closeButton.style.color = 'white';
          closeButton.style.fontSize = '1.2rem';
          closeButton.style.cursor = 'pointer';
          closeButton.style.opacity = '0.5';
          closeButton.addEventListener('click', hidePopup); // Close popup when 'X' is clicked
          popupMenu.appendChild(closeButton);

          closeButton.addEventListener('mouseover', () => {
            closeButton.style.opacity = '1';
          });
          closeButton.addEventListener('mouseout', () => {
            closeButton.style.opacity = '0.5';
          });
  
          // Create labels for the dropdowns
          const fylkeLabel = document.createElement('p');
          fylkeLabel.className = 'w-label'
          fylkeLabel.textContent = 'Fylke:';
          popupMenu.appendChild(fylkeLabel);
          fylkeLabel.style.margin = '0.5vh';
          fylkeLabel.style.marginLeft = '1.5vh';
          fylkeLabel.style.marginRight = '1.5vh';
  
          const byLabel = document.createElement('p');
          byLabel.className = 'w-label'
          byLabel.textContent = 'By:';
          popupMenu.appendChild(byLabel);
          byLabel.style.margin = '0.5vh';
          byLabel.style.marginLeft = '1.5vh';
          byLabel.style.marginRight = '1.5vh';
  
          const stedLabel = document.createElement('p');
          stedLabel.className = 'w-label'
          stedLabel.textContent = 'Sted:';
          popupMenu.appendChild(stedLabel);
          stedLabel.style.margin = '0.5vh';
          stedLabel.style.marginLeft = '1.5vh';
          stedLabel.style.marginRight = '1.5vh';
  
          
          // Create dropdown for Fylke (County)
          const fylkeSelect = document.createElement('select');
          Object.keys(locationsData.fylker).forEach(fylke => {
            const option = document.createElement('option');
            option.value = fylke;
            option.textContent = fylke.replace(/_/g, ' ');
            if (fylke === 'Oslo') {
              option.selected = true;
            }
            fylkeSelect.appendChild(option);
            fylkeSelect.className = 'w-dropdown'
            fylkeSelect.style.marginLeft = '1.5vh';
            fylkeSelect.style.marginRight = '1.5vh';
            fylkeSelect.style.padding = '0.5rem';
            fylkeSelect.style.borderRadius = '0.5rem';
          });
          
  
          // Create dropdown for By (City)
          const bySelect = document.createElement('select');
          locationsData.fylker['Oslo'].forEach(by => {
            const option = document.createElement('option');
            option.value = by;
            option.textContent = by;
            bySelect.appendChild(option);
            bySelect.className = 'w-dropdown'
            bySelect.style.marginLeft = '1.5vh';
            bySelect.style.marginRight = '1.5vh';
            bySelect.style.padding = '0.5rem';
            bySelect.style.borderRadius = '0.5rem';
          });
  
          // Create dropdown for Sted (Location)
          const stedSelect = document.createElement('select');
          locationsData.locations['Oslo'].forEach(sted => {
            const option = document.createElement('option');
            option.value = sted.value;
            option.textContent = sted.name;
            stedSelect.appendChild(option);
            stedSelect.className = 'w-dropdown'
            stedSelect.style.marginLeft = '1.5vh';
            stedSelect.style.marginRight = '1.5vh';
            stedSelect.style.padding = '0.5rem';
            stedSelect.style.borderRadius = '0.5rem';
          });

          const whiteLine = document.createElement('hr');
          whiteLine.className = 'w-whiteline'
          whiteLine.style.border = 'none'; // Remove default border
          whiteLine.style.borderTop = '1px solid white'; // Create a white line
          whiteLine.style.width = 'calc(100% - 1.5vw)'; // Set width to 80% of the popup

          const buttonContainer = document.createElement('div');
          buttonContainer.className = 'w-buttoncontainer'
          buttonContainer.style.display = 'flex';
          buttonContainer.style.justifyContent = 'flex-start'; // Center the buttons
          buttonContainer.style.marginTop = '1vh'; // Add some spacing from the dropdowns
  
          // Create Save and Cancel buttons
          const saveButton = document.createElement('input');
          saveButton.className = 'w-button'
          saveButton.type = 'button'
          saveButton.value = 'Lagre';
          saveButton.style.fontSize = '100%'
          saveButton.style.lineHeight = 'inherit'
          saveButton.style.backgroundColor = 'var(--custom-color-500)';
          saveButton.style.fontSize = '16px !important';
          saveButton.style.color = 'white';
          saveButton.style.border = 'none';
          saveButton.style.padding = '0.5rem';
          saveButton.style.borderRadius = '0.5rem';
          saveButton.style.margin = '1vh';
          saveButton.style.marginLeft = '1.5vh'
          saveButton.style.cursor = 'pointer';
          saveButton.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  
          saveButton.addEventListener('mouseover', () => {
            saveButton.style.backgroundColor = 'var(--custom-color-400)';
          });
          saveButton.addEventListener('mouseout', () => {
            saveButton.style.backgroundColor = 'var(--custom-color-500)';
          });
  
          const cancelButton = document.createElement('input');
          cancelButton.type = 'button'
          cancelButton.value = 'Avbryt';
          cancelButton.className = 'w-button'
          cancelButton.style.fontSize = '100%'
          cancelButton.style.lineHeight = 'inherit'
          cancelButton.style.backgroundColor = 'var(--custom-color-400)';
          cancelButton.style.color = 'white';
          cancelButton.style.border = 'none';
          cancelButton.style.padding = '0.5rem';
          cancelButton.style.borderRadius = '0.5rem';
          cancelButton.style.margin = '1vh'
          cancelButton.style.cursor = 'pointer';
          cancelButton.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  
          cancelButton.addEventListener('mouseover', () => {
            cancelButton.style.backgroundColor = 'var(--custom-color-400)';
          });
          cancelButton.addEventListener('mouseout', () => {
            cancelButton.style.backgroundColor = 'var(--custom-color-500)';
          });

          buttonContainer.appendChild(saveButton);
          buttonContainer.appendChild(cancelButton);
  
          // Append dropdowns and buttons to the popup menu
          popupMenu.appendChild(darkLine)
          popupMenu.appendChild(fylkeLabel);
          popupMenu.appendChild(fylkeSelect);
          popupMenu.appendChild(byLabel);
          popupMenu.appendChild(bySelect);
          popupMenu.appendChild(stedLabel);
          popupMenu.appendChild(stedSelect);
          popupMenu.appendChild(whiteLine);
          popupMenu.appendChild(buttonContainer); // Add button container instead of appending buttons directly
          document.body.appendChild(popupMenu);
  
          // Show the popup when the block is clicked
          this.el.addEventListener('click', () => {
            showPopup();
          });
  
          fylkeSelect.addEventListener('change', () => {
            bySelect.innerHTML = '';
            locationsData.fylker[fylkeSelect.value].forEach(by => {
              const option = document.createElement('option');
              option.value = by;
              option.textContent = by;
              bySelect.appendChild(option);
            });
            bySelect.dispatchEvent(new Event('change'));
          });

          bySelect.addEventListener('change', () => {
            stedSelect.innerHTML = '';
            locationsData.locations[bySelect.value].forEach(sted => {
              const option = document.createElement('option');
              option.value = sted.value;
              option.textContent = sted.name;
              stedSelect.appendChild(option);
            });
          });

          cancelButton.addEventListener('click', () => {
            hidePopup();
          });

          saveButton.addEventListener('click', () => {
            const selectedValue = stedSelect.value;
            this.model.set('location', selectedValue);
            hidePopup();
          });
        }
      }
    });
  };