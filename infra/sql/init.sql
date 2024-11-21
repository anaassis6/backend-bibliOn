-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

SELECT * FROM emprestimo;
SELECT * FROM aluno;
SELECT * FROM livro;

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('João', 'Silva', '2000-05-15', 'Rua das Flores, 123', 'joao.silva@example.com', '(16) 91234-5678'),
('Maria', 'Oliveira', '1999-08-22', 'Avenida Central, 456', 'maria.oliveira@example.com', '(11) 91234-5679'),
('Carlos', 'Souza', '2001-12-30', 'Rua dos Limoeiros, 789', 'carlos.souza@example.com', '(54) 91234-5680'),
('Ana', 'Pereira', '1998-03-10', 'Praça da Liberdade, 101', 'ana.pereira@example.com', '(23) 91234-5681'),
('Roberto', 'Lima', '2002-06-25', 'Avenida Brasil, 202', 'roberto.lima@example.com', '(11) 91234-5682'),
('José', 'Costa', '2000-11-05', 'Rua dos Jacarandás, 303', 'juliana.costa@example.com', '(16) 91234-5683'),
('Lucas', 'Almeida', '1997-02-14', 'Rua do Sol, 404', 'lucas.almeida@example.com', '(16) 91234-5684'),
('Luciana', 'Nogueira', '2001-04-17', 'Rua das Acácias, 505', 'fernanda.nogueira@example.com', '(16) 91234-5685'),
('Diego', 'Marques', '1996-09-11', 'Avenida das Américas, 606', 'diego.marques@example.com', '(11) 91234-5686'),
('Lorena', 'Barbosa', '1995-07-29', 'Rua da Esperança, 707', 'tatiane.barbosa@example.com', '(12) 91234-5687');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('A Metamorfose', 'Franz Kafka', 'Companhia das Letras', '1915', '978-8535923296', 5, 5, 45.00, 'Disponível'),
('Fahrenheit 451', 'Ray Bradbury', 'Martins Fontes', '1953', '978-8533611741', 6, 6, 70.00, 'Disponível'),
('Cem Anos de Solidão', 'Gabriel García Márquez', 'Editora Record', '1967', '978-8501101147', 4, 4, 95.00, 'Disponível'),
('O Morro dos Ventos Uivantes', 'Emily Brontë', 'L&PM', '1847', '978-8535923721', 3, 3, 85.00, 'Disponível'),
('Crime e Castigo', 'Fiódor Dostoiévski', 'Editora 34', '1866', '978-8573265394', 2, 2, 120.00, 'Disponível'),
('O Apanhador no Campo de Centeio', 'J.D. Salinger', 'Editora do Brasil', '1951', '978-8535930859', 7, 7, 75.00, 'Disponível'),
('Os Irmãos Karamázov', 'Fiódor Dostoiévski', 'Companhia das Letras', '1880', '978-8535933577', 3, 3, 110.00, 'Disponível'),
('O Grande Gatsby', 'F. Scott Fitzgerald', 'Companhia das Letras', '1925', '978-8535931269', 6, 6, 65.00, 'Disponível'),
('A Menina que Roubava Livros', 'Markus Zusak', 'Intrínseca', '2005', '978-8580571333', 8, 8, 55.00, 'Disponível'),
('O Sol é para Todos', 'Harper Lee', 'José Olympio', '1960', '978-8535934925', 5, 5, 50.00, 'Disponível');

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(11, 14, '2024-09-12', '2024-09-26', 'Em andamento'),
(12, 15, '2024-09-12', '2024-09-26', 'Em andamento'),
(13, 17, '2024-09-12', '2024-09-26', 'Em andamento'),
(14, 18, '2024-09-13', '2024-09-27', 'Em andamento'),
(15, 19, '2024-09-13', '2024-09-27', 'Em andamento'),
(16, 20, '2024-09-14', '2024-09-28', 'Em andamento'),
(17, 11, '2024-09-14', '2024-09-28', 'Em andamento'),
(18, 12, '2024-09-15', '2024-09-29', 'Em andamento'),
(19, 13, '2024-09-15', '2024-09-29', 'Em andamento'),
(20, 16, '2024-09-16', '2024-09-30', 'Em andamento');