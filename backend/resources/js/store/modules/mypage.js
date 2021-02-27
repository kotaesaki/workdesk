import axios from 'axios'
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
  profileLoading: false,

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
  profileLoading: state => state.profileLoading ? state.profileLoading: '',

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
  setProfileLoading(state, profileLoading){
    state.profileLoading = profileLoading
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
  async getId({commit, state}, userId) {
    commit('setProfileLoading', true)
    await axios.get('/api/getId/' + userId).then((res)=>{
      if (res.data.profile.age == 'null'){
        res.data.profile.age = ''
      }
      if (res.data.profile.sex == 'null'){
        res.data.profile.sex = ''
      }
      if (res.data.profile.occupation =='null'){
        res.data.profile.occupation = ''
      }
      if (res.data.profile.website_url == 'null'){
        res.data.profile.website_url = ''
      }
      if (res.data.profile.twitter_url == 'null'){
        res.data.profile.twitter_url = ''
      }
      commit('setId', res.data)
      commit('setProfile', res.data.profile)
      commit('setProfileLoading', false)
    }).catch(error=>{
      if (axios.isCancel(error)){
        console.log('リクエストがキャンセルされました。')
      }
      console.log(error)
      commit('setProfileLoading', false)
      alert('プロフィールの取得に失敗しました。status:'+ error.response.status)
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
              result.data[0].data.forEach((n) => {
                state.postData.push(n)
              })
            }
            if (result.data[1][0].data){
              result.data[1][0].data.forEach((n) => {
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
  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}