# Fynapp_Frontend
FynApp is an application to achieve weight loss goals and maintain a better lifestyle, based on proper nutrition, a positive mindset, and physical activity. Inspired by the principles of Caloric Deficit and Intermittent Fasting, the idea was born when one of the founders needed a practical tool to count daily calories with ingredients and recipes made by oneself, raising awareness of the most convenient foods, most filling, the ones you like the most, the ones you can pay for and provide fewer calories, and he didn't found something that fit his needs in the Apps market.
FYN = Fit You Need (Just as Yoda would say).

FynApp es una aplicación para lograr objetivos de reducción de peso y mantener un mejor estilo de vida, con base en alimentación adecuada, mente positiva y actividad física. Inspirada por los principios del Déficit Calórico y el Ayuno Intermitente, la idea nació de contar con una herramienta práctica para hacer un conteo de calorías diarias con ingredientes y recetas hechas por uno mismo, haciendo conciencia de los alimentos que más convienen, que más llenan, que mas le gustan, que puede pagar y que menos calorías aporten.
FYN = Fit You Need (Tal como lo diria el Yoda)

2021-10-16 | CR

- Frontend iniitally based on the `react-jwt-authentication-example`

React (without Redux) - JWT Authentication Tutorial & Example

To see a demo and further details go to http://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example

The tutorial example uses Webpack 4 to transpile the React code and bundle the modules together, and the webpack dev server is used as the local web server, to learn more about using webpack you can check out the official webpack docs.

- To make it work:

1. Install NodeJS and NPM from https://nodejs.org/en/download/.
2. Download or clone the tutorial project source code from https://github.com/cornflourblue/react-jwt-authentication-example
3. Install all required npm packages by running `npm install` from the command line in the project root folder (where the package.json is located).
4. Start the application by running `npm start` from the command line in the project root folder.
5. Your browser should automatically open at http://localhost:8080 with the login page of the demo React JWT authentication app displayed.

# NOTA:
En situaciones normales, el frontend usa el puerto 3001 si se usa Express, o el puerto 3000 si se usa WebPack.

Crear un archivo `.env` para configurar la conexion con el backend, con lo siguiente:

REACT_APP_API_URL=http://localhost:5000