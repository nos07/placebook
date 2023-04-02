import { LogosFacebookIcon } from './logos-facebook-icon';
import { LogosGoogleIcon } from './logos-google-icon';
import {
	Unlock,
	X,
	ChevronLeft,
	Key,
	LogIn,
	ArrowLeft,
	CheckCircle,
	Info,
	ArrowUpRight,
	SidebarClose,
	SidebarOpen,
	Search,
	Send,
	LogOut,
	User,
	Plus,
	ImagePlus,
	Home,
} from 'lucide-react';
import type { Icon as LucideIcon } from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
	facebookLogo: LogosFacebookIcon,
	googleLogo: LogosGoogleIcon,
	unlock: Unlock,
	close: X,
	chevronLeft: ChevronLeft,
	key: Key,
	login: LogIn,
	arrowLeft: ArrowLeft,
	checkCircle: CheckCircle,
	info: Info,
	arrowUpRight: ArrowUpRight,
	sidebarClose: SidebarClose,
	sidebarOpen: SidebarOpen,
	search: Search,
	send: Send,
	logout: LogOut,
	user: User,
	plus: Plus,
	imagePlus: ImagePlus,
	home: Home,
};
