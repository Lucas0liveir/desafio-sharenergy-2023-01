# Desafio para o processo seletivo SHARENERGY 2023/01

## Setup
### Com o ambiente docker instalado e configurado.

Na raiz do projeto rode o comando abaixo para subir os containers:
```sh
docker compose build
```

Agora precisamos descobrir o endereço IP onde o backend está rodando

Inicie o backend
```sh
sudo docker compose start backend
```
Execute o comando abaixo para descobrir o ID do seu container:

```sh
sudo docker ps -a --filter name=nest_backend
```
Copie o valor CONTAINER ID retornado no console, e execute o comando:

```sh
sudo docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_id
```
substitua container_id pelo id do container.

Copie o endereço IP retornado no console e cole-o no arquivo .env do frontend localizado na pasta front-end-react seguido da porta 3000 por exemplo: 192.168.0.5:3000
no final seu arquivo .env do frontend deve estar assim:

```js
VITE_REACT_API_URL=http://COLE_AQUI_IP_DO_BACKEND:3000
```

Por fim rode o frontend com o comando:
```sh
sudo docker compose up frontend
```

Agora é so acessar o front pela url do network que aparece no console.


### API Documentação

A documentação do backend pode ser acessada na rota /api


## Testes
  
Na raiz da pasta nest-backend, execute:
```sh
yarn ou npm install
```
Rode os testes com o comando:
```sh
yarn test ou npm run test
```

## Vídeo
- [Link do vídeo](https://youtu.be/oRQL8BcCYSI)