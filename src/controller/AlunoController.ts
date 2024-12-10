import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string,
    sobrenome: string,
    dataNascimento: Date,
    endereco: string,
    email: string,
    celular: string
}

/**
 * A classe `AlunoController` estende a classe `Aluno` e é responsável por controlar as requisições relacionadas aos Alunos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "Aluno".
 * - Herdando de `Aluno`, ela pode acessar métodos e propriedades da classe base.
 */
export class AlunoController extends Aluno {

    /**
    * Lista todos os Alunos.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de Alunos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Alunos.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os Alunos e armazena o resultado
            const listaDeAlunos = await Aluno.listarAlunos();

            // retorna a lista de Alunos há quem fez a requisição web
            return res.status(200).json(listaDeAlunos);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de Alunos');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de Alunos" });
        }
    }

    /**
    * Método controller para cadastrar um novo Aluno.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um Aluno no corpo da requisição
    * e tenta cadastrar este Aluno no banco de dados utilizando a função `cadastroAluno`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do Aluno no formato `AlunoDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface AlunoDTO
            const alunoRecebido: AlunoDTO = req.body;

            // instanciando um objeto do tipo Aluno com as informações recebidas
            const novoAluno = new Aluno(alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Aluno.cadastrarAluno(novoAluno);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o Aluno. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um Aluno. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Aluno. Entre em contato com o administrador do sistema." });
        }
    }
    /**
     * Remove um Aluno do banco de dados.
     *
     * Este método recebe uma requisição HTTP contendo o ID do Aluno a ser removido,
     * chama o modelo para executar a remoção e retorna uma resposta indicando o
     * sucesso ou falha da operação.
     *
     * @param {Request} req - Objeto de requisição HTTP, contendo os parâmetros da URL.
     * @param {Response} res - Objeto de resposta HTTP para enviar os resultados da operação.
     * 
     * @returns {Promise<any>} - Retorna uma resposta HTTP com status e mensagem apropriados.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // Recupera o ID do Aluno a partir dos parâmetros da requisição e converte para número.
            const idAluno = parseInt(req.params.idAluno as string);

            // Chama o método do modelo para remover o Aluno e armazena a resposta (true ou false).
            const respostaModelo = await Aluno.removerAluno(idAluno);

            // Verifica se a resposta do modelo indica que o Aluno foi removido com sucesso.
            if (respostaModelo) {
                // Retorna uma resposta HTTP com status 200 e mensagem de sucesso.
                return res.status(200).json({ mensagem: "O Aluno foi removido com sucesso!" });
            } else {
                // Retorna uma resposta HTTP com status 400 e mensagem de erro.
                return res.status(400).json({ mensagem: "Erro ao remover o Aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Loga o erro no console para depuração.
            console.log(`Erro ao remover o Aluno: ${error}`);

            // Retorna uma resposta HTTP com status 400 e mensagem de erro genérica para o cliente.
            return res.status(400).json({ mensagem: "Não foi possível remover o Aluno. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Atualiza os dados de um Aluno no banco de dados.
     *
     * Este método recebe uma requisição HTTP contendo os dados do Aluno a ser atualizado
     * e chama o modelo para executar a atualização no banco de dados. Retorna uma resposta
     * indicando o sucesso ou falha da operação.
     *
     * @param {Request} req - Objeto de requisição HTTP, contendo o corpo da requisição e os parâmetros da URL.
     * @param {Response} res - Objeto de resposta HTTP para enviar os resultados da operação.
     * 
     * @returns {Promise<any>} - Retorna uma resposta HTTP com status e mensagem apropriados.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Recupera os dados do Aluno a serem atualizados do corpo da requisição.
            const alunoRecebido: AlunoDTO = req.body;

            // Recupera o ID do Aluno a ser atualizado a partir dos parâmetros da URL.
            const idAlunoRecebido = parseInt(req.params.idAluno as string);

            // Cria um novo objeto `Aluno` com os dados recebidos.
            const alunoAtualizado = new Aluno(alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular
            );

            // Define o ID do Aluno no objeto `AlunoAtualizado`.
            alunoAtualizado.setIdAluno(idAlunoRecebido);

            // Chama o método do modelo para atualizar o Aluno e armazena a resposta (true ou false).
            const respostaModelo = await Aluno.atualizarAluno(alunoAtualizado);

            // Verifica se a resposta do modelo indica que o Aluno foi atualizado com sucesso.
            if (respostaModelo) {
                // Retorna uma resposta HTTP com status 200 e mensagem de sucesso.
                return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
            } else {
                // Retorna uma resposta HTTP com status 400 e mensagem de erro.
                return res.status(400).json({ mensagem: "Não foi possível atualizar o Aluno. Entre em contato com o administrador." });
            }
        } catch (error) {
            // Loga o erro no console para depuração.
            console.log(`Erro ao atualizar o Aluno: ${error}`);

            // Retorna uma resposta HTTP com status 400 e mensagem de erro genérica.
            return res.status(400).json({ mensagem: "Não foi possível atualizar o Aluno. Entre em contato com o administrador." });
        }
    }

}
