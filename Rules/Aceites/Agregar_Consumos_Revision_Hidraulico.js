/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Agregar_Consumos_Revision_Hidraulico(context) {
    const pageProxy = context.getPageProxy();
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Aceite_Hidraulico').getClientData();
    let registro_consumo_value = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Hidraulico/#Control:registro_consumo/#Value');
    let clmov_value = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Hidraulico/#Control:orden_obj/#Value');
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

    if(clmov_value.length < 1){
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Orden No Seleccionada",
                "Message": `Debes seleccionar una clase de movimiento para continuar`
            }
        });
    }

    let dataConsumo = registro_consumo_value[0].BindingObject
    let clase_mov = clmov_value[0].ReturnValue
    //tipoData = tipo[0].DisplayValue;
    //tipoData = tipo[0].ReturnValue

    const duplicado = clientData.lista_revision_hidraulico.filter(m => m.pos === dataConsumo.pos).length > 0

    if (duplicado) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Consumo No Agregado",
                "Message": `El consumo ya fue ingresado anteriormente`
            }
        });
    }
    
    dataConsumo.clase_mov = clase_mov
    clientData.lista_revision_hidraulico.push(dataConsumo)
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
