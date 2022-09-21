/* eslint-disable */
export default class QuickFetchConfig {
    protected profix = 'https://sports.nsysu.edu.tw/server/api/';

    protected headers = {
        Authorization: `Bearer ${localStorage.sep5_reg_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    }
}
