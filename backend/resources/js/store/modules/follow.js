import axios from 'axios'

const state={
  status: null,
  follow: null,
  follower: null,
  countFollow: null,
  countFollower: null,
  controller: new AbortController()
}

const getters = {
  status: state =>state.status ? state.status: '',
  follow: state =>state.follow ? state.follow: '',
  follower: state => state.follower ? state.follower: '',
  countFollow: state => state.countFollow ? state.countFollow: '',
  countFollower: state => state.countFollower ? state.countFollower: '',
}

const mutations = {
  setStatus(state, status){
    state.status = status
  },
  setFollow(state, follow){
    state.follow = follow
  },
  setFollower(state, follower){
    state.follower = follower
  },
  setcountFollow(state, countFollow){
    state.countFollow = countFollow
  },
  setcountFollower(state, countFollower){
    state.countFollower = countFollower
  },
  setController(state, controller){
    state.controller = controller
  }
}

const actions = {
  async pushFollow(context, data){
    await axios.post('/api/follow', data).then(result=>{
      context.commit('setStatus', result.data)
    }).catch(error=>{
      console.log(error)
    })
  },
  async deleteFollow(context, data){
    await axios.delete('/api/follow', {data: data}).then(result=>{
      context.commit('setStatus', result.data)
    }).catch(error=>{
      console.log(error)
    })
  },
  async checkFollow({commit}, {auth_user, post_user}){
    await axios('/api/follow', {
      params: {
        auth_user: auth_user,
        post_user: post_user
      }
    }).then(result=>{
      commit('setStatus', result.data)
      console.log(result.data)
    }).catch(error=>{
      console.log(error)
    })
  },
  async showFollow({commit}, user_id){
    await axios.get('/api/follow/'+ user_id, {
      params: {
        user_id: user_id
      }
    }).then(result=>{
      commit('setFollow', result.data.follow)
    }).catch(error=>{
      console.log(error)
    })
  },
  async showFollower({commit}, user_id){
    await axios.get('/api/follower/'+ user_id, {
      params: {
        user_id: user_id
      }
    }).then(result=>{
      commit('setFollower', result.data.follower.follow_users)
    }).catch(error=>{
      console.log(error)
    })
  },
  countFollow({commit}, user_id){
    const params = {
      user_id: user_id,
    }
    const query_params = new URLSearchParams(params)
    axios.get(`/api/countFollow?${query_params}`)
      .then(result=>{
        commit('setcountFollow', result.data[0])
        commit('setcountFollower', result.data[1])
      }).catch(error=>{
        console.log(error)
      })
  },
  cancel({state}){
    state.controller.abort()
  }, 
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}