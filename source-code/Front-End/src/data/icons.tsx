// src/modules/icons.tsx
import {
  faGauge,
  faGear,
  faUsers,
  faEnvelope,
  faIdCard,
  faKey,
  faUserShield,
  faLifeRing,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Icons = {
  dashboard: <FontAwesomeIcon icon={faGauge} />,
  settings: <FontAwesomeIcon icon={faGear} />,
  users: <FontAwesomeIcon icon={faUsers} />,
  subscription: <FontAwesomeIcon icon={faCreditCard} />,
  messages: <FontAwesomeIcon icon={faEnvelope} />,
  tenants: <FontAwesomeIcon icon={faIdCard} />,
  permission: <FontAwesomeIcon icon={faKey} />,
  roles: <FontAwesomeIcon icon={faUserShield} />,
  supports: <FontAwesomeIcon icon={faLifeRing} />,
};
