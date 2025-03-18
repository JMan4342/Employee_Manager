import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthorizationService } from "./authorization.service";
import { inject } from "@angular/core";

export const authorizationGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authorizationService = inject(AuthorizationService);
    const router = inject(Router);

    if (authorizationService.verifyAuthorization()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    };
}