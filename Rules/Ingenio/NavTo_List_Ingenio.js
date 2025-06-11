/**
 * Describe this function...
 * @param {context} clientAPI
 */
export default function NavTo_List_Ingenio(context) {
    let centro = context.evaluateTargetPath('#Page:Filtro_Ingenio/#Control:FormCellListPicker_Almacen_O/#Value')[0].BindingObject.centro
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Ingenio').getClientData();
    clientData.centro_ingenio = centro
    clientData.lista_ingenio = []
    alert

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Ingenio/Lista_Ordenes_Ingenio.page"
        }
    });
}
