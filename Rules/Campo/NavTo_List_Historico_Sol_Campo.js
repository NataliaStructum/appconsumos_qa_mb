/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function NavTo_List_Historico_Sol_Campo(context) {
    let data = context.evaluateTargetPath('#Page:Filtro_Campo/#Control:almacen_campo/#Value')[0].BindingObject
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Campo').getClientData();
    clientData.centroH = data.centro
    clientData.almacenH = data.almacen
    clientData.sociedadH = data.sociedad
    clientData.lista_sol_historico_campo = []
    
    let filtro = `$expand=almacen,operario,aprobador,autorizador,equipo,orden&$filter=almacen_sociedad eq '${data.sociedad}' and almacen_almacen eq '${data.almacen}' and almacen_centro eq '${data.centro}' and tipo eq 'CAMPO' &$orderby=fecha_creacion desc`
    clientData.filtroHistoricoCampo = filtro;
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Campo/Lista_Historico_Campo.page"
        }
    });
}
