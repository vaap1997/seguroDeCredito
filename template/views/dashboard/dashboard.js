$(function(){
  console.log("fdf");
  topRiesgo();
})

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
              $("#prorrogaConsultBody").append(`
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
              $("#prorrogaConsultBody").append(`
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
              $("#prorrogaConsultBody").append(`
                  <tr>
                    <td>${item.rucDeudor}</td>
                    <td>${item.razonSocial}</td>
                    <td>${item.antigua}</td>
                    <td>${item.nueva}</td>
                  </tr>`)
            })
        }
      }
    )
}
