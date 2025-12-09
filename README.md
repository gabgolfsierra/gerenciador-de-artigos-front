# ArtGen – Integração com Lattes via TamperMonkey 📚

O **ArtGen** é uma aplicação para gerenciamento de artigos em periódicos com suporte a automação no preenchimento do formulário da **Plataforma Lattes**.  
Com ele, você cadastra artigos facilmente e utiliza o TamperMonkey para preencher o Lattes automaticamente! 🤖✨

---

## 🔧 Como rodar o Back-end (Spring Boot)

```bash
git clone https://github.com/gabgolfsierra/gerenciador-de-artigos
```

Após clonar:
- Instale as dependências do Maven  
- Execute o projeto normalmente

Servidor disponível em:
👉 http://localhost:8080  

Endpoints para testar:
- **GET** http://localhost:8080/artigo — retorna todos os artigos cadastrados

---

## 💻 Como rodar o Front-end (Angular)

```bash
git clone <este repositório>
cd artgenfront
npm install
npm run start
```

Aplicação disponível em:
👉 http://localhost:4200

Na listagem de artigos, cada item possui:
- 📋 **Copiar ID**
- 🔗 **Abrir Lattes**

---

## 🧩 Instalação e uso do TamperMonkey

1. Instale a extensão **TamperMonkey** no navegador 🧩  
2. Abra o **Dashboard**
3. Clique em **Create new script**
4. Abra o arquivo `scriptTampermonkey.js` deste projeto
5. Copie TODO o conteúdo e cole no novo script
6. Salve e deixe o script **ativado (ON)** ⚡

---

## 🤖 Fluxo de uso da automação

### 1️⃣ No ArtGen:
- Cadastre o artigo 📝  
- Clique em **Copiar ID**  
- Clique em **Abrir Lattes**

### 2️⃣ No Lattes:
- Faça login (se necessário) 🔐  
- Navegue até o formulário de **Cadastro de Artigo em Periódico**

### 3️⃣ No navegador:
- Clique no ícone do **TamperMonkey**  
- Escolha o comando **"Preencher Lattes com ArtGen"**  
- Cole o ID copiado anteriormente

### 4️⃣ O script irá:
- Buscar automaticamente o artigo no endpoint:
  ```
  GET http://localhost:8080/artigo/{id}
  ```
- Ler o JSON retornado  
- Preencher os campos do formulário automaticamente 

---


