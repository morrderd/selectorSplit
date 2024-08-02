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
    let processedParts = parts.map(part => part.split('>').pop().trim());
  
    return processedParts;
  }
  
  // Pobieranie selektora z argumentów wiersza poleceń
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Użycie: node selectorProcessor.js "<selector>"');
    process.exit(1);
  }
  
  const selector = args[0];
  const result = processSelector(selector);
  console.log(result);
  
