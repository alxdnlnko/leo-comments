export default {
  getUser: store => store.user,
  getComments: store => store.allIds.map(id => store.byId[id]),
  getCommentsCount: store => store.allIds.length,
  getIsLoading: store => store.isLoading
};