import { Request, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";

interface EmprestimoDTO {
    idAluno: number,
    idLivro: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmprestimo: string
}

/**
 * A classe `EmprestimoController` estende a classe `Emprestimo` e é responsável por controlar as requisições relacionadas aos Emprestimos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "Emprestimo".
 * - Herdando de `Emprestimo`, ela pode acessar métodos e propriedades da classe base.
 */
export class EmprestimoController extends Emprestimo {

    /**
    * Lista todos os Emprestimos.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de Emprestimos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Emprestimos.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os Emprestimos e armazena o resultado
            const listaDeEmprestimos = await Emprestimo.listagemEmprestimos();

            // retorna a lista de Emprestimos há quem fez a requisição web
            return res.status(200).json(listaDeEmprestimos);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de Emprestimos');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de Emprestimos" });
        }
    }
}