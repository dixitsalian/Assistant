import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templates: { [key: string]: TemplateRef<unknown> } = {};

  registerTemplate(name: string, template: TemplateRef<unknown>): void {
    this.templates[name] = template;
  }

  getTemplate(name: string): TemplateRef<unknown> | undefined {
    return this.templates[name];
  }
}
