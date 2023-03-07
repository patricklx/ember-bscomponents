declare module '@ember/component' {
  // TODO:  remove when this is actually a thing that exists?
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  export function setComponentTemplate(template: string|TemplateFactory, klass: any): any;
  export function getComponentTemplate(klass: any): any;
}


declare module 'ember-bscomponents/components/*/template' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
