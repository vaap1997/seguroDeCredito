$(function(){
  topRiesgo();
  topProrrogas();
  topCambioCalificacion();
  lineGraphicData();
})

function lineGraphicData(){
  $.ajax( {
    url:'../../assets/json/flot-data.json',
    type: "GET",
    success: function(data) {
          var linearGraphic = [{
              data: data.riesgos,
              label: "Riesgo(S/.)"
          }, {
              data: data.prorrogas,
              label: "Prórrogas(S/.)"
          }, {
              data: data.siniestros,
              label: "Siniestros(S/.)"
          }]
          doPlot("right",linearGraphic);
        }
      }
    )
}




function topRiesgo(){
  console.log("fjnkjf");
  $.ajax( {
    url:'../../assets/json/getInfoDashboard.json',
    type: "GET",
    success: function(data) {
            data.forEach(function(item){
              $("#topRiesgoTableBody").append(`
                  <tr>
                    <td>${item.rucDeudor}</td>
                    <td>${item.razonSocial}</td>
                    <td>${item.montoRiesgo}</td>
                  </tr>`)
            })
        }
      }
    )
}

function topProrrogas(){
  var ruc = $("#rut").val();
  $.ajax( {
    url:'../../assets/json/getInfoDashboard.json',
    type: "GET",
    success: function(data) {
            data.forEach(function(item){
              $("#topProrrogasTableBody").append(`
                  <tr>
                    <td>${item.rucDeudor}</td>
                    <td>${item.razonSocial}</td>
                    <td>${item.montoRiesgo}</td>
                  </tr>`)
            })
        }
      }
    )
}

function topRiesgoPGP(){
  var ruc = $("#rut").val();
  $.ajax( {
    url:'../../assets/json/getInfoDashboard.json',
    type: "GET",
    success: function(data) {
            data.forEach(function(item){
              $("#topProrrogasTableBody").append(`
                  <tr>
                    <td>${item.rucDeudor}</td>
                    <td>${item.razonSocial}</td>
                    <td>${item.montoRiesgo}</td>
                  </tr>`)
            })
        }
      }
    )
}

function topCambioCalificacion(){
  var ruc = $("#rut").val();
  $.ajax( {
    url:'../../assets/json/cambioCalificacion.json',
    type: "GET",
    success: function(data) {
            data.forEach(function(item){
              $("#topCalificacionTableBody").append(`
                  <tr>
                    <td>${item.rucDeudor}</td>
                    <td>${item.razonSocial}</td>
                    <td>${item.montoRiesgo}</td>
                    <td>${item.antigua}</td>
                    <td>${item.nueva}</td>
                  </tr>`)
            })
        }
      }
    )
}
