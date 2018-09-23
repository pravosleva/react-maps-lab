import * as actionType from '../actions/ActionType';


const example12 = (state = {
  apiKey: 'pk.eyJ1IjoicHJhdm9zbGV2YSIsImEiOiJjam1kdjhteWoxd3dqM3Fub3cwdHQwcjliIn0.K22j2XDOMVxOtifQIEzxeg', // default api key
  // pk.eyJ1IjoicHJhdm9zbGV2YSIsImEiOiJjam1kdmJ4azgxZnEzM3FwdGdiZzllOGJ1In0.D-3eFTb0FwfwD66kwlx7Bg
  confirmedByUser: false,
}, action) => {
  switch (action.type) {
    case actionType.UPDATE_EXAMPLE12:
      return { ...action.payload };
    default:
      return state
  }
}

export default example12;
