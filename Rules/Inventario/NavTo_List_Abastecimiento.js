/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function NavTo_List_Abastecimiento(context) {
    let almacen = context.evaluateTargetPath('#Page:Filtro_Almacen_Solicitud_Abast/#Control:FormCellListPicker_Almacen_Reabast/#Value')[0].BindingObject;
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Solicitud_Abast').getClientData();
    clientData.almacen_abast = almacen;
    //alert(JSON.stringify(clientData.almacen_abast))
    
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Inventario/Lista_Solicitudes_Reabastecimiento.page"
        }
    });
}
