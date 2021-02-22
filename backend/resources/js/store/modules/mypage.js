
const state = {
  id: null,
  profile: null,
  posts: null,
  tagss: null,
  postData: [],
  tagsData: [],
  page: 1,
  load: true,
  itemLoading: false,
}
const getters = {
  id: state=>state.id ? state.id :'',
  profile: state=>state.profile ? state.profile :'',
  posts: state=>state.posts ? state.posts :'',
  tagss: state=>state.tagss ? state.tagss :'',
  postData: state=>state.postData ? state.postData : [],
  tagsData: state=>state.tagsData ? state.tagsData : [],
  page: state => state.page ? state.page: '',
  load: state => state.load ? state.load: '',
  itemLoading: state => state.itemLoading ? state.itemLoading: '',
}
const mutations = {
  setId(state, id){
    state.id = id
  },
  setProfile(state, profile){
    state.profile = profile
  },
  setPosts(state, posts){
    state.posts = posts
  },
  setTagss(state, tagss){
    state.tagss = tagss
  },
  setpostData(state, postData){
    state.postData = postData
  },
  settagsData(state, tagsData){
    state.tagsData = tagsData
  },
  setPage(state, page){
    state.page = page
  },
  addPage(state){
    state.page += 1
  },
  setLoad(state, load){
    state.load = load
  },
  setItemLoading(state, itemLoading){
    state.itemLoading = itemLoading
  },
  clearVar(state){
    state.postData.splice(0)
    state.tagsData.splice(0)
    state.page = 1
    state.load = true
    state.itemLoading = false
  }

}
const actions = {
  async getId({commit}, userId) {
    await axios.get('/api/getId/' + userId).then((res)=>{
      if (res.data[1].age == 'null'){
        res.data[1].age = ''
      }
      if (res.data[1].sex == 'null'){
        res.data[1].sex = ''
      }
      if (res.data[1].occupation =='null'){
        res.data[1].occupation = ''
      }
      if (res.data[1].website_url == 'null'){
        res.data[1].website_url = ''
      }
      if (res.data[1].twitter_url == 'null'){
        res.data[1].twitter_url = ''
      }
      commit('setId', res.data[0])
      commit('setProfile', res.data[1])
    }).catch(error=>{
      console.log(error)
    })
  },
  async startPost({commit, state}, userId){
    if (state.load){
      if (!state.itemLoading){
        commit('setItemLoading', true)
        try {
          await axios.get('/api/getPost?page=' + state.page, {
            params: {
              userId: userId
            }
          }).then((result)=>{
            commit('setPosts', result.data[0].data)
            console.log(result.data[0].data)
            console.log(result.data[1][0].data)
            if (result.data[0].last_page === state.page){
              commit('setLoad', false)
            }
            if (result.data[0].data){
              result.data[0].data.forEach((n, i) => {
                state.postData.push(n)
              })
            }
            if (result.data[1][0].data){
              result.data[1][0].data.forEach((n, i) => {
                state.tagsData.push(n)
              })                      
            }
            state.page += 1
            return state.postData, state.tagsData
          })   
        } catch (e){
          commit('setLoad', false)
          commit('setItemLoading', false)
        } finally {
          commit('setItemLoading', false)
        }
      }
    }
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}