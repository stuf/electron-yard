/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/game
 */
import { RECEIVED_API_DATA } from '../actions/game';

export default function gameReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVED_API_DATA && (action.payload && action.payload.$_type === 'GET_BASE_DATA'):
      // @todo(@stuf): clean this fucker up
      console.log(state, action);
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
