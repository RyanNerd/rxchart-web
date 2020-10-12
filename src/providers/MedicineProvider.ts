import { MedicineRecord } from '../types/RecordTypes';
import Frak from './Frak';
import { ProviderTypes } from '../types/ProviderTypes';

type DeleteResponse = ProviderTypes.Medicine.DeleteResponse;
type RecordResponse = ProviderTypes.Medicine.RecordResponse;

/**
 * MedicineProvider API connector
 */
const MedicineProvider = {
  _frak: Frak,
  _baseUrl: null as string | null,
  _apiKey: null as string | null,

  /**
   * MedicineProvider constructor
   *
   * @constructor
   * @param {frak: Frak, baseUrl: string, apiKey: string} rxFrak
   * @return {MedicineProvider}
   */
  init: (rxFrak: { frak: typeof Frak; baseUrl: string; apiKey: string }) => {
    MedicineProvider._frak = rxFrak.frak;
    MedicineProvider._apiKey = rxFrak.apiKey;
    MedicineProvider._baseUrl = rxFrak.baseUrl;
    return MedicineProvider;
  },

  /**
   * Search Interface
   *
   * @param {object} options
   * @returns {Promise<MedicineRecord[]>}
   */
  search: async (options: object): Promise<MedicineRecord[]> => {
    const uri = MedicineProvider._baseUrl + 'medicine/search?api_key=' + MedicineProvider._apiKey;
    try {
      const response = await MedicineProvider._frak.post<RecordResponse>(uri, options);
      if (response.success) {
        return response.data as MedicineRecord[];
      } else {
        if (response.status === 404) {
          return [] as MedicineRecord[];
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
   * @returns {Promise<MedicineRecord>}
   */
  read: async (id: number | string): Promise<MedicineRecord> => {
    const apiKey = MedicineProvider._apiKey;
    const uri = MedicineProvider._baseUrl + 'medicine/' + id + '?api_key=' + apiKey;
    try {
      const response = await MedicineProvider._frak.get<RecordResponse>(uri);
      if (response.success) {
        return response.data as MedicineRecord;
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
   * @param {MedicineRecord} drugInfo
   * @returns {Promise<MedicineRecord>}
   */
  post: async (drugInfo: MedicineRecord): Promise<MedicineRecord> => {
    const apiKey = MedicineProvider._apiKey;
    const uri = MedicineProvider._baseUrl + 'medicine?api_key=' + apiKey;
    try {
      const response = await MedicineProvider._frak.post<RecordResponse>(uri, drugInfo);
      if (response.success) {
        return response.data as MedicineRecord;
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
   * @returns {Promise<DeleteResponse>}
   */
  delete: async (drugId: string | number): Promise<DeleteResponse> => {
    const apiKey = MedicineProvider._apiKey;
    const uri = MedicineProvider._baseUrl + 'medicine/' + drugId + '?api_key=' + apiKey;
    try {
      const response = await MedicineProvider._frak.delete<RecordResponse>(uri);
      if (response.success) {
        return response;
      } else {
        throw response;
      }
    } catch (err) {
      throw err;
    }
  },
};

export default MedicineProvider;
