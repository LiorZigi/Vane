import Apple from './Apple';

import Chat from './Chat';
import ChevronRight from './ChevronRight';
import Close from './Close';
import CloseSmall from './CloseSmall';
import CreditCard from './CreditCard';
import Heart from './Heart';
import Logout from './Logout';
import Mail from './Mail';
import Map from './Map';
import Plus from './Plus';
import Settings from './Settings';
import User from './User';
import Watchlist from './Watchlist';
import Wallet from './Wallet';
import Portfolio from './Portfolio';
import Discover from './Discover';
import Home from './Home';
import Search from './Search';
import FaceId from './FaceId';
import Fingerprint from './Fingerprint';
import Notification from './Notification';
import Poll from './Poll';
import Camera from './Camera';
import Images from './Images';
import Send from './Send';
import Repost from './Repost';
import Comment from './Comment';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';

interface VaneIconProps {
  iconName: string;
  color?: string;
  size?: number;
  hasFill?: boolean;
  fill?: string;
}

const icons: any = {
  map: Map,
  plus: Plus,
  user: User,
  settings: Settings,
  logout: Logout,
  chevronRight: ChevronRight,
  creditCard: CreditCard,
  heart: Heart,
  chat: Chat,
  apple: Apple,
  mail: Mail,
  close: Close,
  closeSmall: CloseSmall,
  wallet: Wallet,
  portfolio: Portfolio,
  discover: Discover,
  watchlist: Watchlist,
  home: Home,
  search: Search,
  faceId: FaceId,
  fingerPrint: Fingerprint,
  notification: Notification,
  poll: Poll,
  camera: Camera,
  images: Images,
  send: Send,
  comment: Comment,
  repost: Repost,
  leftArrow: LeftArrow,
  rightArrow: RightArrow
};

export default function VaneIcon({ iconName, color, size, hasFill, fill }: VaneIconProps) {
  const Icon: any = icons[iconName];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} color={color} hasFill={hasFill} fill={fill} />;
}
