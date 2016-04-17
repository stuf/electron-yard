/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for the `FINISHED_SORTIE` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/finished-sortie
 * @flow
 */
import type { ApiRequest, ApiRequestResult } from '../../types/api';
import { sortieResult } from '../api/sortie-result';

/**
 * @event FINISHED_SORTIE
 * @param {__PROTO.ApiRequest} r
 */
export default function action$finishedSortie(r:ApiRequest):ApiRequestResult {
  return sortieResult(r.body);
}
