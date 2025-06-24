/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function get_Matnr_QueryRevisionAlmacenes(context) {

    let clientData = context.evaluateTargetPathForAPI('#Page:Revision_Solicitud_Reabastecimiento').getClientData();
    let clientDataAlm = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Solicitud_Abast').getClientData();
    

    let mat_nuevo = clientData.infoMaterial.mat_nuevo
    let material = clientData.infoMaterial.material_material
    let value = ''

    if(mat_nuevo){
        value =  clientData.infoMaterial.mat_nuevo
    }

    if(material){
        value = clientData.infoMaterial.material_material.replace(/^0+/, '')
    }

    //let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Ingenio').getClientData();
 
    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'AlmacenesApp', [], `$filter=tipo eq 'INGENIO'`).then(async (results) => {
       
        if (results && results.length > 0) {
            let filtro = `$filter=Matnr eq '${value}' and Werks eq '${clientDataAlm.almacen_abast.centro}' and Spras eq 'ES' and contains(Txtmd, 'BORRADO') eq false and contains(Txtmd, 'BORRAR') eq false and contains(Txtmd, 'BORRAD_') eq false and (`
 
            results.forEach(e => {
                filtro += `Lgort eq '${e.almacen}' or `      
            });
 
            //clientDataFiltro.filtroMaterial = filtro.slice(0, -4)+")&$orderby=Matnr"
            //alert(clientDataFiltro.filtroMaterial)
            //el centro esta indefinido
            return filtro.slice(0, -4)+")&$orderby=Lgort"
            
 
        }
        return null;
    }).catch((error) => {
       
        alert(`Error al obtener los almacenes ${error.message}`)
    });

    //return `$filter=Matnr eq '${value}' and Spras eq 'ES' and contains(Txtmd, 'BORRADO') eq false and contains(Txtmd, 'BORRAR') eq false and contains(Txtmd, 'BORRAD_') eq false and Werks eq '${clientDataAlm.almacen_abast.centro}'&$orderby=Lgort`
}
