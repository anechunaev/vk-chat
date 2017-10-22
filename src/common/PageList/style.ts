export default (theme: any): any => ({
	wrapper: {
		display: 'flex',
		position: 'absolute',
		zIndex: -1,
		height: '100vh',
		width: '100%',
	},
	drawerPaper: {
		position: 'relative',
		height: '100%',
		width: 200,
	},
	paper: {
		flex: '1 0 200px',
		display: 'flex',
		zIndex: 1300,
		position: 'absolute',
		overflowY: 'auto',
		flexDirection: 'column',
		width: 200,
		height: '100vh'
	},
	cardHolder: {
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		width: '100%',
		boxSizing: 'border-box',
		flex: '1 1 auto',
		overflow: 'auto',
	},
	noChatsPaper: {
		padding: '16px'
	}
})