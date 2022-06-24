/*
This module is to provide a easy way to fetch data from the server.
*/
/* eslint-disable */

import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Config from './quick_config';

export class QuickFetch extends Config {
    protected url = '';

    private router = useRouter();

    private store = useStore();

    private dataset: any = {};

    // set url
    public Url(url: string) {
        this.url = this.profix + url;
        return this;
    }

    // error handler
    private ErrHdl(error: any) {
        if (error.response) {
            this.LogError(JSON.stringify(error.response));
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            this.LogError(JSON.stringify(error.request));
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            this.LogError(JSON.stringify(error.message));
        }
        console.log(error.config);
    }

    // method
    public Get():any {
        return axios.get(this.url, { headers: this.headers })
            .then((res) => res.data)
            .catch((err) => { this.ErrHdl(err); });
    }

    public Login(dataset:any):any {
        return axios.post(this.url, dataset)
            .then((res) => res.data)
            .catch((err) => { this.ErrHdl(err); });
    }

    public GetAll(target: any, tag: string|undefined = undefined):any {
        return axios.get(this.url, { headers: this.headers })
            .then((res) => {
                if (tag === undefined) {
                    target.value = res.data;
                    return res.data;
                }
                target.value = res.data[tag];
            })
            .catch((err) => { this.ErrHdl(err); });
    }

    public GetNoH(target: any):any {
        return axios.get(this.url)
            .then((res) => {
                target.value = res.data;
                return res.data;
            })
            .catch((err) => { this.ErrHdl(err); });
    }

    public Post(dataset:any):any {
        return axios.post(this.url, dataset, { headers: this.headers })
            .then((res) => res.data)
            .catch((err) => { this.ErrHdl(err); });
    }

    public Patch(id:string|number, dataset:any):any {
        return axios.patch(`${this.url}/${id}`, dataset, { headers: this.headers })
            .then((res) => res.data)
            .catch((err) => { this.ErrHdl(err); });
    }

    public Delete(id:string|number):any {
        return axios.delete(`${this.url}/${id}`, { headers: this.headers })
            .then((res) => res.data)
            .catch((err) => { this.ErrHdl(err); });
    }

    public Dataset() {
        this.dataset = {};
        return this;
    }

    public Add(key: string, val: string|number) {
        this.dataset[key] = val;
        return this;
    }

    public AddObj(key: string, val: any) {
        this.dataset[key] = val.value;
        return this;
    }

    public GetDset() {
        return this.dataset;
    }

    public EptObj(val: any) {
        if (val.value.length === 0) {
            return true;
        }
        return false;
    }

    public LogError(content: string) {
        this.Dataset().Add('user_agent', navigator.userAgent).Add('language', navigator.language).Add('platform', navigator.platform)
            .Add('vendor', navigator.vendor)
            .Add('content', content);
        axios.post(`${this.profix}error-log`, this.GetDset())
            .then((res: any) => {
                alert(`錯誤編號: ${res.data.data}`);
            });
    }
}

export class QuickData {
    private store = useStore();

    public changeLang(langCode: string) {
        this.store.commit('changeLanguage', langCode);
    }

    public getLang() {
        return this.store.state.language;
    }

    public setYear(year: number) {
        this.store.commit('setYear', year);
    }

    public Alert(message: string|number) {
        this.store.commit('setMessageBox', message);
    }

    public getYear() {
        return this.store.state.year;
    }
}
