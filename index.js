const resultsEl = document.querySelector('.results');
const colorInput = document.getElementById('color-input');
const modeList = document.getElementById('mode-list');
const btnGetColor = document.getElementById('btn-get-color');
const count = 5;


// Listen for the click on the button
btnGetColor.addEventListener('click', function() {
    const hex = colorInput.value.replace('#', '');
    const mode = modeList.value;
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors;
            // Render the function witch the array of colors
            render(colors);
        })
});


function render(colors) {
    const colorsResults = colors.map(color => {
        const hexColor = color.hex.value;

        return `
            <div style="background-color: ${hexColor}" class="output-color">
                <span class="output-hex">${hexColor}</span>
            </div>
        `;
    }).join('');
    
    resultsEl.innerHTML = colorsResults;

    // Listen for copy if so =>
    document.body.addEventListener('click', e => {
        const target = e.target;
        // Check if the click on hex code or color
        if(target.classList.contains('output-hex') || target.classList.contains('output-color')) {
            navigator.clipboard.writeText(target.textContent.trim());

            // Render the alert passing the message and the hex code
            renderAlert("You've copyied ", target.textContent);
        }
    })
}

// Show an alert when the text copyied
function renderAlert(hexMessage, hexValue) {
    document.body.style.background = hexValue;
    // Check if the alert already display if so delete => create next one
    const divEl = document.querySelector('.hex-alert');
    if(divEl) {
        divEl.remove();
    }

    // Create div
    const div = document.createElement('div');
    // Set a class to it
    div.className = 'hex-alert';
    // Append the message alongside the hex code
    div.appendChild(document.createTextNode(hexMessage + hexValue.trim()));

    // Get the parent element
    const main = document.querySelector('main');
    // Get the results color
    const results = document.querySelector('.results');
    
    // Set the alert above the colors that rendered from API
    main.insertBefore(div, results);

    // Delete the div after 1.5 second
    setTimeout(() => {
        div.remove();
    }, 1500)
}