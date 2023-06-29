export default class ApiDados {
    constructor(nomeTabela) {
        this.nomeTabela = nomeTabela;
    }

    isBrowser() {
        return typeof localStorage === 'object';
    }
    
    getTabela() {
        let tabela;
        try {
            let str = localStorage.getItem(this.nomeTabela);
            tabela = JSON.parse(str);
        } catch(err) {
            tabela = null;
        }
    
        if (!tabela) {
            tabela = {
                name: this.nomeTabela,
                maxId: 0,
                list: []
            }
        }
    
        return tabela;
    }
    
    setTabela(tabela) {
        if (this.isBrowser()) {
            localStorage.setItem(this.nomeTabela, JSON.stringify(tabela));
        }
    }
    
    
    /**
     * Retorna o  registro de uma tabela
     * @param {number} id id do registro
     * @returns {object} dados do registro em forma de um objeto
     */
    get(id) {
        const tabela = this.getTabela();
        id = parseInt(id) || -1;
        return tabela.list.find(item => item.id === id);
    }
    
    
    /**
     * Cria um novo registro
     * @param {object} dados Dados do registro (em forma de um objeto, ex: { nome: 'joao', idade: '123' })
     * @returns {number} id do registro
     */
    add(dados) {
        const tabela = this.getTabela();
        dados.id = ++tabela.maxId;
        tabela.list.push(dados);
        this.setTabela(tabela);
        return dados.id;
    }
    
    
    /**
     * Atualiza um registro
     * @param {number} id id do registro
     * @param {object} dados Dados do registro (em forma de um objeto, ex: { nome: 'joao', idade: '123' })
     * @returns {boolean} retorna true se o registro foi encontrado e atualizado
     */
    set(id, dados) {
        const tabela = this.getTabela();
    
        id = parseInt(id) || -1;
        const idx = tabela.list.findIndex(item => item.id === id);
    
        if (idx >= 0) {
            tabela.list[idx] = {...tabela.list[idx], ...dados};
            this.setTabela(tabela);
            return true;
        }
        return false;
    }
    
    
    /**
     * Remove um registro da tabela
     * @param {number} id id do registro
     * @returns {boolean} status da exclusão do registro
     */
    remove(id) {
        const tabela = this.getTabela();
        const idx = tabela.list.indexOf(item => item.id == id);
        if (idx >= 0) {
            tabela.list.splice(idx, 1);
            this.setTabela(tabela);
            return true;
        }
        return false;
    }
    
    
    /**
     * Lista todos os registros de um tabela
     * @returns {[Object]} um array com todos os registros
     */
    list() {
        const tabela = this.getTabela();
        return tabela.list;
    }
}
