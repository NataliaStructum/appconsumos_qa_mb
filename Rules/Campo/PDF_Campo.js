/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function PDF_Campo(context) {
    alert("Generar y abrir PDF")

    //let clientDataAutorizar = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitud_Reabastecimieto').getClientData();
    //firma 
    //const pageProxy = context.getPageProxy();
    const platform = context.nativescript.platformModule;
    const signatureObject = context.evaluateTargetPath("#Page:Autorizar_Solicitud_Campo/#Control:FormCellInlineSignatureCapture0/#Value");
    let signatureContent;

    if (platform.isAndroid) {
        signatureContent = android.util.Base64.encodeToString(signatureObject.content, android.util.Base64.DEFAULT);
    } else if (platform.isIOS) {
        signatureContent = signatureObject.content.base64Encoding();
    }

    //items de la solicitud
    //Obtener el pdf en b64 y colocar la firma, cerrar la pagina y abrir el pdf
    /*const datajson = []
    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'ComponentesSolicitud', [], `$expand=material,almacen&$filter=solicitud_id eq ${BindingData.id}`).then(async (results) => {
        if (results && results.length > 0) {
            results.forEach(e => {
                let sap = ""
                let desc = ""
                if (typeof e.mat_nuevo_desc === 'string') {
                    sap = e.mat_nuevo
                    desc = e.mat_nuevo_desc
                }
                if (typeof e.material_material === 'string') {
                    sap = e.material_material
                    desc = e.material.material_desc
                }
                if (e.aprobado) {
                    datajson.push({
                        alce: almacen,
                        sap: sap.replace(/^0+/, ''),
                        desc: desc,
                        cant: String(e.cantidad_aprobada),
                        um: ""
                    })
                }
            });

            return context.executeAction({
                "Name": "/appconsumos_qa_mb/Actions/Call_generatePDF.action",
                "Properties": {
                    "OnFailure": "",
                    "OnSuccess": "",
                    "Target": {
                        "Service": "/appconsumos_qa_mb/Services/backend_REST.service",
                        "Path": "/generatePDF",
                        "RequestProperties": {
                            "Method": "POST",
                            "Body": {
                                "data": reqdata,
                                "image": `${signatureContent}`,
                                "items": datajson,
                                "logo": `${logo}`
                            },

                        }
                    }
                }
            }).then((result) => {
                if (result && result.data) {

                    //context.b64Data = result.data.value
                    clientDataAutorizar.b64Data = result.data.value
                    return sendEmail(result.data.value)
                        .catch((error) => {
                            alert(`Error al enviar correo - ${error}`)
                        })
                        .then((result) => {

                            context.executeAction({
                                "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                                "Properties": {
                                    "Title": "Correo enviado exitosamente",
                                    "Message": "La orden de salida fue enviada correctamente al correo.",
                                    "OKCaption": "Aceptar"
                                }
                            });
                            // Este bloque se ejecutará tanto si sendEmail fue exitoso como si falló
                            if (platform.isAndroid) {
                                return context.executeAction({
                                    "Name": "/appconsumos_qa_mb/Actions/CloseModalPage_Complete.action",
                                    "Properties": {
                                        "NavigateBackToPage": "Detalle_Solicitud_Reabastecimieto",
                                    }
                                }).then(() => {
                                    return new Promise((resolve) => setTimeout(resolve, 500));
                                }).then(() => {
                                    try {
                                        return Rule_openDocumentoAnd(context);
                                    } catch (errorOpen) {
                                        alert("Error al abrir documento en Android:\n" + (errorOpen.message || errorOpen));
                                    }
                                }).catch((errorClose) => {
                                    alert("Error al cerrar modal:\n" + (errorClose.message || errorClose));
                                });
                            } else if (platform.isIOS) {
                                return context.executeAction({
                                    "Name": "/appconsumos_qa_mb/Actions/CloseModalPage_Complete.action",
                                    "Properties": {
                                        "NavigateBackToPage": "Detalle_Solicitud_Reabastecimieto"
                                    }
                                }).then(() => {
                                    setTimeout(() => {
                                        try {
                                            return Rule_openDocumentoIOS(context)
                                        } catch (errorOpen) {
                                            alert("Error al abrir documento en IOS:\n" + (errorOpen.message || errorOpen));
                                        }
                                    }, 500);
                                }).catch((errorClose) => {
                                    alert("Error al cerrar modal:\n" + (errorClose.message || errorClose));
                                });
                            }
                        });
                }

            }).catch((error) => {
                alert(error)
            });
        }
    }).catch((error) => {

        alert(`Error ${error.message}`)
    });*/
}
