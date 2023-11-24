# Arquitetura Limpa e Hexagonal

### Oque é arquitetura de um projeto?
A arquiterua de um projeto é a estrutura do código da aplicação, existem várias arquituras que podem ser escolhinas na hora de projetar a estrutura do projeto como:
Exagonal, monolítica, de referênca, entre outras. Em geral, a arquitetura visa minimizar os recursos humanos necessários para construir e manter um software, e deve ser pensada para servir ao propósito da aplicação que será constrída.

### Oque é o design?
Design seria a apresentação da sua arquitetura, onde ficarão os diretórios, os arquivos presentes em cada um e o nome deles.

### Ok, mas então, nesse contexto, oque é o código?
O código é somente o material usado para construir tudo oque foi planejado.

### Oque faz uma boa arquitetura?
Uma boa arquitetura garante a a escalabilidade e manutenabilidade do projeto, além de acelerar o processo de desenvolvimento e a redução de bugs.

### As decisões de código influenciam na arquitetura? 
Não, as decisões de código usado para resolver determinado problema não devem influênciar na arquitetura do projeto.

### As decisões de arquitetura influenciam o código? 
Sim. As decisões arquiteturais vão impactar e muito a forma como você codifica a aplicação, pois a estrutura do seu projeto será diferente e você codifica baseada nela.

# Projeto
## Iniciando o projeto
- npm iniy -y
- npm i -D typescript jest ts-jest
- npm i -D ts-node-dev 
- npm i -d @types/jest @types/node
- npx tsc --init
- npx ts-jest config:init
- Alterar tsconfig.json: "outDir: dist" e adicionar após o "compilerOptions" mais uma chave 'incluse: ["src/**/*"]'
- adicionado no package.json
```json
{
	"name": "1-arquitetura-limpa-e-hexagonal",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"build": "tsc",
		"dev": "ts-node-dev --respawn --transpile-only src/index.ts",
		"test": "jest"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"devDependencies": {
		"@types/jest": "^29.5.5",
		"@types/node": "^20.8.6",
		"jest": "^29.7.0",
		"ts-jest": "^29.1.1",
		"ts-node-dev": "^2.0.0",
		"typescript": "^5.2.2"
	}
}
```