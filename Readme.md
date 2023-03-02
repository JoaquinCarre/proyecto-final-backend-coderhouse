# Desafío 25 - Entrega del Proyecto Final

## Instalación
Para bajar la aplicación de github escribir el siguiente comando en la terminal:
```
git clone "https://github.com/JoaquinCarre/proyecto-final-backend-coderhouse"
```

Luego asegurarse de instalar todas las dependencias con el siguiente comando:
```
npm i
```

## Ejecución
Antes de ejecutar la aplicación asegurarse de crear un archivo '.env' con los siguientes datos:
```
ENV='local'
MONGO_PASS=GxX3qu1J5iQISADf
NODEMAILER_PASS=iltmkxqktfldqbiv
MAIL_NODEMAILER='joa_carre21@hotmail.com'
```

Luego, ejecutar la aplicación con el comando:
```
npm run dev
```

## Información adicional
- En la versión 0.0.1 la creación del carrito se compartirá por todos los usuarios, solo se realizó para demostrar que funciona la modificación de este. En próximas versiones se cambiará para que haya un carrito generado por usuario registrado.

- Cambiar en el archivo '.env' el valor de MAIL_NODEMAILER por el email destinatario al cual desees que llegue al registrarse un nuevo usuario o al realizar una compra del carrito.