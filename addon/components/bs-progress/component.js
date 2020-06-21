import Component from '@glimmer/component';
import { action } from '@ember/object';
import { defaultArgs } from "../../decorators";
import { tracked } from "@glimmer/tracking";


export default class BsProgressComponent extends Component {

  @defaultArgs
  args = {
    progress: 0,
    stripped: false,
    type: null,
    animated: false
  };
}
