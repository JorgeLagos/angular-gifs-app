# Gifs APP

Este proyecto fue generado usando Angular CLI version 19.2.15

### Development Server

Para iniciar un servidor de desarrollo local. Una vez que el servidor esté en funcionamiento, abra su navegador y navegue a `http://localhost:4200`
```bash
ng serve --open
```


### Code Scaffolding

Iniciar un proyecto angular
```bash
sudo ng new bases
```

Crear variables de entorno
```bash
ng g environments
```

Crear componentes
```bash
ng g c gifs/components/sideMenu --skip-tests 
ng g c gifs/components/sideMenuHeader --skip-tests
ng g c gifs/components/sideMenuOptions --skip-tests 
```


### Devs

1. Clonar repositorio `git clone git@github.com:JorgeLagos/angular-gifs-app.git`
2. Instalar dependencias `npm install`
3. Iniciar servidor local `ng serve -o`
4. Navegar `http://localhost:4200`


### Building

Para construir el proyecto. Esto compilará tu proyecto y almacenará la compilación en el directorio `dist`. De forma predeterminada, la compilación de producción optimiza el rendimiento y la velocidad de tu aplicación
```bash
ng build --configuration production
```
