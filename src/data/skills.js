import Java from '../assets/icons/tech/java.svg?react';
import JavaScript from '../assets/icons/tech/javascript.svg?react';
import TypeScript from '../assets/icons/tech/typescript.svg?react';
import Sql from '../assets/icons/tech/sql.svg?react';
import Html from '../assets/icons/tech/html.svg?react';
import Css from '../assets/icons/tech/css.svg?react';
import Python from '../assets/icons/tech/python.svg?react';
import ReactIcon from '../assets/icons/tech/react.svg?react';
import Angular from '../assets/icons/tech/angular.svg?react';
import Vite from '../assets/icons/tech/vite.svg?react';
import Bootstrap from '../assets/icons/tech/bootstrap.svg?react';
import Tailwind from '../assets/icons/tech/tailwind.svg?react';
import Spring from '../assets/icons/tech/spring.svg?react';
import NodeJs from '../assets/icons/tech/nodejs.svg?react';
import Django from '../assets/icons/tech/django.svg?react';
import PostgreSql from '../assets/icons/tech/postgresql.svg?react';
import Mysql from '../assets/icons/tech/mysql.svg?react';
import Firebase from '../assets/icons/tech/firebase.svg?react';
import Jwt from '../assets/icons/tech/jwt.svg?react';
import Git from '../assets/icons/tech/git.svg?react';
import GitHub from '../assets/icons/tech/github.svg?react';
import Railway from '../assets/icons/tech/railway.svg?react';
import VsCode from '../assets/icons/tech/vscode.svg?react';
import MysqlWorkbench from '../assets/icons/tech/mysql-workbench.svg?react';

export const skillCategories = [
  {
    category: 'Lenguajes',
    items: [
      { name: 'Java', icon: Java },
      { name: 'JavaScript', icon: JavaScript },
      { name: 'TypeScript', icon: TypeScript },
      { name: 'Python', icon: Python },
      { name: 'SQL', icon: Sql },
      { name: 'HTML', icon: Html },
      { name: 'CSS', icon: Css },
    ],
  },
  {
    category: 'Frontend & UI',
    items: [
      { name: 'React', icon: ReactIcon },
      { name: 'Angular', icon: Angular },
      { name: 'Vite', icon: Vite },
      { name: 'Tailwind CSS', icon: Tailwind },
      { name: 'Bootstrap', icon: Bootstrap },
    ],
  },
  {
    category: 'Backend & BD',
    items: [
      { name: 'Spring Boot', icon: Spring },
      { name: 'Django / DRF', icon: Django },
      { name: 'Node.js', icon: NodeJs },
      { name: 'PostgreSQL', icon: PostgreSql },
      { name: 'MySQL', icon: Mysql },
      { name: 'Firebase', icon: Firebase },
      { name: 'JWT', icon: Jwt },
    ],
  },
  {
    category: 'Herramientas & Entorno',
    items: [
      { name: 'Git', icon: Git },
      { name: 'GitHub', icon: GitHub },
      { name: 'Railway', icon: Railway },
      { name: 'VS Code', icon: VsCode },
      { name: 'MySQL Workbench', icon: MysqlWorkbench },
    ],
  },
];
