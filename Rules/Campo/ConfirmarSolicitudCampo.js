/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function ConfirmarSolicitudCampo(context) {

    const pageProxy = context.getPageProxy();
    var materiales = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell1")


    if (materiales.getVisible()) {
        //Falta validar que si se hayan agregado todos los materiales a la solicitud

        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Confirmación",
                "Message": "¿Estás seguro de que deseas confirmar la solicitud aprobada por ítems?",
                "OKCaption": "Aceptar",
                "OnOK": "",
                "CancelCaption": "Cancelar"
            }
        })
    } else {

        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Confirmación",
                "Message": "¿Estás seguro de que deseas confirmar la solicitud con las cantidades originales solicitadas?",
                "OKCaption": "Aceptar",
                "OnOK": "",
                "CancelCaption": "Cancelar"
            }
        })

    }
}
