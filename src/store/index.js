import {createStore} from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

export default createStore({
    state: {
        peerId: 1,
        user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : undefined,
        api: 'https://intachserver.herokuapp.com/'
    },
    mutations: {
        setUser(state, _user) {
            state.user = _user
        }
    },
    actions: {
        getUser: ({state}) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/users/${state.peerId}`).then(response => {
                    resolve(response.data)
                }).catch(reason => {
                    reject(reason)
                })
            })
        },
        setUser: ({state, commit}, params) => {
            return new Promise((resolve, reject) => {
                axios(`${state.api}api/users/${state.peerId}`).then(user => {
                    if (user.data) {
                        axios.put(`${state.api}api/users/${state.peerId}`, params).then(response => {
                            Cookies.set('user', response.data)
                            commit('setUser', response.data)
                            resolve(response.data)
                        }).catch(reason => {
                            reject(reason)
                        })
                    } else {
                        console.log(params)
                        axios.post(`${state.api}api/users`, params).then(response => {
                            Cookies.set('user', response.data)
                            commit('setUser', response.data)
                            resolve(response.data)
                        }).catch(reason => {
                            reject(reason)
                        })
                    }
                }).catch(reason => {
                    reject(reason)
                })
            })
        },
        getGroups: ({state}, params) => {
            return new Promise((resolve, reject) => {
                axios.get(`${state.api}api/colleges/${params.college}/methods/groups`, {
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
                axios.get(`${state.api}api/colleges/${params.college}/methods/complexes`).then(value => {
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
                        cityId: params.city || undefined
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
                        regionId: params.region || undefined
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
                axios.get(`${state.api}api/colleges/${params['college']}/methods/lessonsWeek`, {
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
