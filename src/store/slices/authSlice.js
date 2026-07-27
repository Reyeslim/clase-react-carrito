import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    id: "7ed34f82-7c30-4491-a2ce-83da6e3a11f0",
    email: "reyes@test.com",
    role: "admin",
  },
  token: localStorage.getItem("token") || "demo-token",
}

export default function authReducer(state = initialState) {
  return state
}
