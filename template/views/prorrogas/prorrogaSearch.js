
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

var prorrogas = [];
var prorrogasSeleccionadas = [];

function comprobarProrrogas(){
	if(fileToUpload.filename) {
		$("#prorrogaConsultBody").html('');
		prorrogas = [];
		prorrogasSeleccionadas = [];
		$.ajax( {
			url:'../../assets/json/getMasiveDeudor.json',
			data: fileToUpload,
			type: "POST",
			success: function(data) {
				prorrogas = data;
				data.forEach(function(item, index){
					$("#prorrogaConsultBody").append(`
						<tr>
						<td><input type="checkbox" id="prorroga-${index}" onclick="agregarProrroga(${index})"></td>
						<td>${item.rucDeudor}</td>
						<td>${item.razonSocial}</td>
						<td>${item.nroPoliza}</td>
						<td>${item.asegurado}</td>
						<td>${item.factura}</td>
						<td>${item.prorrogasAnterior}</td>
						<td>${item.nroProrroga}</td>
						<td>${item.estadoProrroga}</td>
						</tr>`
					);
					
					$('#busquedaMasivaFile').val(''); 
					fileToUpload = {};
				})
				$("#nav-tabContentProrroga").hide();
				$("#tablaProrrogas").show()
			}
		});
	}
}

function agregarProrroga(index) {
	indexOf = prorrogasSeleccionadas.indexOf(index);
	if(indexOf == -1) {
		prorrogasSeleccionadas.push(index);
	} else {
		prorrogasSeleccionadas.splice(indexOf, 1);
	}
	
	if(prorrogasSeleccionadas.length == prorrogas.length) {
		$('#checkboxTodasProrrogas').prop("checked",true);
	} else {
		$("#checkboxTodasProrrogas").prop('checked', false); 
	}
}

function seleccionarTodasProrrogas() {
	prorrogasSeleccionadas = [];
	prorrogas.forEach(function(item, index){
		if($('#checkboxTodasProrrogas:checked').length) {
			prorrogasSeleccionadas.push(index);
			$('#prorroga-'+index).prop("checked",true);
		} else {
			$('#prorroga-'+index).prop("checked",false);
		}
	});
}

function grabarProrrogas() {
	prorrogasParaGrabar = prorrogas.filter(function(item, index) { 		
		return prorrogasSeleccionadas.indexOf(index) != -1;
	})
	
	$.ajax({
		url:'../../assets/json/grabarProrrogas.json',
		data: {prorrogas: prorrogasParaGrabar},
		type: "POST",
		success: function(data) {
			alert('Las prorrogas han sido grabadas')
		}
	});
}