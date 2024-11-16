import { environment } from "@Environment";

export const auth = {
  login: `${environment.urlBase}SignIn`,
};

export const bancos = {
  insert: `${environment.urlBase}/Bancos/Insert`
}