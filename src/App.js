import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import RootPage from "./pages/Root";
import HomePage, { loader as homeLoader } from "./pages/Home";
import LoginPage from "./pages/Login";
import SearchPage from "./pages/Search.js";
import KakaoTokenPage, { loader as tokenLoader } from "./pages/KakaoToken";
import { defaultLoader } from "./util/auth";
import Write, { loader as writeLoader } from "./components/write";
import { action as writeAction } from "./components/WritingArea";
import MyPage from "./components/MyPage";
import PostPage, { loader as postPageLoader } from "./components/PostPage";
import PopularPostPage, { loader as postListLoader } from "./pages/PopularPost";
import ErrorPage from "./pages/Error";

export const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    id: "root",
    loader: defaultLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/login/token",
        id: "token",
        element: <KakaoTokenPage />,
        loader: tokenLoader,
      },
      {
        path: "/write",
        element: <Write />,
        id: "write",
        loader: writeLoader,
        action: writeAction,
      },

      {
        path: "/posts/list/:cateId/",
        element: <PopularPostPage />,
        loader: postListLoader,
      },
      {
        path: "/posts/detail/:postId/",
        element: <PostPage />,
        loader: postPageLoader,
      },
      {
        path: "/Mypage",
        element: <MyPage />,
      },

      {
        path: "/SearchPage",
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  // const REACT_APP_KAKAOLOGIN = process.env.REACT_APP_KAKAOLOGIN_APPKEY;
  // const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  // const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAOLOGIN_APPKEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  // const getKakaoLogin = async () => {
  //   console.log(REACT_APP_KAKAOLOGIN, REACT_APP_REDIRECT_URI);
  //   window.location.href = link;
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
