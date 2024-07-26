import { useState } from "react";
import ProjectSideBar from "./components/ProjectSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  // this state is used to define the properties of the new project to be added
  // intially it is set to project id is set to undefined and a projects array which is empty
  const [projectsState, setProjectsState] = useState({
    // undefined to set we are not doing anything 
    selectedProjectId: undefined,     
    projects: []
  });

  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,    // and null to represent we are adding new project
      };
    });
  }

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,    // and null to represent we are adding new project
      };
    });
  }

  function handleCancelAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined, 
      };
    });
  }

  // now this function will be clled from the newProject component when user enters the details of the project
  function handleAddProject(projectData){
    setProjectsState(prevState =>{
      // here we have create a new object to add the new project object which contains the deatils of the project
      // and using the spread operator we have added all the key value pairs of that object passed
      const projectId = Math.random;
      const newProject = {
        ...projectData,
        id: projectId
      };
      // and here we have spread all the prevSate data and in the list of projects spread the prev projects and add new project
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject project={selectedProject}/>
  //  this we have conditionally check whcih one to render based on the UI
  if(projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  }
  else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onSatartAddProject={handleStartAddProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar 
        onSatartAddProject={handleStartAddProject} 
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {/* <NewProject /> */}
      {content}
    </main>
  );
}

export default App;
