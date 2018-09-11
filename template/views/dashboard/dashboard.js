
$.ready(function(){
  $("#nav-tabContentProrroga").hide();
})

function topRiesgo(){
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
            $("#nav-tabContentProrroga").hide();
            $("#tablaProrrogas").show()
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
            $("#nav-tabContentProrroga").hide();
            $("#tablaProrrogas").show()
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
            $("#nav-tabContentProrroga").hide();
            $("#tablaProrrogas").show()
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
            $("#nav-tabContentProrroga").hide();
            $("#tablaProrrogas").show()
        }
      }
    )
}
