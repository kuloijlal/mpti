import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabPage } from './components/tab/tab.page';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabPage, 
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
      },
      {
        path: 'transaction/:id',
        loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
      },  
      {
        path: 'item/:id',
        loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule)
      },
    ]
  },


  {
    path: 'comic',
    loadChildren: () => import('./comic/comic.module').then( m => m.ComicPageModule)
  },
  {
    path: 'politic',
    loadChildren: () => import('./politic/politic.module').then( m => m.PoliticPageModule)
  },
  {
    path: 'cartoon',
    loadChildren: () => import('./cartoon/cartoon.module').then( m => m.CartoonPageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./components/tab/tab.module').then( m => m.TabPageModule)
  },

  {
    path: 'transaction',
    loadChildren: () => import('./user/transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./user/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'kamus',
    loadChildren: () => import('./kamus/kamus.module').then( m => m.KamusPageModule)
  },
  {
    path: 'bisnis',
    loadChildren: () => import('./bisnis/bisnis.module').then( m => m.BisnisPageModule)
  },
  {
    path: 'addbook',
    loadChildren: () => import('./addbook/addbook.module').then( m => m.AddbookPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
