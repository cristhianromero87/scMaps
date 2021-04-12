<html>
  <head>
    <title>GeoVisor GADI</title>

    <link rel="stylesheet" href="css/leaflet.css" />
    <!--[if lte IE 8]><link rel="stylesheet" href="js/leaflet.ie.css" /><![endif]-->
    <link rel="stylesheet" type="text/css" href="css/estilos.css">

    <script src="js/leaflet.js"></script>
    <script src="js/jquery-1.8.2.min.js"></script>
  </head>
  <body> 
      <div id="mapa"></div>
          <div id="buscador">
              <input type="text" name="direccion" value="" id="direccion" size="10" />
              <button type="button" onclick="direccion_buscador();">Buscador</button>
              <div id="resultado"/>
          </div>
          <script src="js/mapa.js"></script>
  </body>
</html>
