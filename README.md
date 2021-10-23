===================== Spetia ===========================================================

/********************************   configs  *******************************************/
version nodejs: 10.19.0 
version npm: 6.14.4
version docker: 19.03.8
version docker-compose: 1.25.0

image docker: node:16


/*******************************  instructions  ****************************************/
1. Para instalar o projeto, usando Docker:
    1.1. Rodar o comando, na pasta 'backend', para instalar as dependências do node:
        npm install

    1.2. Rodar o comando, na raiz do projeto, para criar a instância de container Docker:
        docker-compose up -d

    1.3. A requisição HTTP GET pode ser enviada na URL base:
        http://localhost:3001/to-fullname/{param}

substituindo o parâmetro pelo número que se deseja. Exemplo: para se obter o número 1593, por extenso,
digitar no campo de URL do navegador: http://localhos:3001/to-fullname/1593 .

2. Para rodar os testes unitários da aplicação, usando Docker:
    2.1. Com o container funcionando, após o passo 1.2, rodar o comando:
        docker exec -it spetia-backend npm test

3. Para rodar instalar o projeto, sem Docker:
    3.1. Siga o passo 1.1
    3.2. siga o passo 1.3

4. Para rodar os testes unitários da aplicação, sem o Docker:
    4.1. na pasta 'backend', rodar o comando:
        npm test