import * as React from 'react';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { withStyles, AppBar, Toolbar, Typography, Button } from 'material-ui';

import PageChatList from '../PageList';

import * as styles from './style.less';

export interface IProps {
}

const ApplicationBar = withStyles(theme => ({ flex: {flex: 1} }))(({ classes }) => (
	<AppBar position="static">
		<Toolbar>
			<Typography type="title" color="inherit" className={classes.flex}>
				Чат попутчиков
			</Typography>
			<Button color="contrast">
				Войти
			</Button>
		</Toolbar>
	</AppBar>
))

const App: React.SFC<IProps> = (): React.ReactElement<IProps> => (
	<div className={styles.wrapper}>
		<Helmet>
			<title>VK chat</title>
		</Helmet>

		<ApplicationBar />
		<Route exact path="/" component={PageChatList} />
		<Route exact path="/room/:hash" component={() => <h1>Chat page</h1>} />
	</div>
);

export default App;