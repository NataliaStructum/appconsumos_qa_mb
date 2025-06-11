/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Query_Lista_Abast(context) {
    //let clientData = context.evaluateTargetPathForAPI('#Page:Inicio_Inventario').getClientData();
    let clientDataUser = context.evaluateTargetPathForAPI('#Page:Main').getClientData();
    let clientDataAlmacen = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Solicitud_Abast').getClientData();

    let dataAlmacen = clientDataAlmacen.almacen_abast;

    let filtro = `$filter=almacen_sociedad eq '${dataAlmacen.sociedad}' and almacen_almacen eq '${dataAlmacen.almacen}' and almacen_centro eq '${dataAlmacen.centro}' and tipo eq 'ABASTECIMIENTO' &$orderby=fecha_creacion desc &$expand=operario`
    let isTecnico = clientDataUser.info_user.rol === 'Técnico'
    if(isTecnico){
        let correo = clientDataUser.info_user.correo
        filtro = `$filter=almacen_sociedad eq '${dataAlmacen.sociedad}' and almacen_almacen eq '${dataAlmacen.almacen}' and almacen_centro eq '${dataAlmacen.centro}' and tipo eq 'ABASTECIMIENTO' and correo_creacion eq '${correo}' &$orderby=fecha_creacion desc &$expand=operario`
    }
    return filtro;
    //lista_abast
}
