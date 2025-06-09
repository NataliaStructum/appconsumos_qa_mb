/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function get_List_Ingenio_Equipo(context) {
    const pageProxy = context.getPageProxy();
    let equipos = context.evaluateTargetPath('#Page:Lista_Ordenes_Ingenio/#Control:FormCellListPicker_Equipos_Ord/#Value');
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Ingenio').getClientData();
    var list_component = pageProxy.getControl("SectionedTable0").getSection("SectionObjectTable0")

    if (equipos < 1) {
        clientData.lista_ingenio = []
        return list_component.redraw()
    }

    let filtro = '$filter='

    equipos.forEach(e => {
        filtro += `equipo eq '${e.BindingObject.equipo}' or`      
    });

    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'Ordenes', [], filtro.slice(0, -3)).then(async (results) => {
        if (results && results.length > 0) {
            alert(results.length)
            clientData.lista_ingenio = results
            list_component.redraw()
        }else{
            clientData.lista_ingenio = []
            list_component.redraw()
        }
    })

}
