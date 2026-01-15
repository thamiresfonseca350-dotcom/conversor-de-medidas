function processarEBaixar(tipo) {
    const texto = document.getElementById('inputDados').value;
    
    // Verifica se o campo não está vazio
    if (!texto.trim()) {
        return alert("Por favor, cole os dados do Excel antes de converter.");
    }

    const linhas = texto.trim().split('\n');
    const dadosFinais = [];

    linhas.forEach(linha => {
        // CORREÇÃO: Divide a linha pelo caractere de tabulação (\t) do Excel
        const colunas = linha.split('\t'); 
        
        // v1 captura a primeira coluna (ex: Metros), v2 captura a segunda (ex: Kg)
        // Tratamos vírgulas como pontos para garantir o cálculo matemático
        const v1 = parseFloat(colunas[0]?.replace(',', '.')) || 0;
        const v2 = parseFloat(colunas[1]?.replace(',', '.')) || 0;

        if (tipo === 'comprimento') {
            dadosFinais.push({ 
                "Metros": v1, 
                "Pés (ft)": (v1 * 3.2808).toFixed(2) 
            });
        } else if (tipo === 'peso') {
            dadosFinais.push({ 
                "Kg": v1, 
                "Libras (lbs)": (v1 * 2.2046).toFixed(2) 
            });
        } else if (tipo === 'outros') {
            dadosFinais.push({ 
                "Litros": v1, 
                "Galões": (v1 * 0.2641).toFixed(2),
                "Celsius": v2, 
                "Fahrenheit": ((v2 * 9/5) + 32).toFixed(2)
            });
        }
    });

    // Geração do arquivo Excel usando a biblioteca SheetJS
    const worksheet = XLSX.utils.json_to_sheet(dadosFinais);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Conversão");

    // Inicia o download do arquivo com o nome do tipo selecionado
    XLSX.writeFile(workbook, `Dados_Convertidos_${tipo}.xlsx`);
    
    // Opcional: Mostra a mensagem de sucesso se o elemento existir
    const resultadoMsg = document.getElementById('resultado');
    if (resultadoMsg) {
        resultadoMsg.classList.remove('hidden');
    }
}