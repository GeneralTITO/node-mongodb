FROM node:20-alpine

# Cria um usuário e grupo para rodar a aplicação de forma segura
RUN addgroup -S app && adduser -S -G app app

WORKDIR /app

# Usa root temporariamente para copiar arquivos e ajustar permissões
USER root
COPY package.json package-lock.json /app/

# Garante que o usuário app tenha permissão sobre os arquivos e diretório
RUN chown -R app:app /app

# Muda para o usuário app antes de rodar npm install
USER app

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY --chown=app:app . .

EXPOSE 3000

CMD ["npm", "run", "dev"]