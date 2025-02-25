/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = "prueba";
const collectionNameBancos = "bancos";
const collectionNameSolicitudes = "solicitudes";

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collectionNameBancos);
db.createCollection(collectionNameSolicitudes);

//poblamos la coleccion de bancos
const collectionBancos = db.getCollection(collectionNameBancos);
const bancos = [
  {
    nombre: "BBVA",
    solicitud_min: 1000,
    solicitud_max: 500000,
    periodo_min: 5,
    periodo_max: 240,
    intereses_tae: 6.16,
    url_base: "https://www.bbva.es",
  },
  {
    nombre: "Santander",
    solicitud_min: 500,
    solicitud_max: 600000,
    periodo_min: 12,
    periodo_max: 480,
    intereses_tae: 4.95,
    url_base: "https://www.santander.es",
  },
  {
    nombre: "Bankia",
    solicitud_min: 1000,
    solicitud_max: 500000,
    periodo_min: 12,
    periodo_max: 360,
    intereses_tae: 5.95,
    url_base: "https://www.bankia.es",
  },
  {
    nombre: "CaixaBank",
    solicitud_min: 200,
    solicitud_max: 20000,
    periodo_min: 1,
    periodo_max: 240,
    intereses_tae: 8.95,
    url_base: "https://www.caixabank.es",
  },
  {
    nombre: "Kutxabank",
    solicitud_min: 5000,
    solicitud_max: 100000,
    periodo_min: 5,
    periodo_max: 72,
    intereses_tae: 3.95,
    url_base: "https://www.kutxabank.es",
  },
  {
    nombre: "Abanca",
    solicitud_min: 1000,
    solicitud_max: 8000,
    periodo_min: 1,
    periodo_max: 36,
    intereses_tae: 4.95,
    url_base: "https://www.abanca.es",
  },
  {
    nombre: "Unicaja",
    solicitud_min: 1000,
    solicitud_max: 50000,
    periodo_min: 1,
    periodo_max: 36,
    intereses_tae: 3.40,
    url_base: "https://www.unicaja.es",
  },
  {
    nombre: "Ibercaja",
    solicitud_min: 1000,
    solicitud_max: 500000,
    periodo_min: 1,
    periodo_max: 36,
    intereses_tae: 6.95,
    url_base: "https://www.ibercaja.es",
  },
  {
    nombre: "Liberbank",
    solicitud_min: 1000,
    solicitud_max: 500000,
    periodo_min: 1,
    periodo_max: 36,
    intereses_tae: 6.95,
    url_base: "https://www.liberbank.es",
  },
  {
    nombre: "Bankinter",
    solicitud_min: 1000,
    solicitud_max: 500000,
    periodo_min: 1,
    periodo_max: 36,
    intereses_tae: 6.95,
    url_base: "https://www.bankinter.es",
  },
  {
    nombre: "Cajamar",
    solicitud_min: 1000,
    solicitud_max: 500000,
    periodo_min: 1,
    periodo_max: 36,
    intereses_tae: 6.95,
    url_base: "https://www.cajamar.es",
  },
];

collectionBancos.insertMany(bancos);
