import {createStore} from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'
import {DateTime} from "luxon";

export default createStore({
    state: {
        peerId: 1,
        user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : undefined,
        api: 'http://localhost:3000/'
    },
    mutations: {
        setUser(state, _user) {
            state.user = _user
        }
    },
    actions: {
        getUser: ({state}) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/user/${state.peerId}`, {
                    headers: {
                        'x-should-applied': DateTime.local().toMillis()
                    }
                }).then(response => {
                    resolve(response.data)
                }).catch(reason => {
                    reject(reason)
                })
            })
        },
        setUser: ({state, commit}, params) => {
            return new Promise((resolve, reject) => {
                axios.post(`${state.api}api/user`, params, {
                    headers: {
                        'x-should-applied': DateTime.local().toMillis()
                    }
                }).then(response => {
                    Cookies.set('user', response.data)
                    commit('setUser', response.data)
                    resolve(response.data)
                }).catch(reason => {
                    reject(reason)
                })
            })
        },
        getGroups: ({state}, params) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/college/${params.college}/groups`, {
                    params: {
                        complex: params.complex
                    }
                }).then(response => {
                    return resolve(response.data)
                }).catch(reason => {
                    return reject(reason)
                })
            })
        },
        getComplexes: ({state}, params) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/college/${params.college}/complexes`).then(value => {
                    return resolve(value.data)
                }).then(response => {
                    return resolve(response.data)
                }).catch(reason => {
                    return reject(reason)
                })
            })
        },
        getColleges: ({state}, params) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/colleges`, {
                    params: {
                        city: params.city || undefined
                    }
                }).then(response => {
                    return resolve(response.data)
                }).catch(reason => {
                    return reject(reason)
                })
            })
        },
        getCities: ({state}, params) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/cities`, {
                    params: {
                        region: params.region || undefined
                    }
                }).then(response => {
                    return resolve(response.data)
                }).catch(reason => {
                    return reject(reason)
                })
            })
        },
        getRegions: ({state}) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/regions`).then(value => {
                    return resolve(value.data)
                }).then(response => {
                    return resolve(response.data)
                }).catch(reason => {
                    return reject(reason)
                })
            })
        },
        getWeekLessons: ({state}, params) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/college/${params['college']}/lessonsWeek`, {
                    params: {
                        complex: params['complex'],
                        group: params['group']
                    }
                }).then(response => {
                    return resolve(response.data)
                }).catch(reason => {
                    return reject(reason)
                })
            })
        }
    },
    modules: {}
})
