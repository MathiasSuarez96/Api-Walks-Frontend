# 🐕 API Walks - Frontend

Frontend React para la gestión de paseos de perros. Interfaz moderna y responsiva que consume la API REST del backend.

## 📋 Descripción

Aplicación web desarrollada con React + Vite que permite:

- Registro e inicio de sesión de usuarios
- Gestión completa de paseos (CRUD)
- Interfaz protegida por roles (Admin/User)
- Diseño responsivo con Tailwind CSS

## 🛠️ Tecnologías

- **React 18** - Biblioteca para interfaces de usuario
- **Vite** - Build tool y servidor de desarrollo
- **React Router DOM** - Navegación y rutas
- **Axios** - Cliente HTTP para consumir la API
- **Tailwind CSS** - Framework de estilos utilitarios
- **Context API** - Manejo de estado global (autenticación)

## 📁 Estructura del Proyecto

```
src/
├── auth/
│   ├── AuthContext.jsx    # Contexto global de autenticación
│   ├── LoginPage.jsx      # Página de inicio de sesión
│   └── RegisterPage.jsx   # Página de registro
├── components/
│   ├── Button.jsx         # Componente de botón reutilizable
│   ├── Input.jsx          # Componente de input reutilizable
│   ├── Navbar.jsx         # Barra de navegación
│   └── ProtectedRoute.jsx # HOC para rutas protegidas
├── pages/
│   ├── WalksPage.jsx      # Listado de paseos
│   └── WalkFormPage.jsx   # Formulario crear/editar paseo
├── utils/
│   └── api.js             # Configuración de Axios y endpoints
├── App.jsx                # Componente raíz y rutas
└── main.jsx               # Punto de entrada de React
```

## 🚀 Instalación

### Prerequisitos

- Node.js 18+
- npm o yarn
- Backend corriendo en `http://localhost:5000`

### Pasos

1. Clonar el repositorio

```bash
git clone https://github.com/MathiasSuarez96/Api-Walks-Frontend.git
cd Api-Walks-Frontend
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno (opcional)

```bash
# Crear archivo .env si el backend está en otro puerto
VITE_API_URL=http://localhost:5000/api
```

4. Iniciar servidor de desarrollo

```bash
npm run dev
```

5. Abrir en el navegador

```
http://localhost:5173
```

## 📡 Conexión con Backend

El frontend se conecta al backend mediante Axios. La configuración está en `src/utils/api.js`:

- **Base URL:** `http://localhost:5000/api`
- **Autenticación:** JWT Token en localStorage
- **Interceptor:** Agrega el token automáticamente a cada petición

## 🔐 Autenticación

El sistema de autenticación utiliza:

- **JWT (JSON Web Tokens)** para mantener la sesión
- **Context API** para compartir el estado del usuario
- **Protected Routes** para restringir acceso a páginas

### Flujo de autenticación:

1. Usuario ingresa credenciales
2. Backend valida y devuelve JWT
3. Token se guarda en localStorage
4. Interceptor de Axios incluye token en headers
5. Rutas protegidas verifican autenticación

## 📱 Funcionalidades

### Públicas

- Registro de usuario
- Inicio de sesión

### Protegidas (requieren login)

- Ver listado de paseos
- Crear nuevo paseo
- Editar paseo existente
- Eliminar paseo

## 🎨 Estilos

Se utiliza **Tailwind CSS** para los estilos:

- Diseño mobile-first
- Componentes reutilizables
- Tema consistente en toda la app

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter ESLint
```

## 🔗 Repositorios Relacionados

- **Backend:** [Api-Walks](https://github.com/MathiasSuarez96/Api-Walks)

## 👨‍💻 Autor

**Mathias Suarez**

- GitHub: [@MathiasSuarez96](https://github.com/MathiasSuarez96)

## 📄 Licencia

Este proyecto fue desarrollado como proyecto final del curso de Desarrollo Fullstack.

