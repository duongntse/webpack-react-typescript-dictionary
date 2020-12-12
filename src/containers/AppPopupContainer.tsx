import {
    connect
    // ConnectedProps
} from 'react-redux';
import AppPopup from 'src/modules/popup/AppPopup';
import { setSearchBoxAbility } from 'src/store/searchBox/actions';
import { DISABLE } from 'src/store/searchBox/constants';
import { IStoreState } from 'src/store/types';
const mapStateToProps = (state: IStoreState) => {
    return {
        disabled: DISABLE == state.searchBox.ability ? true : false,
    };
};
const mapDispatchToProps = (dispatch: any) => ({
    setSearchBox: (ability: 'ENABLE' | 'DISABLE') => {
        dispatch(setSearchBoxAbility(ability));
    }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// type Props = PropsFromRedux;

export default connector(AppPopup);
