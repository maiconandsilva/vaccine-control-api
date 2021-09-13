# Vaccination Control

- [x] O usuário efetua o seu próprio cadastro;
- [x] O usuário efetua login:
  - **POST `/api/account/signup`**;
- [x] O usuário altera mail e senha:
  - **POST `/api/account/update`**;
- [x] O e-mail é único;
- [x] O usuário admin possui a função de cadastrar, editar, excluir e listar as vacinas;
- [x] Somente o usuário admin pode mudar o perfil de acesso de outros usuários;
- [x] O usuário comum não pode cadastrar vacinas;
- [x] O usuário registra que foi vacinado fornecendo a identificação da vacina e a data no formato YYYY-MM-DD;
- [ ] O usuário pode editar e excluir os seus registros de vacinação;
- [x] O usuário pode listar os registros de vacina em ordem decrescente de data;
- [x] O usuário possui acesso a somente os seus próprios registros de vacinação;
- [x] Todas as operações requerem login;
- [x] Os dados precisam ser persistidos no SGBD PostreSQL da cloud ElephantSQL;
- [x] Fazer deploy da aplicação na cloud do Heroku.
