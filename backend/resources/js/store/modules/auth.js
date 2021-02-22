import axios from 'axios'
import router from '../../router'

const state = {
  user: null,
  profile: null,
  token: window.localStorage.getItem('token'),
  errors: [],
  loading: false
}
const getters = {
  check: state => !!state.user,
  user: state => state.user ? state.user: '',
  profile: state => state.profile ? state.profile: '', 
  token: state => state.token ? state.token: '',
  errors: state => state.errors ? state.errors: [],
  loading: state => state.loading ? state.loading : '',
}
const mutations = {
  setUser(state, user){
    state.user = user
  },
  setToken(state, token){ 
    window.localStorage.setItem('token', token)
  },
  setProfile(state, profile){
    state.profile = profile
  },
  deleteUser(state, user){
    state.user = user
  },
  setLoading(state, loading){
    state.loading = loading
  },
  validate(state, val){
    if (val.login_id){
      val.login_id.forEach((v) =>{
        state.errors.push(v)
      })
    }
    if (val.name){
      val.name.forEach((v) =>{
        state.errors.push(v)
      })
    }
    if (val.email){
      val.email.forEach((v) =>{
        state.errors.push(v)
      })
    }
    if (val.password){
      val.password.forEach((v) =>{
        state.errors.push(v)
      })
    }
  },
  clearValidate(state){
    state.errors.splice(0)
  }
}
const actions = {
  async register(context, data) {
    context.commit('clearValidate')
    await axios.post('/api/register', data, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      }
    }).then((result) => {
      console.log(data)
      context.commit('setUser', result.data.user)
      context.commit('setToken', result.data.token)
      context.commit('setProfile', result.data.profile)
    }).then(()=> router.push({name: 'home'}))
      .catch(err => {
        console.log('err:', err.response.data.errors)
        console.log('失敗')
        const val = err.response.data.errors
        if (err.response.status === 422){
          context.commit('validate', val)
        } else {
          alert('変更に失敗しました。(ステータスコード:', err.response.status, ')')
        }
      })
  },
  async login(context, data){
    context.commit('clearValidate')
    context.commit('setLoading', true)
    await axios.get('/sanctum/csrf-cookie').then(()=> {
      axios.post('/api/login', data, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      }).then((result) => {
        console.log(data)
        context.commit('setUser', result.data.user)
        context.commit('setProfile', result.data.profile)
        context.commit('setToken', result.data.token)
        context.commit('setLoading', false)
      }).then(()=> router.push({ name: 'home', params: {successLogin: true}}))
        .catch(err => {
          context.commit('setLoading', false)
          console.log('err:', err.response.data.errors)
          console.log('失敗')
          const val = err.response.data.errors
          if (err.response.status === 422){
            context.commit('validate', val)
          } else {
            alert('変更に失敗しました。(ステータスコード:', err.response.status, ')')
          }
        })
    })
        
  },
  async logout(context, data) {
    await axios.post('/api/logout', data, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      }
    }).then((result) => {
      console.log(data)
      context.commit('deleteUser', null)
      context.commit('setToken', null)
      context.commit('setProfile', null)
    }).catch(error => {
      console.log(`Error! HTTP Status: ${error}`)
    })
  },
  async fetchUser(context){
    await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    }).then((result)=>{
      context.commit('setUser', result.data.user)
      context.commit('setProfile', result.data.profile)
      console.log(result.data)
    }).catch(error=>{
      console.log(`Error! HTTP Status: ${error}`)
    })
  },

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}