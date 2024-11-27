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

export const recetas = {
  insert: `${environment.urlBase}Recetas/Insert`,
  get: `${environment.urlBase}Recetas/Get`
}
