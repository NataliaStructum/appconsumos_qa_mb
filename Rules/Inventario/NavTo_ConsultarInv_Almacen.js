/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function NavTo_ConsultarInv_Almacen(context) {
    let almacen = context.evaluateTargetPath('#Page:Filtro_Almacen_Inventario/#Control:FormCellListPicker_Almacen_Inv/#Value');
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Inventario').getClientData();
    clientData.almacen_inventario = almacen;
    //alert(JSON.stringify(clientData.almacen_inventario[0]))

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Inventario/Consultar_Inventario_Almacenes.page",
        }
    });
}
