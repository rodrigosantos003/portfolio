function openProject(project) {
  if (arguments.length === 1) {
    let link = "https://github.com/rodrigosantos003/" + project;
    window.open(link, "_blank");
  } else throw new Error("Projet unspecified");
}
