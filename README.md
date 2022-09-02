
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
GET /
Return hello world

GET /user
Return user by id

POST /user
Register new user

## Servidor Java con Spring
#### Prerequisitos:
  * Tener instalado el **IDE:** [Intelij](https://www.jetbrains.com/es-es/idea/download/#section=windows) version community. Se puede usar cualquier otro que tenga compatibilidad con el framework **Spring**, pero se recomienda usar el Intelij
  * Tener instalado el jdk **Java 11**.
  * Tener instalado el [MySQL](https://dev.mysql.com/downloads/workbench/), con usuario y contraseña root, crear una base de datos llamada **db**.
  * Tener instalado el [BloomRPC](https://github.com/bloomrpc/bloomrpc/releases) , descargar el setup.exe si el sistema operativo  usado es Windows. 
#### Correr la aplicacion:
  * Se utiliza como gestor de dependencias **Gradle**, no es necesario tenerlo instalado si se usa el Intelij, ya que carga las dependencias automaticamente. 
  * Para Iniciar el servidor ubicar la clase **ServicegrpcApplication**, click derecho y la opcion run.
  * El servidor de grcp inicia en el puerto **9090**.
  * Abrir el BloomRPC, agregar los archivos proto generados mediante el boton + , estan en la carpeta proto del proyecto correspondiente al servidor, en la url poner **localhost:9090**.
  * En el explorador veran los archivos protos y los metodos, click en algun metodo y en la parte central se carga el json con los datos default, cambiar los datos por los que quieran y pulsar el boton verde del medio. Al lado derecho veran la respuesta.
#### Metodos: 
  * Get/User: recibe un id de usuario y retorna un usuario.
  * Register/User: recibe los parametros indicados en el trabajo practico y retorna el usuario creado, ademas se crea la billetera virtual con saldo 0.
  * Add/Wallet: recibe el monto a agregar a la billetera y el id de usuario al que pertenece y retorna la billetera.
  * Subtract/Wallet: recibe el monto a descontar a la billetera y el id de usuario al que pertenece y retorna un mensaje "Operation Success".
  * Login/User: recibe username and password y retorna lo mismo.
  * Logout/User: no recibe nada y retorna un mensaje.
  * Create/Product: 
  ![create product](https://user-images.githubusercontent.com/31217980/188204343-fbc13ba5-8ce4-497c-ba2d-08f9b066cc4e.PNG)
  , retorna lo mismo mas el id de producto.
  * Update/Product: recibe el mismo request que el create mas el id de producto, retorna lo mismo.
  * GetProductByUserId/Product: recibe el id de usuario y retorna una lista de productos que le pertenecen.
  * GetProductDistinctByUserId/Product: recibe un id de usuario y retorna una lista de los productos que no le pertenecen. 
  * Estos dos metodos son importantes, el primero responde a la consigna de listar los productos que le pertenecen a un usuario y el segundo a las compras listando los otros productos. 
  * Listados/Producto: distintos listados reciben disitntos parametros y retornan las listas filtradas por esos parametros.
  
  
