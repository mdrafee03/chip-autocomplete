import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ServerSideDropdownComponent } from "./server-side-dropdown/server-side-dropdown.component";
import { ClientSideDropdownComponent } from "./client-side-dropdown/client-side-dropdown.component";


const routes: Routes = [
  { path: "", redirectTo: "/client-side", pathMatch: "full" },
  { path: "server-side", component: ServerSideDropdownComponent },
  { path: "client-side", component: ClientSideDropdownComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
