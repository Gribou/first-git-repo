import * as moment from "moment-timezone";
import "moment/locale/fr";

const configureLocale = () => {
  moment.locale("fr");
  moment.tz.setDefault("UTC");
};

export default configureLocale;
