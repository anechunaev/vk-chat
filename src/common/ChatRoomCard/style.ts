import green from 'material-ui/colors/green';

export default (theme: any): any => ({
	card: {
		marginBottom: theme.spacing.unit * 3,
		cursor: 'pointer',
	},
	cardMedia: {
		height: 150,
	},
	avatarTrain: {
		backgroundColor: green[500],
	}
})