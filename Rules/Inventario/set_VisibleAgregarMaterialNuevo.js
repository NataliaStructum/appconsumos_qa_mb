/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function set_VisibleAgregarMaterialNuevo(context) {

    let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Solicitud_Abast').getClientData();
    const pageProxy = context.getPageProxy();
    var agregarMaterialExistente = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell1")
    var agregarMaterialNuevo = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell2")

    agregarMaterialExistente.setVisible(false)
    agregarMaterialNuevo.setVisible(true)
    agregarMaterialNuevo.redraw(true)

    let actionResult = context.getActionResult("Read_ZBIW_MARDTSet");
    let string = JSON.stringify(actionResult.data)
    //alert(JSON.stringify(JSON.parse(string)[0]))

    let lista = JSON.parse(string)

    const resultadoListPicker = [];
    const vistos = new Set();

    for (const item of lista) {
        if (!vistos.has(item.Matnr)) {
            vistos.add(item.Matnr);
            resultadoListPicker.push({
                ObjectCell: {
                    Title: item.Matnr,
                    Subhead: item.Txtmd,
                    StatusText: item.Meins,
                    PreserveIconStackSpacing: false,
                    Visible: true
                },
                ReturnValue: item.Matnr
            });
        }
    }

    clientDataFiltro.materiales_nuevos = resultadoListPicker

}
