# Alumnos_Profesores

_Dos proyectos cliente y servidor, la parte Servidor con Java y la parte Cliente con Html,Bootstrap,CSS y Javascript_

## Capturas 📖

# AppCliente
## Tecnología usada 

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [JavaScript](https://es.wikipedia.org/wiki/JavaScript) - Lenguaje programacion Cliente
* [HTML](https://es.wikipedia.org/wiki/HTML) -  HyperText Markup Language
* [CSS](https://www.w3.org/Style/CSS/Overview.en.html) - Frameworks CSS
* [Bootstrap](https://getbootstrap.com/) - Frameworks CSS
* [Magic Animation](https://www.minimamente.com/project/magic/) - Libreria animaciones css

## Configuracion 🛠️
En la app cliente se podra modificar la URI de conexion con el servidor desde la variable global endpoint.

# AppRest
## Tecnología usada

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Java](https://www.java.com/es/) Lenguaje programacion Servidor
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [JAX-RS](https://es.wikipedia.org/wiki/JAX-WS) -  Java API for REST Web Services
* [MySql](https://www.mysql.com/) - Sistema de gestión de bases de datos

## Configuracion 🛠️
Para configurar los paremetros de la conexion a la base de datos habra que modificar el archivo: 

```
WebContent/META-INF/context.xml
```

## ️Detalle API rest con llamadas

### [GET]
## GetAllAlumnos [api/personas/]
+ Attributes (persona)
    + id: 1 (int)
    + nombre: Ana (string)
    + avatar: avatar1.png (string) 
    + sexo: h (string) h/m
+ Request
    + Headers
            Accept: application/json
+ Response 200 (application/json;charset=UTF-8) 

### [GET]
## GetAllCursos [api/cursos/]
+ Attributes (curso)
    + id: 1 (int)
    + nombre: Java (string)
    + precio: 25.05 (Float) 
    + imagen: imagen.png (string) 
+ Request
    + Headers
            Accept: application/json
+ Response 200 (application/json;charset=UTF-8) 

### [POST]
## InsertarPersona [api/personas/]
+ Attributes (persona)
    + id: 1 (int)
    + nombre: Ana (string)
    + avatar: avatar1.png (string) 
    + sexo: h (string) h/m
+ Request
    + Headers
            Accept: application/json
+ Response 200 (application/json;charset=UTF-8) 

### [PUT]
## ModificarPersona [api/personas/{id}]
+ Attributes (persona)
    + id: 1 (int)
    + nombre: Ana (string)
    + avatar: avatar1.png (string) 
    + sexo: h (string) h/m
+ Request
    + Headers
            Accept: application/json
+ Response 200 (application/json;charset=UTF-8) 

### [DELETE]
## EliminarPersona [api/personas/{id}]
+ Attributes (persona)
    + id: 1 (int)
+ Request
    + Headers
            Accept: application/json
+ Response 200 (application/json;charset=UTF-8) 

### [POST]
## AsignarCurso [api/personas/{idPersona}/curso/{idCurso}]
+ Attributes (persona)
    + idPersona: 1 (int)
    + idCurso: 2 (int)
+ Request
    + Headers
            Accept: application/json
+ Response 200 (application/json;charset=UTF-8) 

### [DELETE]
## EliminarCursoAsignado [api/personas/{idPersona}/curso/{idCurso}]
+ Attributes (persona)
    + idPersona: 1 (int)
    + idCurso: 2 (int)
+ Request
    + Headers
            Accept: application/json
+ Response 200 (application/json;charset=UTF-8) 

## Comenzando 🚀

_Para usar el proyecto descargarlo en el equipo, importar la base de datos que esta en apprest/BasesDeDatos y despues ejecutar apprest en un servidor tomcat y abrir en un navegador index.html que esta en appclient_

Mira **Despliegue** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Base de datos Mysql,Servidor Tomcat_


## Despliegue 📦


_Paso 1_

```
Descargar proyecto de github o clonar repositorio
```

_Paso 2_

```
Importar la base de datos que esta en apprest/BasesDeDatos en Mysql-Server
```
_Paso 3_

```
Desplegar aplicacion en servidor tomcat 
```
Como desplegar aplicacion en servidor tomcat:
https://javiergarciaescobedo.es/despliegue-de-aplicaciones-web/86-servidores-de-aplicaciones/312-despligue-de-aplicaciones-web-en-tomcat

_Paso 4_

```
Abrir en un navegador index.html que esta en appclient
```




## Versiones 📌

TODO
## Autor ✒️

* **Asier Galan** - *Desarrollo* - [chow22](https://github.com/Chow22)

## Licencia 📄

Este proyecto está bajo la Licencia (Freeware) 

