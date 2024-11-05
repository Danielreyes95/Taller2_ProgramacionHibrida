import { Injectable } from '@angular/core';
import { Citas } from '../citas/citas';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private _citas: Citas[] = [
    new Citas("El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.", "Ralph Waldo Emerson"),
    new Citas("Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito.", "Thomas Edison"),
    new Citas("Ningún viento es bueno para el barco que no sabe adónde va.", "Séneca")
  ];
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  db!: SQLiteDBConnection;

  plataforma: string = "";

  DB_NAME: string = "lista_citas";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  TABLE_NAME: string = "lista_citas";
  DB_SQL_TABLAS: string = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, mensaje TEXT NOT NULL, autor TEXT NOT NULL);`;

  constructor() {}

  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector("jeep-sqlite");
    if (jeepSqliteEl != null) {      
      await this.sqlite.initWebStore();
    }
  }

  async iniciarPlugin() {    
    this.plataforma = Capacitor.getPlatform();
    if (this.plataforma == "web") {
      await this._iniciarPluginWeb();
    }
    await this.abrirConexion();
    await this.db.run(this.DB_SQL_TABLAS);
  }

  async abrirConexion() {                    
    const ret = await this.sqlite.checkConnectionsConsistency(); 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      );
      await this.db.open();
    }
  }

  async agregarCita(c: Citas) {
    await this.db.run(`INSERT INTO ${this.TABLE_NAME} (mensaje, autor) VALUES (?, ?)`, [c.mensaje, c.autor]);
    this._citas.push(c);
  }

  async getCita(): Promise<Citas[]> {
    const res = await this.db.query(`SELECT * FROM ${this.TABLE_NAME}`);
    if (res && res.values) {
      this._citas = res.values.map((row: any) => new Citas(row.mensaje, row.autor));
    }
    return this._citas;
  }

  async eliminarCita(c: Citas) {
    await this.db.run(`DELETE FROM ${this.TABLE_NAME} WHERE mensaje = ? AND autor = ?`, [c.mensaje, c.autor]);
    this._citas = this._citas.filter(cita => cita !== c);
  }
}
