import httpCommon from 'utils/http-common'
/*------[fetch module] List module--------*/
const fetchModule = (payload) => {
  return new Promise((resolve, reject) => {
    httpCommon
      .get('/opts/module', {
        headers: {
          Authorization: `Bearer ${payload.access_token}`,
        },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/*------end [fetch module] List module--------*/

//
const ModuleOptService = {
  fetchModule,
}
//
export default ModuleOptService
