/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function filter_Read_ZBIW_MARDT(context) {
    let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Solicitud_Abast').getClientData();

    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'AlmacenesApp', [], `$filter=sociedad eq '${clientDataFiltro.almacen_abast.sociedad}' and almacen ne '${clientDataFiltro.almacen_abast.almacen}'`).then(async (results) => {
        
        if (results && results.length > 0) {
            let filtro = `$filter=Werks eq '${clientDataFiltro.almacen_abast.centro}' and Spras eq 'ES' and contains(Txtmd, 'BORRADO') eq false and contains(Txtmd, 'BORRAR') eq false and contains(Txtmd, 'BORRAD_') eq false and (`

            results.forEach(e => {
                filtro += `Lgort eq '${e.almacen}' or `      
            });

            clientDataFiltro.filtroMaterial = filtro.slice(0, -4)+")&$orderby=Matnr"
            return context.executeAction("/appconsumos_qa_mb/Actions/oData/Read_ZBIW_MARDTSet.action");

        } 
    }).catch((error) => {
        
        alert(`Error al obtener los almacenes ${error.message}`)
    });
}
