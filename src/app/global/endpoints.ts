import { enableDebugTools } from "@angular/platform-browser";
import { environment } from "@Environment";

export const auth = {
  login: `${environment.urlBase}SignIn`,
};

export const bancos = {
  insert: `${environment.urlBase}Bancos/Insert`,
  get: `${environment.urlBase}Bancos/Get`,
  update: `${environment.urlBase}Bancos/Update`,
  delete: `${environment.urlBase}Bancos/Delete`,
};

export const articulos = {
  insert: `${environment.urlBase}Articulos/Insert`,
  get: `${environment.urlBase}Articulos/Get`,
  update: `${environment.urlBase}Articulos/Update`,
  delete: `${environment.urlBase}Articulos/Delete`
};

export const insumos = {
  insert: `${environment.urlBase}Insumos/Insert`,
  get: `${environment.urlBase}Insumos/Get`,
  update: `${environment.urlBase}Insumos/Update`,
  delete: `${environment.urlBase}Insumos/Delete`
};

export const proveedores = {
  get: `${environment.urlBase}Proveedores/Get`
}

export const sucursales = {
  get: `${environment.urlBase}Sucursales/Get`
}

export const recetas = {
  insert: `${environment.urlBase}Recetas/Insert`,
  get: `${environment.urlBase}Recetas/Get`,
  update: `${environment.urlBase}Recetas/Update`,
  delete: `${environment.urlBase}Recetas/Delete`
}

export const detalleRecetas = {
  insert: `${environment.urlBase}DetalleReceta/Insert`,
  get: `${environment.urlBase}DetalleReceta/Get`
}

export const ordenesCompras = {
  insert: `${environment.urlBase}OrdenCompra/Insert`,
  get: `${environment.urlBase}OrdenCompra/Get`,
  delete: `${environment.urlBase}OrdenCompra/Delete`,
  update: `${environment.urlBase}OrdenCompra/Update`
}

export const detalleOrdenesCompras = {
  insert: `${environment.urlBase}DetalleOrdenCompra/Insert`,
  get: `${environment.urlBase}DetalleOrdenCompra/Get`
}

export const entradas = {
  insert: `${environment.urlBase}Entradas/Insert`,
  get: `${environment.urlBase}Entradas/Get`,
  update: `${environment.urlBase}Entradas/Update`,
  delete: `${environment.urlBase}Entradas/Delete`
}

export const detalleEntradas = {
  insert: `${environment.urlBase}DetalleEntrada/Insert`,
  get: `${environment.urlBase}DetalleEntrada/Get`,
  getReporte: `${environment.urlBase}DetalleEntrada/GetReportEntradas`,
  exportReport: `${environment.urlBase}DetalleEntrada/ExportarReportEntradasAExcel`,
  delete: `${environment.urlBase}DetalleEntrada/Delete`
}
