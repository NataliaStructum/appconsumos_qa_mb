/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Confirmar_Revision_Ingenio(context) {
    const pageProxy = context.getPageProxy();
    var materiales = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell1")

    let id_solicitud = context.binding.id;
    //let filtro = `$expand=almacen&$filter=solicitud_id eq ${id_solicitud}`;
    let filtro = `$filter=solicitud_id eq ${id_solicitud}`;
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitudes_Ingenio').getClientData();
    let listaDeAgregados = clientData.lista_mat_solicitud_ing;


    if (materiales.getVisible()) {
        //validar que si se hayan agregado todos los materiales a la solicitud
        return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'ComponentesSolicitud', [], filtro).then(async (results) => {
            if (results && results.length > 0) {
                let totalComponentes = results.length;

                if (listaDeAgregados.length == totalComponentes) {
                    return context.executeAction({
                        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                        "Properties": {
                            "Title": "Confirmación",
                            "Message": "¿Estás seguro de que deseas confirmar la solicitud aprobada por ítems?",
                            "OKCaption": "Aceptar",
                            "OnOK": "/appconsumos_qa_mb/Actions/oData/Update_SolicitudesApp_Confirmar_Ingenio.action",
                            "CancelCaption": "Cancelar"
                        }
                    })

                } else if (listaDeAgregados.length < totalComponentes) {
                    return context.executeAction({
                        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                        "Properties": {
                            "Title": "Solicitud No Confirmada",
                            "Message": "No puedes confirmar la solicitud hasta que se hayan agregado todos los materiales."
                        }
                    })
                }


            } else {
                return context.executeAction({
                    "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Error",
                        "Message": "Error al tratar de traer los componentes de la solicitud"
                    }
                })
            }


        }).catch((error) => {
            alert(`Error ${error.message}`);
        });

    } else {

        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Confirmación",
                "Message": "¿Estás seguro de que deseas confirmar la solicitud con las cantidades originales solicitadas?",
                "OKCaption": "Aceptar",
                "OnOK": "/appconsumos_qa_mb/Actions/oData/Update_SolicitudesApp_Confirmar_Ingenio.action",
                "CancelCaption": "Cancelar"
            }
        })

    }

}
