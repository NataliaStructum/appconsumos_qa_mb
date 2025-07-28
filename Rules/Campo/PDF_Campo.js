import Rule_openDocumentoAnd from '../Rule_openDocumentoAnd.js';
import Rule_openDocumentoIOS from '../Rule_openDocumentoIOS.js';
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default async function PDF_Campo(context) {
    //alert("Generar y abrir PDF")

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

    let info_solicitud = context.binding;
    let orden = info_solicitud.orden;

    //alert(orden)
    //obtener el pdf de la orden
    try {
        const res = await context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/Call_ZAMMST_ORDRINSUSet.action",
            "Properties": {
                "ShowActivityIndicator": true,
                "ActivityIndicatorText": "Cargando datos ...",
                "OnFailure": "",
                "OnSuccess": "",
                "Target": {
                    "Service": "/appconsumos_qa_mb/Services/ZAMANAGE_LOGISTIC.service",
                    "Path": `/ZAMMST_ORDRINSUSet?$filter=(Aufnr eq '${orden}')&$format=json`,
                    "RequestProperties": {
                        "Method": "GET"
                    }
                }
            }
        })

        const resjson = res.data;
        //resjson.d.results[0].Pdf
        //alert(JSON.stringify(resjson))
        if (resjson?.d?.results?.[0]?.Pdf) {
            const pdfData = resjson.d.results[0].Pdf;
            // Usa pdfData aquí
            return context.executeAction({
                "Name": "/appconsumos_qa_mb/Actions/Call_FirmarPDF.action",
                "Properties": {
                    "OnFailure": "",
                    "OnSuccess": "",
                    "Target": {
                        "Service": "/appconsumos_qa_mb/Services/backend_REST.service",
                        "Path": "/firmarPDF",
                        "RequestProperties": {
                            "Method": "POST",
                            "Body": {
                                "pdf": `${pdfData}`,
                                "image": `${signatureContent}`
                            },

                        }
                    }
                }
            }).then((result) => {
                if (result && result.data) {

                    //alert(result.data.value)//el pdf en base64
                    context.b64Data = result.data.value
                    if (platform.isAndroid) {
                        return Rule_openDocumentoAnd(context)
                    } else if (platform.isIOS) {
                        return Rule_openDocumentoIOS(context)
                    }
                }

            }).catch((error) => {
                alert(error)
            });
        }

    } catch (error) {
        alert(`No se pudo obtener el pdf de la orden ${error}`);
    }

   
}
