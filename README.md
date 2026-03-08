# HubVida

Um aplicativo em React moderno, focado em alta performance visual, estilizado com Tailwind CSS e alimentado pelo bundler ultra-rápido Vite.

## 🚀 Como Rodar o Projeto Localmente

1. **Pré-requisitos**:
   Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu computador (versão 18 ou superior é recomendada).

2. **Instalação das Dependências**:
   Abra o seu terminal (CMD, PowerShell ou o terminal do VSCode) diretamente na pasta do projeto (`c:\Users\Abimael Balbino\OneDrive\Documentos - Gerais\HubVida`) e execute o seguinte comando:
   ```bash
   npm install
   ```

3. **Iniciando o Servidor de Desenvolvimento**:
   Após a conclusão da instalação das dependências, inicie o projeto executando:
   ```bash
   npm run dev
   ```
   *O terminal mostrará um endereço local (geralmente `http://localhost:5173/`). Pressione `Ctrl` e clique no link, ou copie e cole esse endereço no seu navegador para ver o HubVida em tempo real.*

## 📦 Como Construir (Build) para Produção

Quando terminar de fazer suas alterações e quiser compilar a versão super otimizada para colocar na internet (como na Vercel ou Netlify), rode:
```bash
npm run build
```
O código final minificado e pronto para deploys será gerado automaticamente na nova pasta `dist/`.

## 🌐 Como Enviar e Publicar no GitHub

1. **Sincronizar seu Código (Commit)**:
   Abra o terminal na pasta do seu projeto e rode:
   ```bash
   git init
   git add .
   git commit -m "Commit inicial: Projeto Refatorado e Componentizado"
   ```

2. **Criar o Repositório no GitHub**:
   - Vá para o seu perfil no [GitHub](https://github.com/) e clique no botão verde para criar um **Novo Repositório** (New Repository).
   - Defina um nome para ele (ex: `hubvida-app`).
   - Não adicione o arquivo README, nem o `.gitignore` na tela de criação (deixe tudo desmarcado/em branco) e clique em **Create Repository**.

3. **Conectar e Enviar o Código**:
   Copie os comandos que o GitHub lhe mostrará na próxima página (seção "push an existing repository") e cole no seu terminal. Geralmente serão esses três comandos:
   ```bash
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git
   git push -u origin main
   ```
   *Substitua o link `https://...` pelo link real que o GitHub gerou para você.*

Pronto! Seu projeto super organizado e Componentizado em React/Vite já estará no GitHub! Funciona em qualquer plataforma de hospedagem de frontend como Vercel, Netlify ou GitHub Pages. 🚀
