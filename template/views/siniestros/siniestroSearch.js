
$.ready(function(){
  $("#nav-tabContentProrroga").hide();
})

function buscardeudor(){
  $.getJSON('../../assets/json/getDeudor.json', function(data) {
      console.log(data);
      $("#RUC_deudor").html(data.rucDeudor);
      $("#RazónSocial").html(data.razonSocial);
      $("#Asegurado").html(data.asegurado);
      $("#NumProrroga").html(data.nroProrroga);
      $("#RazónSocial").html(data.razonSocial);
      $("#numFactura").html(data.factura);
      $("#prorroga_anterior").html(data.prorrogasAnterior);
      $("#NúmeroPóliza").html(data.nroPoliza);
      $("#EstadoPrórroga").html(data.estadoProrroga);
      $("#nav-tabContentProrroga").show()

  });
}
