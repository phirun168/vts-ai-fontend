const checkSideBar = (path = '', child = []) => {
  return child.includes(path)
}

const activeSideBar = (path) => {
  // console.log('pathname', path)
  if (
    checkSideBar(path, [
      '/all-search/search-customer-code',
      '/all-search/search-tracking',
      '/all-search/search-container',
      '/all-search/search-phone-number',
      '/all-search/search-goods',
    ])
  ) {
    return '/all-search'
  } else if (
    checkSideBar(path, [
      '/express-stock-report/express-stock',
      '/express-stock-report/scan-in',
      //  '/express-stock-report/live-scan-in' ,
      '/express-stock-report/live-counting',
      '/express-stock-report/live-print-bill',
      '/express-stock-report/print-bill',
      '/express-stock-report/goods-issues',
    ])
  ) {
    return '/express-stock-report'
  } else if (
    checkSideBar(path, [
      '/categories-commodities/categories',
      '/categories-commodities/commodity',
      '/categories-commodities/effective-date',
    ])
  ) {
    return '/categories-commodities'
  } else if (
    checkSideBar(path, [
      '/quotes-list/all-quote',
      '/quotes-list/planning-quote',
    ])
  ) {
    return '/quotes-list'
  } else if (checkSideBar(path, ['/create-code-customer'])) {
    return '/create-code'
  } else if (
    checkSideBar(path, [
      '/customer-internal-remark/internal-remark',
      '/customer-internal-remark/blacklist',
      '/customer-internal-remark/comment-lists',
    ])
  ) {
    return '/customer-internal-remark'
  } else if (
    checkSideBar(path, [
      '/follower-tasks/task',
      '/follower-tasks/follow-up',
      '/follower-tasks/holding',
      '/follower-tasks/stop-use-service',
      '/follower-tasks/use-other-code',
      '/follower-tasks/normal-use',
      '/follower-tasks/successfully',
      '/follower-tasks/total-customers',
    ])
  ) {
    return '/follower-tasks'
  } else if (checkSideBar(path, ['list-company'])) {
    return '/list-company'
  }

  //
  else {
    return location.pathname
  }
}
//
export default activeSideBar
