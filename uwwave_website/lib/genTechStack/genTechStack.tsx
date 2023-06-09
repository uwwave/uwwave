enum Tech {
  JAVASCRIPT = "Javascript",
  HTML = "HTML",
  CSS = "CSS",
  REACT = "React",
  PHP = "PHP",
  SQL = "SQL",
  ANDROID = "Android",
  IOS = "iOS",
  ANGULAR = "Angular",
  ATOM = "Atom",
  AZURE = "Azure",
  DJANGO = "Django",
  DOCKER = "Docker",
  FIGMA = "Figma",
  FIREBASE = "Firebase",
  FLUTTER = "Flutter",
  GIT = "\\bGit\\b",
  GITHUB = "Github",
  GITLAB = "Gitlab",
  GRAPHQL = "GraphQL",
  JAVA = "Java",
  JEST = "Jest",
  JENKINS = "Jenkins",
  JIRA = "Jira",
  JUPYTER = "Jupyter",
  KOTLIN = "Kotlin",
  KUBERNETES = "Kubernetes",
  MATLAB = "MATLAB",
  LINUX = "Linux",
  MONGODB = "MongoDB",
  NEXTJS = "NextJS",
  NGINX = "NGINX",
  NODEJS = "NodeJS",
  PANDAS = "Pandas",
  POSTGRE = "Postgre",
  PYTHON = "Python",
  PYCHARM = "PyCharm",
  REDUX = "Redux",
  SCALA = "Scala",
  SELENIUM = "Selenium",
  TENSORFLOW = "TensorFlow",
  C = "\\bC\\b", // Match only "C" with word boundaries
  CPLUSPLUS = "\\bC\\+\\+", // Match only "C++" with word boundaries
  CSHARP = "C#",
}

const getTechFriendlyName = (tech: Tech) => {
  switch (tech) {
    case Tech.C:
      return "C";
    case Tech.CPLUSPLUS:
      return "C++";
    case Tech.GIT:
      return "Git";
    default:
      return tech;
  }
};

interface ITechFromText {
  name: string;
  icon?: JSX.Element;
}

const getTechIcon = (tech: Tech): JSX.Element | undefined => {
  switch (tech) {
    case Tech.JAVASCRIPT:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
          width="32px"
        />
      );
    case Tech.HTML:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
          width="32px"
        />
      );
    case Tech.CSS:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
          width="32px"
        />
      );
    case Tech.REACT:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          width="32px"
        />
      );
    case Tech.PHP:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
          width="32px"
        />
      );
    case Tech.SQL:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
          width="32px"
        />
      );
    case Tech.ANDROID:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-plain.svg"
          width="32px"
        />
      );
    case Tech.IOS:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
          width="32px"
        />
      );
    case Tech.ANGULAR:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
          width="32px"
        />
      );
    case Tech.ATOM:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/atom/atom-original.svg"
          width="32px"
        />
      );
    case Tech.AZURE:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"
          width="32px"
        />
      );
    case Tech.DJANGO:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
          width="32px"
        />
      );
    case Tech.DOCKER:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg"
          width="32px"
        />
      );
    case Tech.FIGMA:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
          width="32px"
        />
      );
    case Tech.FIREBASE:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
          width="32px"
        />
      );
    case Tech.FLUTTER:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
          width="32px"
        />
      );
    case Tech.GIT:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
          width="32px"
        />
      );
    case Tech.GITHUB:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          width="32px"
        />
      );
    case Tech.GITLAB:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          width="32px"
        />
      );

    case Tech.GRAPHQL:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
          width="32px"
        />
      );
    case Tech.JAVA:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg"
          width="32px"
        />
      );

    case Tech.JEST:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"
          width="32px"
        />
      );
    case Tech.JENKINS:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg"
          width="32px"
        />
      );

    case Tech.JIRA:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original-wordmark.svg"
          width="32px"
        />
      );

    case Tech.JUPYTER:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg"
          width="32px"
        />
      );
    case Tech.KOTLIN:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
          width="32px"
        />
      );
    case Tech.KUBERNETES:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
          width="32px"
        />
      );
    case Tech.MATLAB:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg"
          width="32px"
        />
      );
    case Tech.LINUX:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
          width="32px"
        />
      );
    case Tech.MONGODB:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg"
          width="32px"
        />
      );
    case Tech.NEXTJS:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
          width="32px"
        />
      );
    case Tech.NGINX:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
          width="32px"
        />
      );
    case Tech.NODEJS:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"
          width="32px"
        />
      );
    case Tech.PANDAS:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"
          width="32px"
        />
      );
    case Tech.POSTGRE:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
          width="32px"
        />
      );
    case Tech.PYTHON:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
          width="32px"
        />
      );
    case Tech.PYCHARM:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg"
          width="32px"
        />
      );
    case Tech.REDUX:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
          width="32px"
        />
      );
    case Tech.SCALA:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg"
          width="32px"
        />
      );
    case Tech.SELENIUM:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg"
          width="32px"
        />
      );
    case Tech.TENSORFLOW:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
          width="32px"
        />
      );
    case Tech.CPLUSPLUS:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
          width="32px"
        />
      );
    case Tech.CSHARP:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
          width="32px"
        />
      );
    case Tech.C:
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
          width="32px"
        />
      );

    default:
      return undefined;
  }
};

export const extractTechFromText = (text: string): ITechFromText[] => {
  const technologies: ITechFromText[] = [];

  // Loop through the technology list and search for mentions in the text
  for (const technology of Object.values(Tech)) {
    const regex = new RegExp(`${technology}`, "gi");
    const matches = text.match(regex);

    if (matches) {
      technologies.push({
        name: getTechFriendlyName(technology),
        icon: getTechIcon(technology),
      });
    }
  }

  return technologies;
};
