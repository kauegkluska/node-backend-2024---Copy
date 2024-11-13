## Como iniciar o projeto

### Caso não tenha o projeto clonado:

1. Clone o repositório:
    ```bash
    git clone https://github.com/leobravoe/node-backend-2024.git
    ```

2. Copie e renomeie o arquivo de configuração padrão:
    ```bash
    copy '.\config\default.json example' '.\config\default.json'
    ```

3. Atualize as dependências:
    ```bash
    npm update --save
    ```

4. Atualize as dependências:
    ```bash
    npm update -D
    ```

5. Inicie o projeto em ambiente de desenvolvimento:
    ```bash
    npm run dev
    ```

### Caso já tenha o projeto clonado:

1. Restaure o estado original do repositório:
    ```bash
    git reset --hard
    ```

2. Restaure o estado original do repositório:
    ```bash
    git clean -fd
    ```

3. Atualize o repositório com as últimas alterações:
    ```bash
    git pull origin main --allow-unrelated-histories
    ```


