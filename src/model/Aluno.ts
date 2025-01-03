import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um aluno
 */

export class Aluno {

    /* Atributos */
    /* Id do aluno */
    private idAluno: number = 0;
    /* ra do aluno */
    private ra: string = '';
    /* Nome do aluno */
    private nome: string;
    /* Sobrenome do aluno */
    private sobrenome: string;
    /* Data de nascimento do aluno */
    private dataNascimento: Date;
    /* email do aluno */
    private endereco: string;
    /* Email do aluno */
    private email: string;
    /* Celular do aluno */
    private celular: string;

    /**
     * Construtor da classe Aluno
     *
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço do aluno
     * @param email Email do aluno
     * @param celular Celular do aluno
     */

    constructor(
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string

    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

    /* Método get e set */
    /**
     * Recupera o id do aluno
     * @returns o id do aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui um valor ao id do aluno
     * @param idAluno novo aluno a ser identificado
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o ra do aluno
     * @returns {string} O ra do aluno
     */
    public getRa(): string {
        return this.ra;
    }

    /** 
     * Define o ra do aluno
     * @param ra O ra do aluno a ser definido
     */
    public setRa(ra: string): void {
        this.ra = ra;
    }

    /**
     * Retorna o nome do aluno
     * @returns {string} O nome do aluno
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do aluno
     * @param nome O nome do aluno a ser definido
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o sobrenome do aluno
     * @returns {string} O sobrenome do aluno
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * Define o sobrenome do aluno
     * @param sobrenome O sobrenome do aluno a ser definido
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * Retorna a data de nascimento do aluno
     * @returns {Date} A data de nascimento do aluno
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     * Define a data de nascimento do aluno
     * @param dataNascimento A data de nascimento do aluno a ser definida
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    /**
     * Retorna o endereço do aluno
     * @returns {string} O endereço do aluno
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * Define o endereço do aluno
     * @param endereco O endereço do aluno a ser definido
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
    * Retorna o email do aluno
    * @returns {string} O email do aluno
    */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o email do aluno
     * @param email O email do aluno a ser definido
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
    * Retorna o celular do aluno
    * @returns {string} O celular do aluno
    */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * Define o celular do aluno
     * @param celular O celular do aluno a ser definido
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }

