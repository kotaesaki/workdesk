import axios from 'axios'

const state ={
  post: null,
  page: 1,
  load: true,
  itemLoading: false,
  items: []
}

const getters = {
  post: state => state.post ? state.post: '',
  page: state => state.page ? state.page: '',
  load: state => state.load ? state.load: '',
  itemLoading: state => state.itemLoading ? state.itemLoading: '',
  items: state => state.items ? state.items: '',
}

const mutations = {
  setPost(state, post){
    state.post = post
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
    state.page = 1
  }
}

const actions = {
  async ggetPost({commit, state}){
    if (state.load){
      if (!state.itemLoading){
        commit('setItemLoading', true)
        try {
          await axios.get('/api/timeline?page=' + state.page).then((result)=>{
            commit('setPost', result.data.data)
            if (result.data.last_page === state.page){
              commit('setLoad', false)
            }
            if (result.data.data){
              result.data.data.forEach((n) => {
                state.items.push(n)
              })
            }
            state.page += 1
            return state.items
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
