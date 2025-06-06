{
	"MainPage": "/appconsumos_qa_mb/Pages/Main.page",
	"OnLaunch": [
		"/appconsumos_qa_mb/Rules/Service/Initialize.js"
	],
	"OnWillUpdate": "/appconsumos_qa_mb/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/appconsumos_qa_mb/Rules/Service/Initialize.js",
	"Styles": "/appconsumos_qa_mb/Styles/Styles.less",
	"Version": "/appconsumos_qa_mb/Globals/Application/AppDefinition_Version.global",
	"OnSuspend": "/appconsumos_qa_mb/Actions/app_consumos_qa/Service/UploadOffline.action",
	"OnResume": "/appconsumos_qa_mb/Actions/app_consumos_qa/Service/UploadOffline.action",
	"Localization": "/appconsumos_qa_mb/i18n/i18n.properties",
	"_SchemaVersion": "24.11",
	"_Name": "appconsumos_qa_mb"
}