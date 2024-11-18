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
  get: `${environment.urlBase}Articulos/Get`
}