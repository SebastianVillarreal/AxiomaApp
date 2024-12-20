import { Title } from "@angular/platform-browser";
import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Inicio',
        icon: 'home',
        link: '/home',
        
        home: true
    },
    {
        title: 'Bancos',
        icon: 'credit-card-outline',
        link: '/pages/bancos',
      },
      {
        title: 'Artículos',
        icon: 'cube-outline',
        link: '/pages/articulos',
      },
      {
        title: 'Insumos',
        icon: 'file-text-outline',
        link: '/pages/insumos',
      },
      {
        title: 'Recetas',
        icon: 'file-text-outline',
        children: [
          {
            title: 'Nueva',
            link: '/pages/recetas/nueva',
            icon: 'plus-square-outline'
          },
          {
            title: 'Listado',
            link: '/pages/recetas/listado',
            icon: 'list-outline'
          }
        ]
      },
      {
        title: 'Compras',
        icon: 'shopping-cart-outline',
        children: [
          {
            title: 'Ordenes Compras',
            icon: 'file-text-outline',
            children: [
              {
                title: 'Nueva',
                link: '/pages/compras/ordenes-compras/nueva',
                icon: 'plus-square-outline'
              },
              {
                title: 'Listado',
                link: '/pages/compras/ordenes-compras/listado',
                icon: 'list-outline'
              }
            ],
          },
          {
            title: 'Entradas',
            icon: 'file-text-outline',
            children: [
              {
                title: 'Nueva',
                link: '/pages/compras/entradas/nueva',
                icon: 'plus-square-outline'
              },
              {
                title: 'Listado',
                link: '/pages/compras/entradas/listado',
                icon: 'list-outline'
              }
            ]
          }
        ]
      },
      {
        title: 'ADMINISTRACIÓN',
        group: true,
      },
      {
        title: 'Categorías Modulos',
        icon: 'menu-outline',
        link: '/pages/administracion/categorias-modulos'
      },
      {
        title: 'Módulos',
        icon: 'menu-outline',
        link: '/pages/administracion/modulos'
      }
      
]