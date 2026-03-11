
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Marks from './marks.jsx';
import QuizPage from './quiz.jsx';
import NamePage from './name.jsx';
import Attempts from './attemptsList.jsx';
import QuizInterface from './QuizInterface.jsx';
import SelectQuiz from './SelectQuiz.jsx';
import CreateQuizInfo from './CreateQuizInfo.jsx';
import CreateQuizForm from './CreateQuizForm.jsx';
import ManageQuiz from './ManageQuiz.jsx';
import QuizCreated from './QuizCreated.jsx';
import QuizDeleted from './QuizDeleted.jsx';

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/interface" />
    },{
      path:"/quizdeleted",
      element:<QuizDeleted/>
    },
    {
      path:"/quizcreated",
      element:<QuizCreated/>
    },
    {
      path:"/managequiz",
      element:<ManageQuiz />
    },
    {
      path:"/selectquiz",
      element:<SelectQuiz />
    },
    {
      path:"/createquizinfo",
      element:<CreateQuizInfo 
               />
    },
    {
      path:'/createquizform',
      element:<CreateQuizForm 
  />
    },
    {
      path:"/interface",
      element:<QuizInterface/>
    },
    {
      path: "/name",
      element: <NamePage />
    },
    {
    path: "/quiz",
    element: <QuizPage
        />
      
    },
    {
      path: "/result",
      element: (
        <Marks
     
        />
      ),
      children: [
        {
          path: "attempts",
          element: <Attempts 
          />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
};


export default RouterComponent
