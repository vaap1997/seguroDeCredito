
$.ready(function(){
  $("#nav-tabContentProrroga").hide();
})

function buscardeudor(){
  var ruc = $("#RUC").val();
  var numFactura = $("#Factura").val();
  if( !ruc || !numFactura){
    alert("Ingrese ambos campos")
  }else{
    $.ajax( {
      url:'../../assets/json/getDeudor.json',
      data: {
        rucDeudor: $("#RUC").val(),
        numFactura: $("#Factura").val()
      },
      type: "GET",
      success: function(data) {
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
              $("#tablaProrrogas").hide()
              $("#nav-tabContentProrroga").show()
          }
        }
      )


  }

}

function comprobarProrrogas(){
  var ruc = $("#rut").val();
  $.ajax( {
    url:'../../assets/json/getMasiveDeudor.json',
    type: "GET",
    success: function(data) {
            data.forEach(function(item){
              $("#prorrogaConsultBody").append(`
                  <tr>
                    <td>${item.rucDeudor}</td>
                    <td>${item.razonSocial}</td>
                    <td>${item.nroPoliza}</td>
                    <td>${item.asegurado}</td>
                    <td>${item.factura}</td>
                    <td>${item.prorrogasAnterior}</td>
                    <td>${item.nroProrroga}</td>
                    <td>${item.estadoProrroga}</td>
                  </tr>`)
            })
            $("#nav-tabContentProrroga").hide();
            $("#tablaProrrogas").show()
        }
      }
    )
}
