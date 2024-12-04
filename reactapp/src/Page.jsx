import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import UserMain from './UserMain';
import AdminMain from './AdminMain';
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from "js-cookie";

function RenderMain() {
  if (Cookies.get("employee_token") === undefined) return <UserMain />
  else return <AdminMain />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {RenderMain()}
  </StrictMode>,
)