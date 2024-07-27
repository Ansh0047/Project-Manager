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
    projects: [],
    tasks: [],
  });

  // similar to add the new project we are adding the multiple tasks
  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }
  
  // to delete the added tasks using the selected input
  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id != id),
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevSate) => {
      // in this state management function we are setting the selectdProject is to undefined
      // and copying the prevSate projects into new projects[] where selelcProjectId will not be there we are filtering that out
      // as we don't need the id of the project as we can get it from our prevSate
      return {
        ...prevSate,
        selectedProjectId: undefined,
        projects: prevSate.projects.filter(
          (project) => project.id !== prevSate.selectedProjectId
        ),
      };
    });
  }

  // this function will be called from the projectSideBar component where it will update this state
  // that which project is currently selected
  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id, // and id to represent the currently selected project
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null, // and null to represent we are adding new project
      };
    });
  }

  // this function to cancel the project and set to the undefined and set it back to the intial state
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  // now this function will be clled from the newProject component when user enters the details of the project
  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      // here we have create a new object to add the new project object which contains the deatils of the project
      // and using the spread operator we have added all the key value pairs of that object passed
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      // and here we have spread all the prevSate data and in the list of projects spread the prev projects and add new project
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  // now if we have selected the project and its id is updated in our projectSate and we can access that
  // so to select that prject from our projects list we use JS find method and check if it matches
  // with out selectedProjectId and will return it and pass the project(object) to the SelectedProject component.
  // else if no project is there then will render the NewProject or NoProjectSelected based on the State.
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  //  this we have conditionally check whcih one to render based on the UI
  // when we click on the button to add the project we we call the handle add project and it will update our state
  // to set it to null to make sure that we are adding a new project and will render the component based on the
  // condition check
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onSatartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar
        onSatartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject} // we will get the id from the projectSideBar of the selected project
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
