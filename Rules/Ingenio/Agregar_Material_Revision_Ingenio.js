/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Agregar_Material_Revision_Ingenio(context) {
    const pageProxy = context.getPageProxy();
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitudes_Ingenio').getClientData();
    //clientData.lista_mat_solicitud_ing

    let material = context.evaluateTargetPath('#Page:Revision_Solicitud_Ingenio/#Control:FormCellListPicker_Materiales/#Value');
    let cant = context.evaluateTargetPath('#Page:Revision_Solicitud_Ingenio/#Control:FormCellSimpleProperty_Cantidad/#Value');
    var list_component = pageProxy.getControl("SectionedTable0").getSection("SectionObjectTable0");

    let data = material[0].BindingObject
    let stock = data.stock_disponible

    if (!cant || cant < 0) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Alerta",
                "Message": `Debes ingresar una cantidad válida para continuar`
            }
        });
    }

    const duplicado = clientData.lista_mat_solicitud_ing.filter(m => m.mat_nuevo === data.mat_nuevo && m.almacen_almacen === data.almacen_almacen).length > 0

    if (duplicado) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Alerta",
                "Message": `El material ya fue ingresado anteriormente`
            }
        });
    }

    data.cant = cant
    data.aprobado = 'Aprobado'
    clientData.lista_mat_solicitud_ing.push(data);

    list_component.redraw()
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericToastMessage.action",
        "Properties": {
            "Message": `Material aprobado`,
            "Duration": 1,
            "ShowActivityIndicator": true,
        }
    });
    
    

    
}
