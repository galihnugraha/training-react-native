export const EMAILREGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// export const PASSWORDREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
export const PASSWORDREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
export const NUMBERREGEX = /^\d+$/