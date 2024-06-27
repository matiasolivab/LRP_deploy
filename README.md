# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Comandos basicos:

### Para crear proyecto:
```bash
yarn create vite@latest
```
Luego se elige configuraciones basicas

### Correr React:
```bash
yarn dev
```

### Instalar dependecias
```bash
yarn install
```

## Rutas:

### Inicio

#### Endpoint:
```bash
/
```
### Nosotros

#### Endpoint:
```bash
/about
```
### instrucciones

#### Endpoint:
```bash
/instructions
```
### Iniciar sesión

#### Endpoint:
```bash
/login
```

### Registrarse

#### Endpoint:
```bash
/signup
```

### Menú de opciones de jugar

#### Endpoint:
```bash
/play
```

### Crear partida

#### Endpoint:
```bash
/room
```

### Waiting room creada

#### Endpoint:
```bash
/room/:roomId
```

### Juego (vista del tablero y jugabilidad)

#### Endpoint:
```bash
/board/:gameId
```