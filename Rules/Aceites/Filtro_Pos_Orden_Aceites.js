/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Filtro_Pos_Orden_Aceites(context) {
    //let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Ingenio').getClientData();

    let registro_consumo = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Motor/#Control:registro_consumo/#Value');

    let orden = registro_consumo[0].BindingObject.orden

    //let filtro = `$filter=Werks eq '${clientDataFiltro.centro_ingenio}' and Spras eq 'ES' and contains(Txtmd, 'BORRADO') eq false and contains(Txtmd, 'BORRAR') eq false and contains(Txtmd, 'BORRAD_') eq false and (`
    let filtro = `$filter=Aufnr eq '100000000002''`
    //alert(filtro)
 
    return filtro
}
