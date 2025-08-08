export default function get_List_Ingenio_Equipo(context) {
    const pageProxy = context.getPageProxy();
    let equipos = context.evaluateTargetPath('#Page:Lista_Ordenes_Ingenio/#Control:FormCellListPicker_Equipos_Ord/#Value');
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Ingenio').getClientData();
    var list_component = pageProxy.getControl("SectionedTable0").getSection("SectionObjectTable0");

    if (equipos.length < 1) {
        clientData.lista_ingenio = [];
        return list_component.redraw();
    }

    let filtro = '$filter=(';

    // Construye filtro por equipos
    equipos.forEach(e => {
        filtro += `equipo eq '${e.BindingObject.equipo}' or `;
    });

    filtro = filtro.slice(0, -4); // Elimina último ' or '

    // Agrega condición para excluir orden_desc que contiene 'CAMPO, INSPECCION Y MTTO'
    filtro += ") and not contains(orden_desc, 'CAMPO, INSPECCION Y MTTO')";

    let query = filtro + "&$orderby=fecha_creacion desc";

    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'Ordenes', [], query).then(async (results) => {
        if (results && results.length > 0) {
            clientData.lista_ingenio = results;
            list_component.redraw();
        } else {
            clientData.lista_ingenio = [];
            list_component.redraw();
        }
    });
}
