# meus-resumos-d

## Publicação gratuita no Netlify

O projeto é um site estático: não precisa de etapa de build nem de servidor próprio. A configuração em `netlify.toml` publica a pasta raiz.

1. Envie este projeto para um repositório no GitHub, GitLab ou Bitbucket.
2. No Netlify, escolha **Add new site** > **Import an existing project** e conecte o repositório.
3. Deixe o comando de build vazio e informe `.` como diretório de publicação. O Netlify também lê esses valores de `netlify.toml`.
4. Inicie o deploy. O Netlify fornecerá um endereço público terminado em `netlify.app`; é possível configurar um domínio próprio depois.

Para testar sem conectar um repositório, também é possível publicar a pasta do projeto pelo recurso de deploy manual do Netlify. Para atualizações frequentes, a integração com Git publica cada novo commit automaticamente.

**Privacidade:** esta hospedagem é pública. Os arquivos HTML, JSON e Markdown enviados ao site poderão ser acessados por qualquer pessoa. O progresso dos flashcards é salvo apenas na sessão do navegador e não é sincronizado entre dispositivos.
