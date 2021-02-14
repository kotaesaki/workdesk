
const state = {
  id: null,
  profile: null,
  posts: null,
  tagss: null,
  start:0,
  end:10,
  startScrollYOffset: 0,
  postData:[],
  isGettingPosts:false
};
const getters = {
  id: state=>state.id ? state.id :'',
  profile: state=>state.profile ? state.profile :'',
  posts: state=>state.posts ? state.posts :'',
  tagss: state=>state.tagss ? state.tagss :'',
  start: state=>state.start ? state.start : 0,
  end: state=>state.end ? state.end : 10,
  startScrollYOffset: state=>state.startScrollYOffset ? state.startScrollYOffset : 0,
  postData: state=>state.postData ? state.postData : [],
  isGettingPosts:state=>state.isGettingPosts ? state.isGettingPosts: false,
};
const mutations = {
  setId(state,id){
    state.id = id;
  },
  setProfile(state,profile){
    state.profile = profile;
  },
  setPosts(state,posts){
    state.posts = posts;
  },
  setTagss(state,tagss){
    state.tagss = tagss;
  },
  setStart(state,start){
    state.start = start
  },
  setEnd(state,end){
    state.end = end;
  },
  setstartScrollYOffset(state,startScrollYOffset){
    state.startScrollYOffset = startScrollYOffset;
  },
  setpostData(state,postData){
    state.postData = postData;
  },
  infiniteHandler(state) {
    if(window.pageYOffset >= state.startScrollYOffset && !state.isGettingPosts){
        state.startScrollYOffset = window.innerHeight + window.pageYOffset;
        state.isGettingPosts = true;
        if(state.end <= state.posts.length){
            state.postData = state.postData
                .concat(state.posts.slice(state.start,state.end));
            state.start = state.start + 10;
            state.end = state.end + 10;
        }
        state.isGettingPosts = false;
    }
  },

};
const actions = {
  async getId({commit},userId) {
    await axios.get('/api/getId/' + userId).then((res)=>{
        commit('setId',res.data[0]);
        commit('setProfile',res.data[1]);
    }).catch(error=>{
        console.log(error);
    })
  },
  async startPost({commit, state},userId){
    await axios.get('/api/getPost/' + userId).then(res=>{
        if(!res.data[0]){
          commit('setPosts', '');
          commit('setTagss', '');
          return;
        }else if(res.data[0] && !res.data[1]){
            commit('setPosts', res.data[0]);
            commit('setTagss', '');
        }else{
            commit('setPosts', res.data[0]);
            commit('setTagss', res.data[1]);
        }
        if(state.end <= state.posts.length){
            commit('setpostData', state.postData
              .concat(state.posts.slice(state.start,state.end)))
            commit('setStart', state.start + 10);
            commit('setEnd', state.end + 10);
        }else{
            commit('setpostData', state.posts);
        }
    })
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}