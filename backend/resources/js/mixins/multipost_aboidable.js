export default {
    data() {
      return {
        isPosting: false
      };
    },
    methods: {
      beginPost() {
        this.isPosting = true;
      },
      endPost() {
        this.isPosting = false;
      },
      async avoidMultipost(func) {
        if (this.isPosting) {
          return null;
        }
        this.beginPost();
        let res = await func();
        this.endPost();
        return res;
      }
    }
  };