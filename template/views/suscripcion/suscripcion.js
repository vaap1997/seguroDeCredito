
$.ready(function(){
  $("#tablaRiesgos").hide();
})

function comprobarRiesgo(){
  var ruc = $("#rut").val();
  if(!ruc){
    alert("Ingresar ruc")
  }else{
    $("#tablaRiesgos").hide();
    $("#riskConsultBody").html('');
    $.ajax( {
      url:'../../assets/json/consultaRiesgo.json',
      data: {
        ruc: $("#rut").val()
      },
      type: "GET",
      success: function(data) {
              prorrogas = data;
              data.forEach(function(item, index){
                $("#riskConsultBody").append(`
                    <tr>
                      <td><input type="checkbox" id="suscripcion-${index}" onclick="agregarSiniestro(${index})"></td>
                      <td>${item.ruc}</td>
                      <td>${item.razonSocial}</td>
                      <td>${item.cumulo}</td>
                      <td>${item.riesgoVigente}</td>
                      <td>${item.estado}</td>
                      <td>${item.grupoEconomico}</td>
                      <td>${item.prorroga}</td>
                      <td>${item.siniestros}</td>
                      <td>${item.equifax}</td>
                      <td>${item.fechaActualizacion}</td>
                    </tr>`)
              })
              $("#tablaRiesgos").show();
          }
        }
      )

  }

}

function descargarFormato() {
	$.ajax({
		url:'../../assets/json/getPantillaProrrogas.json',
		data: {},
		type: "GET",
		success: function(data) {
			downloadByBase64(data.base64, data.filename)
		}
	})
}

var fileToUpload = {};

function getFilename(event) {
	fileToUpload = {};
	fileChange(event, fileToUpload);
}

function comprobarRiesgoMasivo(){
	if(fileToUpload.filename) {
		$("#riskConsultBody").html('');
		$.ajax( {
			url:'../../assets/json/consultaRiesgo.json',
			data: fileToUpload,
			type: "POST",
			success: function(data, index) {
        prorrogas = data;
				data.forEach(function(item){
					$("#prorrogaConsultBody").append(`
						<tr>
            <td><input type="checkbox" id="suscripcion-${index}" onclick="agregarSiniestro(${index})"></td>
            <td>${item.ruc}</td>
            <td>${item.razonSocial}</td>
            <td>${item.cumulo}</td>
            <td>${item.riesgoVigente}</td>
            <td>${item.estado}</td>
            <td>${item.grupoEconomico}</td>
            <td>${item.prorroga}</td>
            <td>${item.siniestros}</td>
            <td>${item.equifax}</td>
            <td>${item.fechaActualizacion}</td>
						</tr>`
					);

					$('#busquedaMasivaFile').val('');
					fileToUpload = {};
				})
		     $("#tablaRiesgos").show()
			}
		});
	}
}

var prorrogas = [];
var prorrogasSeleccionadas = [];

function agregarSiniestro(index) {
	indexOf = prorrogasSeleccionadas.indexOf(index);
	if(indexOf == -1) {
		prorrogasSeleccionadas.push(index);
	} else {
		prorrogasSeleccionadas.splice(indexOf, 1);
	}

	if(prorrogasSeleccionadas.length == prorrogas.length) {
		$('#checkboxTodosSiniestros').prop("checked",true);
	} else {
		$("#checkboxTodosSiniestros").prop('checked', false);
	}
}

function seleccionarTodosSiniestros() {
	prorrogasSeleccionadas = [];
	prorrogas.forEach(function(item, index){
		if($('#checkboxTodosSiniestros:checked').length) {
      console.log("funciona");
			prorrogasSeleccionadas.push(index);
			$('#suscripcion-'+index).prop("checked",true);
		} else {
			$('#suscripcion-'+index).prop("checked",false);
		}
	});
}