    /**
    * Busca e retorna uma lista de Alunos do banco de dados.
    * @returns Um array de objetos do tipo `Aluno` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
    * 
    * - A função realiza uma consulta SQL para obter todos os registros da tabela "Aluno".
    * - Os dados retornados são utilizados para instanciar objetos da classe `Aluno`.
    * - Cada Aluno instanciado é adicionado a uma lista que será retornada ao final da execução.
    * - Se houver uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
    */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        const listaDeAlunos: Array<Aluno> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectAluno = `SELECT * FROM aluno`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectAluno);

            // usando a resposta para instanciar um objeto do tipo aluno
            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto aluno
                const novoAluno = new Aluno(
                    linha.nome,
                    linha.sobrenome,
                    linha.data_nascimento,
                    linha.endereco,
                    linha.email,
                    linha.celular
                );

                // atribui o ID objeto
                novoAluno.setIdAluno(linha.id_aluno);
                // atribui o RA objeto
                novoAluno.setRa(linha.ra);

                console.log(novoAluno);

                // adiciona o objeto na lista
                listaDeAlunos.push(novoAluno);
            });

            // retorna a lista de alunos
            return listaDeAlunos;
        } catch (error) {
            console.log('Erro ao buscar lista de Alunos');
            return null;
        }
    }

    /**
      * Realiza o cadastro de um Aluno no banco de dados.
      * 
      * Esta função recebe um objeto do tipo `Aluno` e insere seus dados (marca, modelo, ano e cor)
      * na tabela `Aluno` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
      * foi realizado com sucesso.
      * 
      * @param {Aluno} Aluno - Objeto contendo os dados do Aluno que será cadastrado. O objeto `Aluno`
      *                        deve conter os métodos `getNome()`, `getSobrenome()`, `getDataNascimento()`, `getEndereco()`, `getEmail()` e `getCelular()`
      *                        que retornam os respectivos valores do Aluno.
      * @returns {Promise<boolean>} - Retorna `true` se o Aluno foi cadastrado com sucesso e `false` caso contrário.
      *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
      * 
      * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
      *                   no console junto com os detalhes do erro.
    */
    static async cadastrarAluno(aluno: Aluno): Promise<boolean> {
        try {
            // query para fazer insert de um Aluno no banco de dados
            const queryInsertAluno = `INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                                            VALUES
                                            ('${aluno.getNome()}', 
                                            '${aluno.getSobrenome()}', 
                                            '${aluno.getDataNascimento()}',
                                            '${aluno.getEndereco()}',
                                            '${aluno.getEmail()}',
                                            '${aluno.getCelular()}')
                                            RETURNING id_aluno;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertAluno);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o aluno. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    /**
    * Remove um Aluno do banco de dados.
    * 
    * Este método recebe o ID de um Aluno e executa uma query SQL para removê-lo do banco.
    * Retorna `true` se a remoção foi bem-sucedida e `false` caso contrário.
    *
    * @param {number} idAluno - ID do Aluno a ser removido.
    * @returns {Promise<boolean>} - Retorna `true` se o Aluno foi removido com sucesso e `false` em caso de falha.
    */
    static async removerAluno(idAluno: number): Promise<boolean> {
        try {
            // Cria uma query SQL para deletar o Aluno do banco de dados baseado no ID.
            const queryDeleteAluno = `DELETE FROM Aluno WHERE id_Aluno = ${idAluno}`;

            // Executa a query no banco de dados e armazena a resposta.
            const respostaBD = await database.query(queryDeleteAluno);

            // Verifica se alguma linha foi afetada pela operação de exclusão.
            if (respostaBD.rowCount != 0) {
                // Loga uma mensagem de sucesso no console indicando que o Aluno foi removido.
                console.log(`Aluno removido com sucesso! ID removido: ${idAluno}`);
                // Retorna `true` para indicar sucesso na remoção.
                return true;
            }

            // Retorna `false` se nenhuma linha foi afetada (nenhum Aluno removido).
            return false;

        } catch (error) {
            // Exibe uma mensagem de erro no console caso ocorra uma exceção.
            console.log('Erro ao remover Aluno. Verifique os logs para mais detalhes.');
            // Loga o erro no console para depuração.
            console.log(error);
            // Retorna `false` indicando que a remoção falhou.
            return false;
        }
    }

    /**
     * Atualiza os dados de um Aluno no banco de dados.
     * 
     * Este método recebe um objeto `Aluno` contendo os novos dados e executa uma query SQL
     * para atualizar as informações no banco. Retorna `true` se a atualização foi bem-sucedida
     * e `false` caso contrário.
     *
     * @param {Aluno} aluno - Objeto contendo os dados atualizados do Aluno.
     * @returns {Promise<boolean>} - Retorna `true` se o Aluno foi atualizado com sucesso e `false` em caso de falha.
     */
    static async atualizarAluno(aluno: Aluno): Promise<boolean> {
        try {
            // Cria uma query SQL para atualizar os dados do Aluno no banco de dados.
            const queryUpdateAluno = `UPDATE Aluno SET
                                    nome = '${aluno.getNome()}',
                                    sobrenome = '${aluno.getSobrenome()}',
                                    data_nascimento = '${aluno.getDataNascimento()}',
                                    endereco = '${aluno.getEndereco()}',
                                    email = '${aluno.getEmail()}',
                                    celular = '${aluno.getCelular()}'                                        
                                  WHERE id_aluno = ${aluno.getIdAluno()};`;

            // Executa a query no banco de dados e armazena a resposta.
            const respostaBD = await database.query(queryUpdateAluno);

            // Verifica se alguma linha foi alterada pela operação de atualização.
            if (respostaBD.rowCount != 0) {
                // Loga uma mensagem de sucesso no console indicando que o Aluno foi atualizado.
                console.log(`Aluno atualizado com sucesso! ID: ${aluno.getIdAluno()}`);
                // Retorna `true` para indicar sucesso na atualização.
                return true;
            }

            // Retorna `false` se nenhuma linha foi alterada (atualização não realizada).
            return false;

        } catch (error) {
            // Exibe uma mensagem de erro no console caso ocorra uma exceção.
            console.log('Erro ao atualizar o Aluno. Verifique os logs para mais detalhes.');
            // Loga o erro no console para depuração.
            console.log(error);
            // Retorna `false` indicando que a atualização falhou.
            return false;
        }
    }
}