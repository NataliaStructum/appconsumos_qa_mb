/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Agregar_Consumos_Revision(context) {
    const pageProxy = context.getPageProxy();
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Aceite_Motor').getClientData();
    let registro_consumo_value = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Motor/#Control:registro_consumo/#Value');
    let orden_value = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Motor/#Control:orden_obj/#Value');
    var list_component = pageProxy.getControl("SectionedTable0").getSection("SectionObjectTable0");
    
    if(registro_consumo_value.length < 1){
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Consumo No Seleccionado",
                "Message": `Debes seleccionar un consumo para continuar`
            }
        });
    }

    if(orden_value.length < 1){
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Orden No Seleccionada",
                "Message": `Debes seleccionar una orden para continuar`
            }
        });
    }

    let dataConsumo = registro_consumo_value[0].BindingObject
    let dataOrden = orden_value[0].BindingObject

    const duplicado = clientData.lista_revision_motor.filter(m => m.pos === dataConsumo.pos).length > 0

    if (duplicado) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Consumo No Agregado",
                "Message": `El consumo ya fue ingresado anteriormente`
            }
        });
    }
    
    dataConsumo.orden_orden = dataOrden.orden
    dataConsumo.reserva = dataOrden.reserva
    clientData.lista_revision_motor.push(dataConsumo)
    list_component.redraw()
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericToastMessage.action",
        "Properties": {
            "Message": `Consumo agregado`,
            "Duration": 1,
            "ShowActivityIndicator": true,
        }
    });
}
