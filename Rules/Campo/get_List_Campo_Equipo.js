/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function get_List_Campo_Equipo(context) {
    const pageProxy = context.getPageProxy();
    let equipos = context.evaluateTargetPath('#Page:Lista_Ordenes_Campo/#Control:filtro_equipos/#Value');
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Campo').getClientData();
    var list_component = pageProxy.getControl("SectionedTable0").getSection("SectionObjectTable0")

    if (equipos < 1) {
        clientData.lista_campo = []
        return list_component.redraw()
    }

    let filtro = '$filter='

    equipos.forEach(e => {
        filtro += `equipo eq '${e.BindingObject.equipo}' or`      
    });

    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'Ordenes', [], filtro.slice(0, -3)+"&$orderby=fecha_creacion desc").then(async (results) => {
        if (results && results.length > 0) {
            alert(results.length)
            clientData.lista_campo = results
            list_component.redraw()
        }else{
            clientData.lista_campo = []
            list_component.redraw()
        }
    })

}
