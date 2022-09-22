
# TPSistemasDistribuidos2022

  

## Autores ✒️

*  **Ariel Nicolas Heredia** - *Desarrollo Vista* - [Segneal](https://github.com/Segneal)

  

*  **Matias Nicolas Rivero** - *Desarrollo Servidor* - [Mathyz1](https://github.com/Mathyz1)

  

*  **Oscar Cesar Ruina** - *Desarrollo Servidor* - [OscarRuina](https://github.com/OscarRuina)

  

*  **Gonzalo Cerbelli** - *Desarrollo Cliente* - [Gonzacerbelli](https://github.com/Gonzacerbelli)

  

*  **Quimey Perez** - *Desarrollo Cliente* - [QuimeyPerez](https://github.com/QuimeyPerez)

  

## Vista: ReactJs

  

#### Prerequisitos

* Instalado Visual Studio Code. https://code.visualstudio.com/

* Instalado NodeJS. https://nodejs.org/es/

* Para ejecutar el servidor de vista se debe ubicar dentro de la carpeta distribuidos-frontend

* Por medio de terminal ejecutar el comando `$npm install` para instalar las dependencias de node.

* Ejecutar el comando `$npm start`

* La vista se ejecutara en puerto 3000 , http://localhost:3000

  

  

## Cliente Python

  

#### Prerequisitos

  

Debemos contar con python instalado en nuestra computadora y actualizar pip con el comando `

python -m pip install --upgrade pip`.

  

Luego se instala [Flask](https://flask.palletsprojects.com/en/2.2.x/installation/) con el comando `pip install flask`.

Además instalamos [GRPC](https://grpc.io/docs/languages/python/quickstart/) y [Kafka](https://kafka-python.readthedocs.io/en/master/) para python con los comandos

```

python -m pip install grpcio

python -m pip install grpcio-tools

python -m pip install kafka-python

```

  

Tambien es necesario instalar el cors, para no tener problemas con el cross-origin

```

pip install flask-cors

```

  

Para compilar Proto debemos correr los siguientes comandos en el root path y mover los archivos generados dentro de la carpeta cliente.

```

python -m grpc_tools.protoc -I./protos --python_out=. --grpc_python_out=. ./protos/product.proto

python -m grpc_tools.protoc -I./protos --python_out=. --grpc_python_out=. ./protos/shoppingcart.proto

python -m grpc_tools.protoc -I./protos --python_out=. --grpc_python_out=. ./protos/user.proto

python -m grpc_tools.protoc -I./protos --python_out=. --grpc_python_out=. ./protos/wallet.proto

python -m grpc_tools.protoc -I./protos --python_out=. --grpc_python_out=. ./protos/auction.proto

```

Los archivos generados deberían ser:

* product_pb2_grpc.py

* product_pb2.py

* shoppingcart_pb2_grpc.py

* shoppingcart_pb2.py

* user_pb2_grpc.py

* user_pb2.py

* wallet_pb2_grpc.py

* wallet_pb2.py


#### Iniciar aplicación

Para inicializar el cliente en python debemos ubicarnos en la carpeta `/cliente` y correr el comando `python -m flask run` para iniciar la API corriendo Flask.


La aplicación correrá en localhost bajo el puerto 5000: `http://127.0.0.1:5000/`

#### Kafka
Se utiliza kafka desde el cliente para producir mensajes desde la vista y consumirlos desde el servidor.

En windows descargar [WLS](https://docs.microsoft.com/es-es/learn/modules/get-started-with-windows-subsystem-for-linux/) para ejecutar Linux desde Windows y así poder instalar Kafka. Dentro del Linux, descargar [Kafka](https://kafka.apache.org/) y Zookeeper. Se puede ver [este tutorial](https://www.conduktor.io/kafka/how-to-install-apache-kafka-on-windows) de como descargar, instalar y configurar las herramientas y [este video]([este tutorial]).

Correr Zookeeper en WLS
`bin/zookeeper-server-start.sh config/zookeeper.properties`

Correr servidor de Kafka en WLS
`JMX_PORT=8004 bin/kafka-server-start.sh config/server.properties`

###### *correr los comandos sobre el directorio de kafka. 

El cliente cuenta con los métodos REST los cuales permitirán escribir (producer) y escuchar (consumer) mensajes en Kafka y ver información.
Estos métodos son:
* GET /topics?groupId={groupId}: devuelve los tópicos a los cuales está suscripto un consumer
* GET /consumer-groups: devuelve los consumers existentes en el servidor de Kafka
* GET /messages?groupId={groupId}&topic={topicName}: devuelve los mensajes todavía no commiteados de un consumer sobre un tópico específico. También devuelve la cantidad de mensajes restantes a escuchar bajo la key "*consumer_total_lag*".
* POST /messages?topic={topicName}: permite enviar los mensajes a un tópico específico para ser escritos en Kafka. El body recibe un JSON con la key igual al "topicName" y el value es un array de mensajes JSON, por ej:

	```
	POST /messages?topic=orders

	Body:
	{
		"orders": [
			{"orderId": "1", "products": [productsItems], "price": 600},
			{"orderId": "2", "products": [productsItems], "price": 252}
		]
	}
	```

## Servidor Java con Spring

#### Prerequisitos:

* Tener instalado el **IDE:** [Intelij](https://www.jetbrains.com/es-es/idea/download/#section=windows) version community. Se puede usar cualquier otro que tenga compatibilidad con el framework **Spring**, pero se recomienda usar el Intelij

* Tener instalado el jdk **Java 11**.

* Tener instalado el [MySQL](https://dev.mysql.com/downloads/workbench/), con usuario y contraseña root, crear una base de datos llamada **db**.

* Tener instalado el [BloomRPC](https://github.com/bloomrpc/bloomrpc/releases) , descargar el setup.exe si el sistema operativo usado es Windows.

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

* Create/Product: retorna lo mismo mas el id de producto.

![create product](https://user-images.githubusercontent.com/31217980/188204343-fbc13ba5-8ce4-497c-ba2d-08f9b066cc4e.PNG)

* Update/Product: recibe el mismo request que el create mas el id de producto, retorna lo mismo.

* GetProductByUserId/Product: recibe el id de usuario y retorna una lista de productos que le pertenecen.

* GetProductDistinctByUserId/Product: recibe un id de usuario y retorna una lista de los productos que no le pertenecen.

* Estos dos metodos son importantes, el primero responde a la consigna de listar los productos que le pertenecen a un usuario y el segundo a las compras listando los otros productos.

* GetProductPurchasesByUserId/Product: recibe un id de usuario y devuelve una lista de productos comprados por el usuario.

* Listados/Producto: distintos listados reciben disitntos parametros y retornan las listas filtradas por esos parametros.

* Comprar/Product: recibe los productos a comprar y devuelve los productos comprados.
