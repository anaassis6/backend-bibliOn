import { Request, Response, Router } from "express";
import { AlunoController } from "./controller/AlunoController";
import { LivroController } from "./controller/LivroController";
import { EmprestimoController } from "./controller/EmprestimoController";

//criando um roteador
const router = Router();

//criando uma rota principal para a aplicação
router.get("/", (req: Request, res:Response) => {
    res.json({ mensagem: "Teste de servidor para o sistema BibliOn"});
});

/*
* ROTAS PARA ALUNOS
*/
//Listagem dos alunos
router.get("/lista/alunos", AlunoController.todos);
//Cadastro dos alunos
router.post("/novo/aluno", AlunoController.novo);

/*
* ROTAS PARA LIVROS
*/
//Listagem dos livros
router.get("/lista/livros", LivroController.todos);
//Cadastro dos livros
router.post("/novo/livro", LivroController.novo);

/*
* ROTAS PARA EMPRESTIMOS 
*/
router.get("/lista/emprestimos", EmprestimoController.todos);


//exportando as rotas
export {router};