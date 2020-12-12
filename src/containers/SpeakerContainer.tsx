import { connect } from 'react-redux';
import { setSearchBoxAbility } from 'src/store/searchBox/actions';
import Speaker from 'src/modules/common/component/Speaker';
const mapStateToProps = (state: any, ownProps: any) => {
    //
    return {
        ...ownProps,
        disabled: state.searchBox === 'DISABLE' ? true : false
    };
};
const mapDispatchToProps = (dispatch: any) => ({
    setSearchBox: (ability: 'ENABLE' | 'DISABLE') => {
        dispatch(setSearchBoxAbility(ability));
    }
});
export { default as Speaker } from 'src/modules/common/component/Speaker';
export default connect(mapStateToProps, mapDispatchToProps)(Speaker);
