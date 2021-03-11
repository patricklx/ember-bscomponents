import Component from '@glimmer/component';


type Args = {
  totalLength: number;
  itemsPerPage: number;
  itemsPerGroup: number;
  selected: number;
  currentPageGroup: number
}

export default class BsPagination extends Component<Args> {

}
