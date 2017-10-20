import * as React from 'react';
import { withStyles } from 'material-ui';
import styles from './style';
import View from './view';

export interface IProps {
	usersCount: number;
	newMessagesCount: number;
	join?: boolean;
	group: any;
	type: string;
	title: string;
	subtitle: string;
	media?: string;
}

const EnhancedView = withStyles(styles)(View);

export default (props: any) => <EnhancedView {...props} />