# Proyecto E-comerce de pintura

## Descripcion del proyecto

El proyecto fue realizado en el ámbito de un curso en la plataforma Coderhouse, con el objetivo de crear una aplicación utilizando el framework React. Además, se utiliza como parte de un proyecto de ingeniería industrial en la UTN FRLP (Universidad Tecnológica Nacional, Facultad Regional La Plata). La aplicación se centra en la venta de productos relacionados con la industria de pintura en el ámbito industrial.

La marca se enfoca en ofrecer productos de alta calidad para satisfacer las necesidades de los clientes del sector industrial. El objetivo de la aplicación es brindar una experiencia de compra en línea fluida y segura, donde los usuarios puedan explorar una amplia gama de productos y realizar pedidos.

## Tecnologías Utilizadas

El proyecto se desarrolló utilizando las siguientes tecnologías:

- **React:** Framework utilizado para la construcción de la aplicación.
- **Animate.css:** Biblioteca utilizada para crear animaciones, en este caso, se empleó para generar una animación de carga de productos más amena.
- **Firebase:** Servicio de base de datos utilizado para almacenar los productos y las ventas realizadas en la aplicación.
- **React Loading Skeleton:** Componente utilizado para mostrar una animación de carga mientras se cargan los detalles del producto.
- **React Router Dom:** Biblioteca utilizada para el enrutamiento dentro de la aplicación web.
- **React Toastify:** Componente utilizado para mostrar anuncios y notificaciones, en este caso, se utilizó en el detalle del producto para mostrar mensajes de carga.

## Información de la aplicación

### Rutas de Categorías

En el componente principal Main, se utilizan rutas para categorías primarias y secundarias, lo que permite filtrar los productos según las categorías seleccionadas. Estas rutas te permiten mostrar los productos específicos relacionados con las categorías de pinturas a base de cal y pinturas a base de látex, así como también herramientas relacionadas. Al acceder a estas rutas, la aplicación mostrará los productos correspondientes a cada categoría, brindando a los usuarios una experiencia de navegación enfocada en sus necesidades.

### Ruta de Detalle de Ítem

La ruta de detalle de ítem se utiliza para mostrar información detallada sobre un producto en particular. Esta ruta utiliza un parámetro de ID de ítem para identificar el producto específico que se desea visualizar. Al acceder a esta ruta, la aplicación mostrará los detalles completos del producto seleccionado, lo que permite a los usuarios obtener información más específica y tomar decisiones de compra más informadas.

### Ruta del Carrito de Compras

La ruta del carrito de compras está asociada con el componente CartContainer, que se encarga de mostrar el contenido del carrito y permitir a los usuarios realizar acciones relacionadas con la compra. Al acceder a esta ruta, la aplicación mostrará el contenido actualizado del carrito de compras, lo que permite a los usuarios revisar y ajustar los productos seleccionados antes de finalizar la compra.

### Ruta Sobre Nosotros

La ruta "Sobre Nosotros" está vinculada a la página de inicio o landing page de tu aplicación. Al acceder a esta ruta, la aplicación mostrará información relevante sobre tu marca o negocio, brindando a los usuarios una visión general de tu empresa y sus valores.

### Ruta de Error 404

La ruta de error 404 se utiliza para manejar cualquier solicitud de ruta que no se encuentre definida en la aplicación. Al acceder a una ruta inexistente, la aplicación redireccionará automáticamente a esta ruta de error 404, mostrando un mensaje amigable que indica que la página solicitada no se pudo encontrar.

### Simulación de Espera de Petición de Productos

En este proyecto, se utilizó la función setTimeout para simular una espera de una petición de productos a una base de datos. La función setTimeout es una función de JavaScript que permite retrasar la ejecución de un bloque de código durante un cierto período de tiempo.
En el contexto de la aplicación, se utilizó setTimeout para simular una petición de productos a una base de datos externa. Esto se hizo a fin de mostrar una animación o mensaje de carga mientras los productos estaban siendo recuperados. El uso de setTimeout permitió imitar una situación realista en la que se espera una respuesta del servidor, brindando así una mejor experiencia de usuario.

### Funciones que interactúan con la base de datos

