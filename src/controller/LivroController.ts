import { Request, Response } from "express";
import { Livro } from "../model/Livro";

interface LivroDTO {
    titulo: string,
    autor: string,
    editora: string,
    anoPublicacao: string,
    isbn: string,
    quantTotal: number,
    quantDisponivel: number,
    valorAquisicao: number,
    statusLivroEmprestado: string
}

/**
 * A classe `LivroController` estende a classe `Livro` e é responsável por controlar as requisições relacionadas aos Livros.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "Livro".
 * - Herdando de `Livro`, ela pode acessar métodos e propriedades da classe base.
 */
export class LivroController extends Livro {

    /**
    * Lista todos os Livros.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de Livros em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Livros.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os Livros e armazena o resultado
            const listaDeLivros = await Livro.listarLivros();

            // retorna a lista de Livros há quem fez a requisição web
            return res.status(200).json(listaDeLivros);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de Livros');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de Livros" });
        }
    }

    /**
    * Método controller para cadastrar um novo Livro.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um Livro no corpo da requisição
    * e tenta cadastrar este Livro no banco de dados utilizando a função `cadastroLivro`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do Livro no formato `LivroDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface LivroDTO
            const livroRecebido: LivroDTO = req.body;

            // instanciando um objeto do tipo Livro com as informações recebidas
            const novoLivro = new Livro(livroRecebido.titulo,
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.anoPublicacao,
                livroRecebido.isbn,
                livroRecebido.quantTotal,
                livroRecebido.quantDisponivel,
                livroRecebido.valorAquisicao,
                livroRecebido.statusLivroEmprestado);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Livro.cadastrarLivro(novoLivro);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o Livro. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um Livro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Livro. Entre em contato com o administrador do sistema." });
        }
    }
    /**
     * Remove um Livro do banco de dados.
     *
     * Este método recebe uma requisição HTTP contendo o ID do Livro a ser removido,
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
            // Recupera o ID do Livro a partir dos parâmetros da requisição e converte para número.
            const idLivro = parseInt(req.params.idLivro as string);

            // Chama o método do modelo para remover o Livro e armazena a resposta (true ou false).
            const respostaModelo = await Livro.removerLivro(idLivro);

            // Verifica se a resposta do modelo indica que o Livro foi removido com sucesso.
            if (respostaModelo) {
                // Retorna uma resposta HTTP com status 200 e mensagem de sucesso.
                return res.status(200).json({ mensagem: "O Livro foi removido com sucesso!" });
            } else {
                // Retorna uma resposta HTTP com status 400 e mensagem de erro.
                return res.status(400).json({ mensagem: "Erro ao remover o Livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Loga o erro no console para depuração.
            console.log(`Erro ao remover o Livro: ${error}`);

            // Retorna uma resposta HTTP com status 400 e mensagem de erro genérica para o cliente.
            return res.status(400).json({ mensagem: "Não foi possível remover o Livro. Entre em contato com o administrador do sistema." });
        }
    }

    /**
    * Atualiza os dados de um Livro no banco de dados.
    *
    * Este método recebe uma requisição HTTP contendo os dados do Livro a ser atualizado
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
            // Recupera os dados do Livro a serem atualizados do corpo da requisição.
            const livroRecebido: LivroDTO = req.body;

            // Recupera o ID do Livro a ser atualizado a partir dos parâmetros da URL.
            const idLivroRecebido = parseInt(req.params.idLivro as string);

            // Cria um novo objeto `Livro` com os dados recebidos.
            const livroAtualizado = new Livro(livroRecebido.titulo,
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.anoPublicacao,
                livroRecebido.isbn,
                livroRecebido.quantTotal,
                livroRecebido.quantDisponivel,
                livroRecebido.valorAquisicao,
                livroRecebido.statusLivroEmprestado
            );

            // Define o ID do Livro no objeto `livroAtualizado`.
            livroAtualizado.setIdLivro(idLivroRecebido);

            // Chama o método do modelo para atualizar o Livro e armazena a resposta (true ou false).
            const respostaModelo = await Livro.atualizarLivro(livroAtualizado);

            // Verifica se a resposta do modelo indica que o Livro foi atualizado com sucesso.
            if (respostaModelo) {
                // Retorna uma resposta HTTP com status 200 e mensagem de sucesso.
                return res.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
            } else {
                // Retorna uma resposta HTTP com status 400 e mensagem de erro.
                return res.status(400).json({ mensagem: "Não foi possível atualizar o Livro. Entre em contato com o administrador." });
            }
        } catch (error) {
            // Loga o erro no console para depuração.
            console.log(`Erro ao atualizar o Livro: ${error}`);

            // Retorna uma resposta HTTP com status 400 e mensagem de erro genérica.
            return res.status(400).json({ mensagem: "Não foi possível atualizar o Livro. Entre em contato com o administrador." });
        }
    }
}