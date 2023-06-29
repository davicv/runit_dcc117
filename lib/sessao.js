function isBrowser() {
    return typeof localStorage === 'object';
}


/**
 * Salva um valor na "sessão"
 * @param {string} nome Nome do campo a ser salvo
 * @param {*} dados Dados a serem salvos (qualquer tipo)
 * @returns {boolean}
 */
function set(nome, dados) {
    if (!isBrowser())
        return false;

    const name = `s_${nome}`;
    const dadosStr = JSON.stringify(dados);
    localStorage.setItem(name, dadosStr);

    return true;
}


/**
 * Carrega dados da "sessão"
 * @param {string} nome Nome do campo a ser carregado
 * @param {*} defValue Valor padrão retornado caso o campo não exista
 * @returns {*} Dados salvo ou o valor padrão
 */
function get (nome, defValue = null) {
    if (!isBrowser())
        return false;

    const name = `s_${nome}`;
    const dados = localStorage.getItem(name);
    if (typeof dados !== 'undefined' && dados !== null) {
        return JSON.parse(dados);
    } else {
        return defValue;
    }
}


const Sessao = {
    isBrowser,
    get,
    set
}

export default Sessao;
