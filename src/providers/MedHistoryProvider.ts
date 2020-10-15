import { DrugLogRecord } from '../types/RecordTypes';
import Frak from "frak/lib/components/Frak";
import { ProviderTypes } from '../types/ProviderTypes';

type DeleteResponse = ProviderTypes.MedHistory.DeleteResponse;
type RecordResponse = ProviderTypes.MedHistory.RecordResponse;

/**
 * MedHistoryProvider API Connector
 */
const MedHistoryProvider = {
  _baseUrl: null as string | null,
  _apiKey: null as string | null,

  /**
   * @constructor
   * @param {frak: Frak, baseUrl: string, apiKey: string} rxFrak
   * @return {MedHistoryProvider}
   */
  init: (rxFrak: { baseUrl: string; apiKey: string }) => {
    MedHistoryProvider._baseUrl = rxFrak.baseUrl;
    MedHistoryProvider._apiKey = rxFrak.apiKey;
    return MedHistoryProvider;
  },

  /**
   * Search Interface
   *
   * @see https://www.notion.so/Willow-Framework-Users-Guide-bf56317580884ccd95ed8d3889f83c72
   * @param {object} options
   * @returns {Promise<DrugLogRecord[]>}
   */
  search: async (options: object): Promise<DrugLogRecord[]> => {
    const apiKey = MedHistoryProvider._apiKey;
    const uri = MedHistoryProvider._baseUrl + 'medhistory/search?api_key=' + apiKey;
    try {
      const response = await Frak.post<RecordResponse>(uri, options);
      if (response.success) {
        return response.data as DrugLogRecord[];
      } else {
        if (response.status === 404) {
          return [] as DrugLogRecord[];
        }
        throw new Error(response.toString());
      }
    } catch (err) {
      throw err;
    }
  },

  /**
   * Read interface
   *
   * @param {string | number} id
   * @returns {Promise<DrugLogRecord[]>}
   */
  read: async (id: string | number): Promise<DrugLogRecord> => {
    const apiKey = MedHistoryProvider._apiKey;
    const uri = MedHistoryProvider._baseUrl + 'medhistory/' + id + '?api_key=' + apiKey;
    try {
      const response = await Frak.get<RecordResponse>(uri);
      if (response.success) {
        return response.data as DrugLogRecord;
      } else {
        throw response;
      }
    } catch (err) {
      throw err;
    }
  },

  /**
   * Post interface
   *
   * @param {DrugLogRecord} drugInfo
   * @returns {Promise<DrugLogRecord>}
   */
  post: async (drugInfo: DrugLogRecord): Promise<DrugLogRecord> => {
    const apiKey = MedHistoryProvider._apiKey;
    const uri = MedHistoryProvider._baseUrl + 'medhistory?api_key=' + apiKey;
    try {
      const response = await Frak.post<RecordResponse>(uri, drugInfo);
      if (response.success) {
        return response.data as DrugLogRecord;
      } else {
        throw response;
      }
    } catch (err) {
      throw err;
    }
  },

  /**
   * Delete interface
   *
   * @param {string | number} drugId
   * @return {Promise<DeleteResponse>}
   */
  delete: async (drugId: string | number): Promise<DeleteResponse> => {
    const apiKey = MedHistoryProvider._apiKey;
    const uri = MedHistoryProvider._baseUrl + 'medhistory/' + drugId + '?api_key=' + apiKey;
    try {
      const response = await Frak.delete<RecordResponse>(uri);
      if (response.success) {
        return response;
      } else {
        throw response;
      }
    } catch (err) {
      return err;
    }
  },
};

export default MedHistoryProvider;
