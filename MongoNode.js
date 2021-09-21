// variables de mqtt

var  mqtt  =  require ( 'mqtt' ) ; // obtener el paquete mqtt
var  hostMqtt  =  "localhost" ;
 puerto  var =  1883 ;
// variables de mongo db
var  mongodb  =  require ( 'mongodb' ) ;
var  mongodbClient  =  mongodb . MongoClient ;
var  mongodbURI  =  'mongodb: // localhost: 27017 / casa' ;
var  topicSubscribe  =  "casa / + / luz" ;

var  clientMqtt ;

function  conectionCreate ( error ,  cliente )  {
    si  ( error )  arrojar  error ;

    var  database  =  cliente . db ( "iotDbTest" ) ;
     colección  var =  base de datos . colección ( "casa" ) ;

    clientMqtt  =  mqtt . conectar ( {  host : hostMqtt ,  puerto : puerto  } ) ;
    clientMqtt . suscribirse ( topicSubscribe ) ;
    clientMqtt . on ( "mensaje" ,  función  ( tema ,  mensaje )  {
        var  messageDecrypt  =  mensaje . toString ( 'utf8' ) ;
        prueba  {
            consola . log ( mensaje ,  messageDecrypt ) ;
            messageDecrypt  =  JSON . analizar ( messageDecrypt ) ;
            let  str  =  tema ;
            var  datoDeEntrada  =  messageDecrypt ;
            var  obj = { } ;
            var  objOriginal = obj ;
            var  arr  =  str . dividir ( "/" ) ;
            arr . forEach ( función ( elemento , índice ) {
                obj [ elemento ] = índice == arr . longitud - 1 ? datoDeEntrada : { } ;
                obj = obj [ elemento ] ;
            } ) ;
            consola . log ( objOriginal ) ;
            var  objToInsert  =  {  tema : tema ,  datos : objOriginal  } ;
            colección . insertOne ( objToInsert ,  function  ( err ,  res )  {
                si  ( err )  lanzar  err ;
                consola . log ( "El valor:"  +  messageDecrypt  +  "está en la db" ) ;
            } ) ;
        }  captura  ( e )  {
            consola . log ( "Existe un error en los datos" ) ;
        }
    } ) ;
}

mongodb . connect ( mongodbURI ,  conectionCreate ) ;
