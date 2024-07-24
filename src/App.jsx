import { useState } from "react";
import ProjectSideBar from "./components/ProjectSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
  const [projectsState, setProjectsState] = useState({
    // undefined to set we are not doing anything 
    selectedProjectId: undefined,     
    projects: []
  });

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,    // and null to represent we are adding new project
      };
    });
  }

  let content;

  if(projectsState.selectedProjectId === null){
    content = <NewProject />;
  }
  else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onSatartAddProject={handleStartAddProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar onSatartAddProject={handleStartAddProject}/>
      {/* <NewProject /> */}
      {content}
    </main>
  );
}

export default App;
