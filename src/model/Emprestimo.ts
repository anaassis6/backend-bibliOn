import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um empréstimo
 */

export class Emprestimo {

    /* Atributos */
    /* Id do emprestimo */
    private idEmprestimo: number = 0;
    /* Id do aluno */
    private idAluno: number = 0;
    /* Id do livro */
    private idLivro: number = 0;
    /* Data de emprestimo do livro */
    private dataEmprestimo: Date;
    /* Data de devolução do livro */
    private dataDevolucao: Date;
    /* Status do empréstimo do livro */
    private statusEmprestimo: string;

    /**
     * Construtor da classe emprestimo
     * 
     * @param idAluno Id do aluno
     * @param idLivro Id do livro
     * @param dataEmprestimo Data do emprestimo
     * @param dataDevolucao Data de devolução do emprestimo
     * @param statusEmprestimo Status do emprestimo  
     */

    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string
    ) {
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    /* Método get e set */
    /**
     * Recupera o id do emprestimo
     * @returns o id do emprestimo
     */
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    /**
     * Atribui um valor ao id do emprestimo
     * @param idEmprestimo novo emprestimo a ser identificado
     */
    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    /**
     * Retorna o id do Aluno
     * @returns {number} O id do Aluno 
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /** 
     * Define o id do Aluno 
     * @param idAluno O id do Aluno a ser definido
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o id do Livro 
     * @returns {number} O id do Livro 
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o id do Livro 
     * @param idLivro O id do Livro a ser definido
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Retorna a data do emprestimo
     * @returns {Date} A data do emprestimo
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    /**
     * Define a data do emprestimo
     * @param dataEmprestimo A data do emprestimo a ser definido
     */
    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Retorna a data de devolucao do emprestimo
     * @returns {Date} A data de devolucao do emprestimo
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    /**
     * Define a data de devolucao do emprestimo
     * @param dataDevolucao A data de devolucao do emprestimo a ser definida
     */
    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * Retorna a status do emprestimo
     * @returns {Date} A status do emprestimo
     */
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    /**
     * Define a status do emprestimo
     * @param statusEmprestimo A status do emprestimo a ser definido
     */
    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }

    /**
      * Busca e retorna uma lista de Emprestimos do banco de dados.
      * @returns Um array de objetos do tipo `Emprestimo` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
      * 
      * - A função realiza uma consulta SQL para obter todas as informações da tabela "Emprestimo".
      * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Emprestimo`.
      * - Cada Emprestimo é adicionado a uma lista que será retornada ao final da execução.
      * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
      */
    static async listarEmprestimos(): Promise<Array<Emprestimo> | null> {
        // objeto para armazenar a lista de Emprestimos
        const listaDeEmprestimos: Array<Emprestimo> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectEmprestimo = `SELECT * FROM emprestimo;`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectEmprestimo);

            // usando a resposta para instanciar um objeto do tipo Emprestimo
            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto Emprestimo
                const novoEmprestimo = new Emprestimo(
                    linha.id_aluno,
                    linha.id_livro,
                    linha.data_emprestimo,
                    linha.data_devolucao,
                    linha.status_emprestimo
                );

                // atribui o ID objeto
                novoEmprestimo.setIdEmprestimo(linha.id_emprestimo);

                // adiciona o objeto na lista
                listaDeEmprestimos.push(novoEmprestimo);
            });

            // retorna a lista de Emprestimos
            return listaDeEmprestimos;
        } catch (error) {
            console.log('Erro ao buscar lista de Emprestimos');
            return null;
        }
    }
    /**
         * Realiza o cadastro de um Emprestimo no banco de dados.
         * 
         * Esta função recebe um objeto do tipo Emprestimo e insere seus dados (id_livro, id_aluno, data_emprestimo, data_devolucao, 
         * status_emprestimo)
         * na tabela emprestimo do banco de dados. O método retorna um valor booleano indicando se o cadastro 
         * foi realizado com sucesso.
         * @param {Emprestimo} emprestimo - Objeto contendo os dados do emprestimoVenda que será cadastrado. O objeto Emprestimo
        deve conter os métodos getIdLivro(), getIdAluno(), getDataEmprestimo(), `getDataDevolucao(), getStatusEmprestimo()
        que retornam os respectivos valores do emprestimo.
         * @returns {Promise<boolean>} - Retorna true se o Emprestimo foi cadastrado com sucesso e false caso contrário.
          Em caso de erro durante o processo, a função trata o erro e retorna false.
         * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
          no console junto com os detalhes do erro.
         */
    static async cadastroEmprestimo(emprestimo: Emprestimo): Promise<boolean> {
        try {
            // query para fazer insert de um Emprestimo no banco de dados
            const queryInsertEmprestimo = `INSERT INTO emprestimo (id_livro, id_aluno, data_emprestimo, data_devolucao, status_emprestimo)
                                    VALUES
                                    ('${emprestimo.getIdLivro()}', 
                                    '${emprestimo.getIdAluno()}',
                                    '${emprestimo.getDataEmprestimo()}',
                                    '${emprestimo.getDataDevolucao()}',
                                    '${emprestimo.getStatusEmprestimo()}')
                                    RETURNING id_emprestimo;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertEmprestimo);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Emprestimo cadastrado com sucesso! ID do Emprestimo: ${respostaBD.rows[0].id_emprestimo}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Emprestimo. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}
