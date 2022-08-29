
# TPSistemasDistribuidos2022

## Autores ✒️
  

*  **Matias Nicolas Rivero** - *Desarrollo Servidor* - [Mathyz1](https://github.com/Mathyz1)

*  **Oscar Cesar Ruina** - *Desarrollo Servidor* - [OscarRuina](https://github.com/OscarRuina)

*  **Gonzalo Cerbelli** - *Desarrollo Cliente* - [Gonzacerbelli](https://github.com/Gonzacerbelli)

*  **Quimey Perez** - *Desarrollo Cliente* - [QuimeyPerez](https://github.com/QuimeyPerez)

  

## Cliente Python

#### Prerequisitos

Debemos contar con python instalado en nuestra computadora y actualizar pip con el comando `
python -m pip install --upgrade pip`. 

Luego se instala [Flask](https://flask.palletsprojects.com/en/2.2.x/installation/) con el comando `pip install flask`. 
Además instalamos [GRPC](https://grpc.io/docs/languages/python/quickstart/) para python con los comandos
```
python -m pip install grpcio
python -m pip install grpcio-tools
```

Para compilar Proto debemos correr el siguiente comando
```
python -m grpc_tools.protoc -I../protos --python_out=. --grpc_python_out=. ../protos/helloworld.proto
```

#### Iniciar aplicación
Para inicializar el cliente en python debemos ubicarnos en la carpeta `/cliente` y correr el comando `python -m flask run` para iniciar la API corriendo Flask.

La aplicación correrá en localhost bajo el puerto 5000: `http://127.0.0.1:5000/`

#### Métodos
GET /helloWorldCliente

## Servidor 
* **IDE:** Intelij https://www.jetbrains.com/es-es/idea/download/#section=windows version community.
* **Lenguaje:** Java 11
* **Framework:** Spring 
* **Manejador de dependencias:** Gradle
* **Base de Datos:** MySQL, crear una base de datos llamada **db**. El usuario y contraseña default es root - root.
* Para Iniciar el servidor ubicar la clase ServicegrpcApplication, click derecho y la opcion run.
* El servidor de grcp inicia en el puerto **9090**.
* Usar el programa BloomRPC y probarlo.
* Agregar el archivo proto generado, esta en la carpeta proto, veran los metodos, en la url poner localhost:9090, para finalziar click en el boton verde.

