window.onload = function () {
  getProjects();
};

async function getProjects() {
  const url = "https://api.github.com/users/rodrigosantos003/repos";

  const response = await fetch(url);
  const projects = await response.json();

  projects.sort((a, b) => {
    if (a.created_at < b.created_at) return 1;
    else if (a.created_at > b.created_at) return -1;

    return 0;
  });

  var portfolioList = document.getElementsByClassName("portfolio-list")[0];

  projects.forEach((project) => {
    if (project.name != "rodrigosantos003") {
      var li = document.createElement("li");
      li.classList = "portfolio-item";
      var onclickEvent = "openProject('" + project.name + "')";
      li.setAttribute("onclick", onclickEvent);

      var img = document.createElement("img");
      var imageSource = "img/portfolio/" + project.name + ".png";
      var personalPageImage = "img/rodrigo_santos.jpg";
      if (project.name == "personal-page")
        img.setAttribute("src", personalPageImage);
      else img.setAttribute("src", imageSource);

      img.onerror = function () {
        this.src = "img/portfolio/default.png";
      };

      li.appendChild(img);

      var h3 = document.createElement("h3");
      h3.innerHTML = transformText(project.name);
      li.appendChild(h3);

      var p = document.createElement("p");
      p.innerHTML = project.description;
      li.appendChild(p);

      portfolioList.appendChild(li);
    }
  });
}

function openProject(project) {
  if (arguments.length === 1) {
    let link = "https://github.com/rodrigosantos003/" + project;
    window.open(link, "_blank");
  } else throw new Error("Projet unspecified");
}

function transformText(text) {
  var words = text.split("-");
  var result = "";
  var vowelList = "aeiouAEIUO";

  words.forEach((word) => {
    if (word.length == 2 || word.length == 3)
      result += word.toUpperCase() + " ";
    else result += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });

  return result;
}
