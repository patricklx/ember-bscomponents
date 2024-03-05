import 'ember-source/types/stable';
import { TemplateFactory } from 'ember-cli-htmlbars';


declare module 'ember-bscomponents/components/*/template' {
  const tmpl: TemplateFactory;
  export default tmpl;
}
