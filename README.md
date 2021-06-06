# SetMyHealthyPlate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Instrucciones de uso

La aplicación está desplegada a través de la plataforma Netlify y se puede usar accediendo al enlace `https://setmyhealthyplate.netlify.app/`.
Al acceder a la aplicación, se muestra por defecto la página de Login. Como para poder usarla hay que estar registrado, la primera vez que se accede hay que ir a la página de registro y rellenar el formulario con el correo electrónico, nombre de usuario y contraseña. Después llegará un email a la bandeja de entrada del correo que se haya indicado, para validar la dirección, y una vez se valide ya se podrá acceder a la aplicación a través del formulario de la página de Login.
Cuando el usuario ya se ha autenticado, la página que se muestra por defecto es la del generador de platos Harvard, con un botón con el texto “Quiero un Healthy Plate” para obtener una sugerencia de plato. Si se hace clic sobre el botón, se obtiene un pequeño gráfico redondo que representa un plato, con cuatro secciones que representan las cantidades que debe ocupar cada grupo de alimentos. Además, aparece también el conjunto de ingredientes que conforma la sugerencia de plato en sí, un icono con forma de corazón para guardar esa sugerencia de plato en favoritos, y al lado de cada ingrediente dos iconos: uno para cambiar el ingrediente por otro de la misma familia, y otro para prohibir ese ingrediente. Debajo del todo sigue apareciendo el botón “Quiero un Healthy Plate” para generar una combinación distinta.
Usando el menú de navegación, que para dispositivos grandes se ve en la parte superior, y para dispositivos más pequeños se agrupa en un menú de hamburguesa en la esquina superior izquierda, se puede acceder al resto de la aplicación:

- Favoritos: para ver los platos que se han marcado como favoritos, y si se desea, eliminar alguno.
- Menú semanal: para generar un conjunto de siete platos aleatorios, uno para cada día de la semana. Si ya se ha generado, se accede a esta sección para revisarlo. Cualquiera de los platos que componen el menú se puede guardar como plato favorito, y cualquiera de sus ingredientes se puede modificar o prohibir.
- Lista de la compra: para ver los ingredientes que son necesarios para poder elaborar los platos del menú semanal. Se muestra en formato de lista con caja de selección, y si no hace falta comprar algún ingrediente, al desmarcar la caja se elimina el ingrediente de la lista.
- Alimentos no permitidos: para ver los ingredientes que se han marcado como prohibidos y que por tanto no se usan para generar platos. Igual que la lista de la compra, se presenta en formato de lista con cajas de selección, y si se desmarca alguna caja, se elimina de la lista ese ingrediente.
- Mi perfil: para ver los datos del usuario, que son el nombre de usuario y la dirección de correo electrónico.
- About: para saber más acerca de la aplicación, conocer su objetivo y entender mejor en qué consiste el plato de Harvard.
  Aparte de eso, también hay un icono de cerrar sesión para que el usuario pueda salir de la aplicación.

## Instrucciones de instalación

Para poder instalar la aplicación y crear un entorno de desarrollo hay que seguir los siguiente pasos:

- Hay que crear una cuenta en Firebase. A continuación hay que crear un nuevo proyecto de Firebase. Este proceso es bastante intuitivo y está bien explicado en `https://firebase.google.com/`.
- Una vez se tiene el proyecto creado, hay que importar la base de datos que se facilita como anexo (set-my-healthy-plate.json). La que se facilita incluye solamente con la lista de ingredientes, ya que los usuarios se van creando según se registran e interaccionan con la aplicación. Con esta información la aplicación ya tiene ingredientes para poder generar platos.
- Después, es necesario modificar el archivo environment.ts del repositorio de código, que está ubicado en la ruta src/environments. Ahí habría que modificar el atributo firebaseConfig e indicar los valores propios del proyecto de Firebase que se haya creado.
- Para poder ejecutar la aplicación en local hay que abrir la carpeta del repositorio de código en una terminal del sistema y ejecutar el comando npm install para instalar todas las dependencias del proyecto.
- Una vez se tienen las dependencias instaladas, hay que ejecutar el comando `ng serve --open` para que se ejecute la aplicación en local. Normalmente se abre la aplicación automáticamente en el navegador, pero en caso de que no suceda, hay que abrir el navegador y acceder al puerto 4200: `http://localhost:4200/`
- En este instante ya se dispone de la aplicación ejecutándose en local, vinculada a la nueva base de datos y cualquier modificación que se realice en el código ya se podrá ver reflejada.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
