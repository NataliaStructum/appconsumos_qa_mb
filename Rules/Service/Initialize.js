export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _app_consumos_qa = context.executeAction('/appconsumos_qa_mb/Actions/app_consumos_qa/Service/InitializeOffline.action');
    let _app_consumos_qa_v2 = context.executeAction('/appconsumos_qa_mb/Actions/backend_REST/Service/InitializeOffline.action');
    let ZBODEGA_AGO_SRV = context.executeAction('/appconsumos_qa_mb/Actions/ZBODEGA_AGO_SRV/Service/InitializeOffline.action');
    let ZAMANAGE_LOGISTIC = context.executeAction('/appconsumos_qa_mb/Actions/ZAMANAGE_LOGISTIC/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_app_consumos_qa, ZBODEGA_AGO_SRV, _app_consumos_qa_v2, ZAMANAGE_LOGISTIC]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/appconsumos_qa_mb/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Servicios de la aplicación inicializados",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1,
                "OnSuccess": "/appconsumos_qa_mb/Actions/app_consumos_qa/Service/UploadOffline.action",
            }
        });
    }).catch(() => {
        return false;
    });
}