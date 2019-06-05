import { AfterViewInit, Directive, Host, Input, OnDestroy, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Directive({
  selector: '[appMatAutocompleteTriggerEnforceSelection]'
})
export class MatAutocompleteTriggerEnforceSelectionDirective implements AfterViewInit, OnDestroy {
  @Input() matAutocomplete: MatAutocomplete;

  constructor(
    @Host() @Self() private readonly autoCompleteTrigger: MatAutocompleteTrigger,
    private readonly ngControl: NgControl
  ) {}

  ngAfterViewInit() {
    this.autoCompleteTrigger.panelClosingActions.pipe(untilDestroyed(this)).subscribe(e => {
      if (!e || !e.source) {
        const selected = this.matAutocomplete.options
          .map(option => option.value)
          .find(option => option === this.ngControl.value);

        if (selected == null) {
          this.ngControl.reset();
        }
      }
    });
  }

  ngOnDestroy() {}
}
