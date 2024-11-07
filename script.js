const apiKey = 'c08ec5947682be0c9237cca8';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// função que busca taxa de câmbio da API
async function getExchangeRate(deMoeda, paraMoeda){
    try{
        const response = await fetch(`${apiURL}${deMoeda}`)
        const data = await response.json();

        if(data.result === 'success'){
            return data.conversion_rates[paraMoeda];
        }else{
            throw new Error('Erro ao buscar a taxa de câmbio');
        }

    }catch(error ){
        console.error("Erro: ", error);
        return null; 
    }
}

document.getElementById('currency-form').addEventListener('submit', async function(event){
    event.preventDefault();

    const valor = parseFloat(document.getElementById('amount').value);
    const deMoeda = document.getElementById('deMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;

    //busca taxa de cambio da API
    const exchangeRate = await getExchangeRate(deMoeda, paraMoeda);
    
    if(exchangeRate){
        const convertedValue = valor * exchangeRate;

    //exibir resultado
    const conversao = document.getElementById('conversao');
    conversao.textContent = `Resultado: ${convertedValue.toFixed(2)} ${paraMoeda}`; 
    }else{
        alert('Erro ao buscar a cotação. Tente novamente')
    }

})