function processarEBaixar(tipo) {
    const texto = document.getElementById('inputDados').value;
    if (!texto.trim()) return alert("Cole os dados primeiro!");

    const linhas = texto.trim().split('\n');
    const dadosFinais = [];

    linhas.forEach(linha => {
        const colunas = linha.split('\t');
        const v1 = parseFloat(colunas[0]?.replace(',', '.')) || 0;
        const v2 = parseFloat(colunas[1]?.replace(',', '.')) || 0;

        if (tipo === 'comprimento') {
            dadosFinais.push({ "Metros": v1, "Pés (ft)": (v1 * 3.2808).toFixed(2) });
        } else if (tipo === 'peso') {
            dadosFinais.push({ "Kg": v1, "Libras (lbs)": (v1 * 2.2046).toFixed(2) });
        } else if (tipo === 'outros') {
            dadosFinais.push({ 
                "Litros": v1, "Galões": (v1 * 0.2641).toFixed(2),
                "Celsius": v2, "Fahrenheit": ((v2 * 9/5) + 32).toFixed(2)
            });
        }
    });

    const worksheet = XLSX.utils.json_to_sheet(dadosFinais);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Conversão");
    XLSX.writeFile(workbook, `Dados_Convertidos_${tipo}.xlsx`);
}