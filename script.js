function processarEBaixar(tipo) {
    const texto = document.getElementById('inputDados').value;
    if (!texto.trim()) return alert("Cole os dados primeiro!");

    const linhas = texto.trim().split('\n');
    const dadosFinais = [];

    linhas.forEach(linha => {
        const colunas = linha.split('\t'); // Separa as colunas do Excel
        const valor = parseFloat(colunas[0].replace(',', '.')) || 0;
        
        let convertido, unidade;

        if (tipo === 'comprimento') {
            convertido = (valor * 3.28084).toFixed(2);
            unidade = "Pés (ft)";
        } else if (tipo === 'peso') {
            convertido = (valor * 2.20462).toFixed(2);
            unidade = "Libras (lbs)";
        }

        dadosFinais.push({ "Valor Original": valor, [unidade]: convertido });
    });

    const worksheet = XLSX.utils.json_to_sheet(dadosFinais);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Conversões");
    XLSX.writeFile(workbook, `Conversao_${tipo}.xlsx`);
}