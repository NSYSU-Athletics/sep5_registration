/* eslint-disable */
export default class QuickFetchConfig {
    protected profix = 'https://sports.nsysu.edu.tw/server/api/';

    protected headers = {
        Authorization: `Bearer ${localStorage.nsysu_sep5_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    }
}
