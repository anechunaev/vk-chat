import View from './view';
import { withStyles } from 'material-ui';
import styles from './style';

export interface IProps {
	icon: string;
	text: string;
	onClick?: () => void;
	selected: boolean;
}

export default withStyles(styles)(View as any) as any;