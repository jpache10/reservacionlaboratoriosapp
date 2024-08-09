// services/authService.ts

export const login = async (email: string, password: string) => {
  // Simular autenticación con un usuario y contraseña fijos
  const dummyUser = {
    email: "juan.perez11@unapec.edu.do",
    password: "daniel123",
    name: "Juan Perez"
  };

  if (email === dummyUser.email && password === dummyUser.password) {
    // Almacenar la información del usuario en localStorage
    localStorage.setItem("user", JSON.stringify(dummyUser));

    // Refrescar la página después del login exitoso
    window.location.reload();

    return { success: true, user: dummyUser };
  } else {
    return { success: false, message: "Correo o contraseña incorrectos" };
  }
};

  export const logout = () => {
    // Eliminar la información del usuario del localStorage
    localStorage.removeItem("user");
    window.location.reload();
  };
  
  export const getCurrentUser = () => {
    // Obtener la información del usuario desde localStorage
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  