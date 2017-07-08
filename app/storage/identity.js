import {Record} from 'immutable';
import {key as openpgpKey} from 'openpgp';
import moment from 'moment';

export default class Identity extends Record({
  guid: '',
  armouredText: '',
  addedToApp: new Date(),
}) {
  constructor(...args) {
    super(...args);

    this.key = openpgpKey.readArmored(this.armouredText).keys[0];
  }

  get user() {
    return this.key.getPrimaryUser().user.userId.userid;
  }

  get created() {
    return moment(this.key.primaryKey.created);
  }

  get dateAddedToApp() {
    return moment(this.addedToApp);
  }
}
