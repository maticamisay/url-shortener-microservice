# Microservicio de Acortador de URL

Este proyecto es una implementación del desafío de freeCodeCamp de construir un microservicio de acortador de URL. Acepta una URL y devuelve una versión acortada de la misma. También puede redirigir a la URL original cuando se visita la URL corta.

## Cómo utilizar el servicio

Para acortar una URL, realiza una solicitud POST a la ruta `/api/shorturl` con un cuerpo de solicitud JSON que contenga la URL que deseas acortar. Por ejemplo:

```json
{
  "url": "https://ejemplo.com"
}
```

El servicio responderá con un objeto JSON que contiene la URL original y la URL corta. Por ejemplo:

```json
{
  "original_url": "https://ejemplo.com",
  "short_url": "1"
}
```

Para visitar la URL original a través de la URL corta, simplemente navega a `/api/shorturl/<short_url>`.

## Cómo instalar y ejecutar el proyecto localmente

1. Clona este repositorio.
2. Navega hasta el directorio del repositorio en tu terminal.
3. Ejecuta `npm install` para instalar las dependencias del proyecto.
4. Ejecuta `npm start` para iniciar el servidor.
5. Abre un navegador web y visita `http://localhost:3000/api/shorturl`.

## Tecnologías utilizadas

Este proyecto utiliza Node.js y Express para el servidor y el enrutamiento. Además, se utiliza MongoDB para almacenar las URLs.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Puedes ver el archivo `LICENSE` para más detalles.

## Contacto

Si tienes alguna pregunta sobre este proyecto, no dudes en abrir un issue o enviarme un correo electrónico. Estoy siempre dispuesto a ayudar.

## Reconocimientos

Este proyecto fue creado como parte de las certificaciones de freeCodeCamp. Gracias a freeCodeCamp por proporcionar la plantilla del proyecto y el conjunto de pruebas.