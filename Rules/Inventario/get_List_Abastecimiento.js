/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function get_List_Abastecimiento(context) {
    const pageProxy = context.getPageProxy();
    let almacenes = context.evaluateTargetPath('#Page:Lista_Solicitudes_Reabastecimiento/#Control:FormCellListPicker_Almacenes_Sol/#Value');
    let clientData = context.evaluateTargetPathForAPI('#Page:Inicio_Inventario').getClientData();
    var list_component = pageProxy.getControl("SectionedTable0").getSection("SectionObjectTable0");
    let clientDataUser = context.evaluateTargetPathForAPI('#Page:Main').getClientData();

    if (almacenes < 1) {
        clientData.lista_abast = []
        return list_component.redraw()
    }
    

    let data = almacenes[0].BindingObject;
    let filtro = `$filter=almacen_sociedad eq '${data.sociedad}' and almacen_almacen eq '${data.almacen}' and almacen_centro eq '${data.centro}' and tipo eq 'ABASTECIMIENTO' &$orderby=fecha_creacion desc`
    let isTecnico = clientDataUser.info_user.rol === 'Técnico'
    if(isTecnico){
        let correo = clientDataUser.info_user.correo
        filtro = `$filter=almacen_sociedad eq '${data.sociedad}' and almacen_almacen eq '${data.almacen}' and almacen_centro eq '${data.centro}' and tipo eq 'ABASTECIMIENTO' and correo_creacion eq '${correo}' &$orderby=fecha_creacion desc`
    }
    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'Solicitudes', [], filtro).then(async (results) => {
        
        if (results && results.length > 0) {
            clientData.lista_abast = results
            list_component.redraw()
        }else{
            clientData.lista_abast = []
            list_component.redraw()
        }
    }).catch((error) => {
       
        alert(`Error ${error.message}`)
    });


    //lista_abast
}
