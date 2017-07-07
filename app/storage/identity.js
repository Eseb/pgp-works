import {Record} from 'immutable';
import {key as openpgpKey} from 'openpgp';

export default class Identity extends Record({
  guid: '',
  armouredText: '',
  created: new Date(),
}) {
  constructor() {
    super();

    this.key = openpgpKey.readArmored(this.armouredText);
  }
}
