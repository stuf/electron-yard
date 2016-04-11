/* eslint quote-props: 0, no-param-reassign: 0 */
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/actions/game
 * @flow
 */
import type { ApiRequest, ApiRequestResult } from '../types/api';

import { createAction } from 'redux-actions';
import T from 'immutable';
import ApiTransformers from '../transformers/kcsapi';

// const reduceFn = (acc, t) => acc.concat([t, ApiTransformers[t]]);
// const boundTransformersMap = T.Map(Object.keys(ApiTransformers).reduce(reduceFn, []));

export const RECEIVED_API_DATA:string = 'RECEIVED_API_DATA';
export const PARSED_API_DATA:string = 'PARSED_API_DATA';

/**
 * @type {Dockyard.Events}
 */
const EVENTS = T.Map({
  'api_start2': 'INITIALIZE_GAME',
  'api_port/port': 'GET_BASE_DATA',
  'mission/start': 'START_MISSION',
  'mission/result': 'COMPLETE_EXPEDITION',
  'req_mission/return_instruction': 'QUIT_MISSION',
  'quest/clearitemget': 'COMPLETE_QUEST',
  'kuosyou/destroyship': 'SCRAP_SHIP',
  'hokyu/charge': 'RESUPPLY_SHIP',
  'req_kousyou/createitem': 'CRAFT_ITEM',
  'req_kousyou/createship': 'CRAFT_SHIP',
  'req_kousyou/destroyship': 'DESTROY_SHIP',
  'req_kousyou/destroyitem2': 'DESTROY_ITEM',
  'req_kousyou/getship': 'GET_SHIP',
  'req_kaisou/powerup': 'MODERNIZE_SHIP',
  'req_hensei/change': 'CHANGE_SHIP',
  'req_quest/start': 'START_QUEST',
  'req_quest/stop': 'STOP_QUEST',
  'req_map/start': 'START_SORTIE',
  'req_map/next': 'NEXT_SORTIE_NODE',
  'req_sortie/battle': 'SORTIE_STAGE',
  'req_sortie/battleresult': 'FINISHED_SORTIE',
  'req_nyukyo/start': 'START_REPAIR',
  'req_member/get_practice_enemyinfo': 'GET_OPPONENT_INFO',
  'req_member/payitemuse': 'USE_PAID_ITEM',
  'req_practice/battle': 'START_PVP_BATTLE',
  'req_practice/midnight_battle': 'START_PVP_MIDNIGHT_BATTLE',
  'req_practice/battle_result': 'FINISHED_PRACTICE',
  'req_hensei/combined': 'FLEET_COMBINED',
  'req_combined_battle/battle_water': 'COMBINED_BATTLE_WATER_PHASE',
  'get_member/sortie_conditions': 'GET_SORTIE_CONDITIONS',
  'get_member/ship_deck': 'GET_FLEET',
  'get_member/deck': 'GET_FLEET_DATA',
  'get_member/basic': 'GET_PROFILE_DATA',
  'get_member/furniture': 'GET_FURNITURE',
  'get_member/slotitem': 'GET_SLOT_ITEMS',
  'get_member/useitem': 'GET_USABLE_ITEMS',
  'get_member/ndock': 'GET_REPAIR_DOCKS',
  'get_member/kdock': 'GET_CONSTRUCTION_DOCKS',
  'get_member/material': 'GET_MATERIAL',
  'get_member/questlist': 'GET_QUEST_LIST',
  'get_member/mission': 'GET_MISSION_LIST',
  'get_member/practice': 'GET_PVP_OPPONENT_LIST',
  'get_member/payitem': 'GET_PAID_ITEMS',
  'get_member/slot_item': 'GET_SLOT_ITEMS'
});
const transformers = T.Map(ApiTransformers);

export const getBaseData = createAction('GET_BASE_DATA', (data:ApiRequest):ApiRequestResult => {

});

export const parseApiData = createAction(RECEIVED_API_DATA, (data:ApiRequest):ApiRequestResult => {
  const event:string = EVENTS.find((v:string, k:string) => data.path.includes(k));

  if (!transformers.has(event)) {
    console.warn(`No handler for event ${event}`);
  }
  else {
    return transformers.get(event)(data);
  }
});
