/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function Filtro_Pos_Orden_Aceites(context) {
    //let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Ingenio').getClientData();

    //let registro_consumo = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Motor/#Control:registro_consumo/#Value');

    //let orden = registro_consumo[0].BindingObject.orden

    //let filtro = `$filter=Werks eq '${clientDataFiltro.centro_ingenio}' and Spras eq 'ES' and contains(Txtmd, 'BORRADO') eq false and contains(Txtmd, 'BORRAR') eq false and contains(Txtmd, 'BORRAD_') eq false and (`
    const res = await context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/Call_ZAMMST_ORDRINSUSet.action",
        "Properties": {
            "ShowActivityIndicator": true,
            "ActivityIndicatorText": "Cargando datos ...",
            "OnFailure": "",
            "OnSuccess": "",
            "Target": {
                "Service": "/appconsumos_qa_mb/Services/ZAMANAGE_LOGISTIC.service",
                "Path": `/getcompreserSet?$filter=(Aufnr eq '100000000002' and Matnr eq '1119674')&$orderby=Rspos&$format=json`,
                "RequestProperties": {
                    "Method": "GET"
                }
            }
        }
    })

    const resjson = res.data;
    alert(JSON.stringify(resjson))
    let filtro = `$filter=Aufnr eq '100000000002' and Matnr eq '1119674'&$orderby=Rspos`
    //alert(filtro)

    return filtro
}
