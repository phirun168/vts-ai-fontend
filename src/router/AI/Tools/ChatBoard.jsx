import BoardAI from '../../../pages/Ai/Tools/ChatAi/[chatid]/Home'
const ToolRoutes = () => {
  const routes = [
    {
      path: '/chat-board/*',
      element: <BoardAI />,
    },
  ]
  return routes
}
export default ToolRoutes
