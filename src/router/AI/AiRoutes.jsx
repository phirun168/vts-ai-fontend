import ToolRoutes from './Tools/ChatBoard'
import WorkspaceRoutes from './Workspace/Workspace'
export default function GroupAIRoutes() {
  return [...ToolRoutes(), ...WorkspaceRoutes()]
}
