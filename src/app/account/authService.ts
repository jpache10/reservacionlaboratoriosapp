// services/authService.ts

export const login = async (email: string, password: string) => {
    // Simular autenticación con un usuario y contraseña fijos
    const dummyUser = {
      email: "jesuspache26@unapec.edu.do",
      password: "daniel123",
      name: "jesuspache"
    };
  
    if (email === dummyUser.email && password === dummyUser.password) {
      // Almacenar la información del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(dummyUser));
      return { success: true, user: dummyUser };
    } else {
      return { success: false, message: "Correo o contraseña incorrectos" };
    }
  };
  
  export const logout = () => {
    // Eliminar la información del usuario del localStorage
    localStorage.removeItem("user");
  };
  
  export const getCurrentUser = () => {
    // Obtener la información del usuario desde localStorage
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  