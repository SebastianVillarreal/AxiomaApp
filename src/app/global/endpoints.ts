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
  insert: `${environment.urlBase}Proveedores/Insert`,
  get: `${environment.urlBase}Proveedores/Get`,
  update: `${environment.urlBase}Proveedores/Update`,
  delete: `${environment.urlBase}Proveedores/Delete`
}

export const sucursales = {
  insert: `${environment.urlBase}Sucursales/Insert`,
  get: `${environment.urlBase}Sucursales/Get`,
  update: `${environment.urlBase}Sucursales/Update`,
  delete: `${environment.urlBase}Sucursales/Delete`
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
  updateCant: `${environment.urlBase}DetalleEntrada/UpdateCantSinCArgo`,
  delete: `${environment.urlBase}DetalleEntrada/Delete`
}

export const catModulos = {
  insert: `${environment.urlBase}CatModulo/Insert`,
  get: `${environment.urlBase}CatModulo/Get`,
  update: `${environment.urlBase}CatModulo/Update`,
  delete: `${environment.urlBase}CatModulo/Delete`
}

export const modulos = {
  insert: `${environment.urlBase}Modulos/Insert`,
  get: `${environment.urlBase}Modulos/Get`,
  update: `${environment.urlBase}Modulos/Update`,
  delete: `${environment.urlBase}Modulos/Delete`
}

export const personas = {
  insert: `${environment.urlBase}Personas/Insert`,
  get: `${environment.urlBase}Personas/Get`,
  update: `${environment.urlBase}Personas/Update`,
  delete: `${environment.urlBase}Personas/Delete`
}

export const usuarios = {
  get: `${environment.urlBase}Usuarios/Get`,
  update: `${environment.urlBase}Usuarios/Update`,
  delete: `${environment.urlBase}Usuarios/Delete`
}