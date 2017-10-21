import green from 'material-ui/colors/green';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import orange from 'material-ui/colors/orange';

export default (theme: any): any => ({
	card: {
		marginBottom: theme.spacing.unit * 3,
		cursor: 'pointer',
	},
	avatarTrain: {
		backgroundColor: green[500],
	},
	avatarFlight: {
		backgroundColor: blue[500],
	},
	avatarPlace: {
		backgroundColor: red[500],
	},
	avatarHotel: {
		backgroundColor: orange[500],
	}
})