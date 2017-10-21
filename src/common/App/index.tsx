import * as React from 'react';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import PageChatList from '../PageList';
import PageRoom from '../PageRoom';

import * as styles from './style.less';

export interface IProps {
}

const App: React.SFC<IProps> = (): React.ReactElement<IProps> => (
	<div className={styles.wrapper}>
		<Helmet>
			<title>VK chat</title>
		</Helmet>

		<Route exact path="/" component={PageChatList} />
		<Route exact path="/room/:hash" component={PageRoom} />
	</div>
);

export default App;