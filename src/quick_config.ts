/* eslint-disable */
export default class QuickFetchConfig {
    protected profix = 'https://sports.hs.ntnu.edu.tw/server/api/';

    protected headers = {
        Authorization: `Bearer ${localStorage.hsnua_admin_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    }
}
