/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function get_List_Campo_Equipo(context) {
    const pageProxy = context.getPageProxy();
    let equipos = context.evaluateTargetPath('#Page:Lista_Ordenes_Campo/#Control:filtro_equipos/#Value');
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Campo').getClientData();
    var list_component = pageProxy.getControl("SectionedTable0").getSection("SectionObjectTable0");

    if (equipos.length < 1) {
        clientData.lista_campo = [];
        return list_component.redraw();
    }

    let filtro = '$filter=(';

    // Filtro por equipos
    equipos.forEach(e => {
        filtro += `equipo eq '${e.BindingObject.equipo}' or `;
    });
    filtro = filtro.slice(0, -4); // Eliminar el último ' or '

    filtro += ") and contains(orden_desc, 'CAMPO, INSPECCION Y MTTO')";

    let query = filtro + "&$orderby=fecha_creacion desc";

    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'Ordenes', [], query).then(async (results) => {
        if (results && results.length > 0) {
            clientData.lista_campo = results;
            list_component.redraw();
        } else {
            clientData.lista_campo = [];
            list_component.redraw();
        }
    });

}
