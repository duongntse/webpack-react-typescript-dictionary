import { connect } from 'react-redux';
import { setSearchBoxAbility } from 'src/store/searchBox/actions';
// import { LdoceContainer } from 'src/modules/ldoce/';
import LdoceContainer from 'src/modules/ldoce/component/container/LdoceContainer';
const mapStateToProps = (state: any, ownProps: any) => {
	return {
		...state,
		...ownProps,
	};
};
const mapDispatchToProps = (dispatch: any) => ({
	setSearchBox: (ability: 'ENABLE' | 'DISABLE') => {
		dispatch(setSearchBoxAbility(ability));
	},
});

// const connector = connect(mapStateToProps, mapDispatchToProps);

export { default as LdoceContainer } from 'src/modules/ldoce/component/container/LdoceContainer';
export default connect(mapStateToProps, mapDispatchToProps)(LdoceContainer);
// export default connector(LdoceContainer);
