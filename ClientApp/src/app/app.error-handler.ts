import { ErrorHandler, Inject, NgZone } from "@angular/core";
import { NotifierService } from "angular-notifier";

export class AppErrorHandler implements ErrorHandler {
  constructor(
    private ngZone: NgZone,
    @Inject(NotifierService) private notifier: NotifierService
  ) {}
  handleError(error: any): void {
    this.ngZone.run(() => {
      this.notifier.notify("error", error.error);
    });
    throw error;
  }
}
