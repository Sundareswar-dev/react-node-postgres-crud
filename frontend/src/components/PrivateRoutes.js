
export const PrivateRoutes=({children})=>{
    const token=localStorage.getItem("token")
    return token ? children : <h3>Invalid credentials</h3> 

}