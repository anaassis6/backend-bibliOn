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
//Deletar os alunos
router.delete("/delete/aluno/:idAluno", AlunoController.remover);
//Atualizar os alunos
router.put("/atualizar/aluno/:idAluno", AlunoController.atualizar);

/*
* ROTAS PARA LIVROS
*/
//Listagem dos livros
router.get("/lista/livros", LivroController.todos);
//Cadastro dos livros
router.post("/novo/livro", LivroController.novo);
//Deletar os livros
router.delete("/delete/livro/:idLivro", LivroController.remover);
//Atualizar os livros
router.put("/atualizar/livro/:idLivro", LivroController.atualizar);

/*
* ROTAS PARA EMPRESTIMOS 
*/
//Listagem dos emprestimos
router.get("/lista/emprestimos", EmprestimoController.todos);
//Cadastro dos emprestimo
router.post("/novo/emprestimo", EmprestimoController.novo);
//Atualizar os emprestimos
router.put("/atualizar/emprestimo/:idEmprestimo", EmprestimoController.atualizar)


//exportando as rotas
export {router};