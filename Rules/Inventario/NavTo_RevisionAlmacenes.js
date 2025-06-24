/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function NavTo_RevisionAlmacenes(context) {

    let clientData = context.evaluateTargetPathForAPI('#Page:Revision_Solicitud_Reabastecimiento').getClientData();
    let materialLP = context.evaluateTargetPath('#Page:Revision_Solicitud_Reabastecimiento/#Control:materiales_revision_abast/#Value')
    clientData.infoMaterial = materialLP[0].BindingObject

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Inventario/Revision_Sol_Almacenes_Abast.page",
        }
    });
}
