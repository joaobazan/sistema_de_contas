const formulario = document.getElementById('formulario')
const campoDescricao = document.getElementById('descricao')
const campoValor = document.getElementById('valor')
const campoVencimento = document.getElementById('vencimento')
const lista = document.getElementById('lista')
const avisoVazio = document.getElementById('aviso-vazio')
const totalGeralEl = document.getElementById('total-geral')
const totalRestante = document.getElementById('total')

let gastos = carregarGastos()

function formatarDinheiro(valor) {
    return valor,toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

function textoParaNumero(texto) {
    const trocado = texto.replace(',', '.')
    const numero = Number(trocado)
    return numero
}

function formatarData(data) {
    if(!data) return 'Sem data'
    const partes = data.split('-')
    return partes[2] + '/' + partes[1]
}

function desenharLista() {
    lista.innerHTML = ''
    if (gastos.length === 0) {
        avisoVazio.style.display = 'block'
    } else {
        avisoVazio.style.display = 'none'
    }

    for (const gasto of gastos) {
        const item = document.createElement('li')
        item.className = 'item'
        if (gasto.paga) {
            item.className = 'item pago'
        }

        const botaoMarcar = document.createElement('button')
        botaoMarcar.className = 'Marcar'
        botaoMarcar.type = 'Button'
        botaoMarcar.textContent = gasto.paga ? 'ok' : ''
        botaoMarcar.title = gasto.paga ? 'Marcar como não pago' : 'Marcar como paga'

        botaoMarcar.addEventListener('click', function (){
            alternarPaga(gasto.id) })

            const info = document.createElement('div')
            info.className = 'item-info'

            const descricao = document.createElement('p')
            descricao.className = 'Item descricao'
            descricao.textContent = gasto.paga
                ? 'Pago - vence' + formatarData(gasto.vencimento)
                : 'Vence' + formatarData(gasto.vencimento)
                
            info.appendChild(descricao)
            info.appendChild(data)


            const valor = document.createElement('p')
            valor.className = 'item-valor'
            valor.textContent = formatarDinheiro(gasto.valor)
    }
}