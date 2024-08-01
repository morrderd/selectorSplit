const process = require('process');

function processSelector(selector) {
    const parts = selector.split('.shadowRoot.querySelector');
    
    let initialSelector = parts[0];
    let finalSelector = parts[1];
    
    initialSelector = initialSelector.replace(/document.querySelector\(|["()]/g, '').trim();
    finalSelector = finalSelector.replace(/["()]/g, '').trim();

    const initialElements = initialSelector.split(' > ');
    const finalElements = finalSelector.split(' > ');

    const processedInitialElements = initialElements.filter(element => {
        return !element.startsWith('#') && !element.includes('div');
    });

    const processedFinalElements = finalElements.filter(element => {
        return !element.includes('div');
    });

    const result = [...processedInitialElements, ...processedFinalElements];

    return result;
}

const selector = process.argv[2];

if (!selector) {
    console.error('Proszę podać selektor jako argument.');
    process.exit(1);
}

const result = processSelector(selector);

console.log(result);
