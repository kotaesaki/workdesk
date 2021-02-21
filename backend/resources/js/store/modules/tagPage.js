const state = {
  posts: [],
  users: [],
  profiles: [],
  data: []
}
const getters = {
  posts: state => state.posts ? state.posts: '',
  users: state => state.users ? state.users: '',
  profiles: state => state.profiles ? state.profiles : '',
  data: state => state.data ? state.data : '',
}
const mutations = {
  setPosts(state, posts){
    posts.forEach(element => {
      state.posts.push(element)
    })
  },
  setUsers(state, users){
    users.forEach(element => {
      state.users.push(element)
    })
  },
  setProfiles(state, profiles){
    profiles.forEach(element => {
      state.profiles.push(element)
    })
  },
  setData(state, data){
    data[0].forEach(element => {
      state.profiles.push(element)
    })
    data[1].forEach(element => {
      state.users.push(element)
    })
    data[2].forEach(element => {
      state.posts.push(element)
    })
    state.data = {
      'posts': state.posts,
      'users': state.users,
      'profiles': state.profiles
    }
  }
}
const actions ={
  async getTag({commit}, tag_id) {
    await axios.get('/api/tag', {
      params: {
        tag_id: tag_id
      }
    }).then(res=>{
      commit('setData', res.data)
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