-La función getProduct se encarga de obtener los productos desde la colección "productos" en la base de datos. Utiliza la función get de Firebase Firestore para realizar esta tarea. La función get devuelve una promesa que representa la respuesta de la base de datos.
-La función getProductsByCategory se encarga de obtener los productos de una categoría específica en base a un filtro. Toma dos parámetros: categoria y secundaria.
El parámetro categoria representa la categoría principal a la cual pertenecen los productos que se desean filtrar.
El parámetro secundaria es un valor booleano que indica si se debe aplicar el filtro a la categoría secundaria en lugar de la categoría principal.
Dentro de la función, se crea una variable filtro que almacenará el filtro de consulta. Luego, se accede a la colección "productos" utilizando la función collection de Firebase Firestore.

### Funciones del Carrito

Dentro del contexto personalizado (CustomProvider), se encuentran varias funciones que interactúan con el carrito de compras. Estas funciones permiten agregar, eliminar y limpiar los elementos del carrito. A continuación, se detallan cada una de ellas:

    1. Función agregarAlCarrito(cantidad, producto)
La función agregarAlCarrito se encarga de agregar un producto al carrito de compras. Recibe dos parámetros: cantidad, que representa la cantidad de productos que se desean agregar, y producto, que es el producto específico que se va a incluir en el carrito.

    2. Función eliminarDelCarrito(cantidad, producto)
La función eliminarDelCarrito se utiliza para eliminar un producto del carrito de compras. Toma dos parámetros: cantidad, que indica la cantidad de productos que se desea eliminar, y producto, que es el producto específico que se va a quitar del carrito.
    3. Función limpiarCarrito()
La función limpiarCarrito se encarga de vaciar completamente el carrito de compras. No recibe ningún parámetro.

    4. Objeto: valor del Contexto
El objeto valor del contexto personalizado contiene los campos y variables que se desean compartir en toda la aplicación. Este objeto puede incluir las funciones y datos relevantes, como el estado del carrito, el usuario actual, las configuraciones globales, entre otros. Al tener acceso a este objeto desde cualquier componente que consuma el contexto, se facilita el acceso a los datos y acciones comunes en la aplicación.

### currencyFormatter

La función currencyFormatter se utiliza para formatear un valor numérico con una determinada moneda. Recibe dos parámetros: currency y value.
El parámetro currency representa la abreviatura de la moneda que se desea utilizar para formatear el valor, por ejemplo, "USD" para Dólares estadounidenses o "EUR" para Euros.
El parámetro value es el valor numérico que se desea formatear.

## Instalación y Uso

A continuación, se detallan los pasos para instalar y utilizar el proyecto:

1.Accede al repositorio del proyecto en GitHub: [https://github.com/Enzopinotti/PreEntrega2-Pinotti]
2.Clona el repositorio en tu entorno local utilizando Git:
    `git clone https://github.com/Enzopinotti/PreEntrega2-Pinotti.git`
3.Accede al directorio del proyecto:
    `cd PreEntrega2-Pinotti`
4.Instala las dependencias del proyecto utilizando NPM:
    `npm install Animate.css`
    `npm install Firebase`
    etc...
5.Inicia la aplicación en tu entorno de desarrollo local:
    `npm start`
6.Abre tu navegador web y accede a [http://localhost:3000] para ver la aplicación en funcionamiento.

**Recuerda que es necesario tener Node.js y NPM instalados en tu sistema antes de iniciar la instalación.**

¡Listo! Ahora deberías tener la aplicación funcionando en tu entorno local y estar listo para comenzar a explorar y utilizarla.

## Demostración y Deploy

-Demostración en Línea: Puedes acceder a una demostración en línea de la aplicación en el siguiente enlace: [https://pre-entrega2-pinotti-enzopinotti.vercel.app/]

GIF

## Contacto

Si tienes alguna pregunta, sugerencia o simplemente deseas ponerte en contacto, puedes hacerlo a través de los siguientes canales:

-**LinkedIn:** Enzo Pinotti [https://www.linkedin.com/in/enzo-daniel-pinotti-667270179/]
-**Correo Electrónico:** [enzopinottii@gmail.com]
-**Instagram:** enzoopinotti.uwu [https://www.instagram.com/enzoopinotti.uwu/?hl=es]

No dudes en contactarme si necesitas más información sobre el proyecto, tienes alguna consulta o simplemente deseas establecer una conexión profesional.

¡Espero que esta información sea útil! Si tienes alguna otra pregunta o necesitas ayuda adicional, estaré encantado de ayudarte
