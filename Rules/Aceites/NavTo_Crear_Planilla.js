/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function NavTo_Crear_Planilla(context) {
    let centro = context.evaluateTargetPath('#Page:Filtro_Aceites/#Control:almacen_aceites/#Value')[0].BindingObject.centro
    let almacen = context.evaluateTargetPath('#Page:Filtro_Aceites/#Control:almacen_aceites/#Value')[0].BindingObject.almacen
    let sociedad = context.evaluateTargetPath('#Page:Filtro_Aceites/#Control:almacen_aceites/#Value')[0].BindingObject.sociedad
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Aceites').getClientData();
    clientData.centro_aceite_planilla = centro
    clientData.almacen_aceite_planilla = almacen
    clientData.sociedad_aceite_planilla = sociedad
    clientData.aceite_num_planilla = ""
    clientData.lista_aceites = []


    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Aceites/Crear_Planilla_Consumo.page"
        }
    });
}
