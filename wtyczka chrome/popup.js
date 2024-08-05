function processSelector(selector) {
    // Usunięcie podwójnych cudzysłowów z początku i końca selektora, jeśli są obecne
    selector = selector.replace(/^"|"$/g, '');

    // Usunięcie 'document.querySelector(' na początku i zamknięcia ')'
    if (selector.startsWith('document.querySelector(')) {
        selector = selector.slice(21, -1);
    }

    // Rozdzielanie selektora na części według `.shadowRoot.querySelector`
    let parts = selector.split(/\.shadowRoot\.querySelector\(|\)/).filter(Boolean);

    // Przekształcenie każdej części na ostatnią część po ">"
    let processedParts = parts.map(part => {
        let trimmedPart = part.split('>').pop().trim();
        // Usunięcie niepotrzebnych cudzysłowów z każdej części
        return trimmedPart.replace(/^["']|["']$/g, '');
    });

    return processedParts;
}

function formatResult(parts) {
    // Formatuje tablicę na ciąg z pojedynczymi cudzysłowami
    return parts.map(part => `'${part}'`).join(', ');
}

document.getElementById('selectorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectorInput = document.getElementById('selector').value;
    const result = processSelector(selectorInput);
    const formattedResult = formatResult(result);

    document.getElementById('result').innerText = 'Result: [' + formattedResult + ']';
});
