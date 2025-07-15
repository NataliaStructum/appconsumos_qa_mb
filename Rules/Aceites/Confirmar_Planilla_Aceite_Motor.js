/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Confirmar_Planilla_Aceite_Motor(context) {
    let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Aceites').getClientData();
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Aceite_Motor').getClientData();

    let obs = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Motor/#Control:FormCellNote0/#Value');
    clientDataFiltro.QueryRevisarPlanilla = clientDataFiltro.data_planilla_motor.id
    clientDataFiltro.obsRevisarPlanilla = obs
    if(clientData.total != clientData.lista_revision_motor.length){
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Faltan Consumos",
                "Message": `Completa los consumos marcados como Cambio para seguir con el proceso.`
            }
        });
    }

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
        "Properties": {
            "Title": `Aprobar Planilla`,
            "Message": `¿Estás seguro de que deseas confirmar la planilla No.${clientDataFiltro.data_planilla_motor.numero} de Aceite Motor?`,
            "OKCaption": "Aceptar",
            "OnOK": "/appconsumos_qa_mb/Actions/oData/Update_Planilla_Aceite_Aprobar.action",
            "CancelCaption": "Cancelar"
        }
    })
}
