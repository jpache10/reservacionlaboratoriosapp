export default function Page() {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/steel-blue-abstract-background-wallpaper-image_53876-104016.jpg?t=st=1718390084~exp=1718393684~hmac=cbd436d7a363defc723cd33dfa72f8784b740749007a33f396a60a5543532742&w=2000')"}}>
      {/* <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div> */}
      <div className="absolute inset-0 z-0 opacity-75 bg-gradient-to-b from-[#34CDEA]/90 to-[#348DEA]/80"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <img src="" className="mb-3" />
            <h1 className="mb-3 font-bold text-5xl">Bienvenido </h1>
            <p className="pr-3">
              Bienvenido al Sistema de Reservación de Laboratorios. Nuestro
              sistema permite gestionar campus, edificios, tipos de aulas,
              laboratorios y usuarios, optimizando la eficiencia en la
              administración de recursos y reservas.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">
                Iniciar sesión{" "}
              </h3>
              <p className="text-gray-500">
                Inicie sesión para ingresar en su cuenta.
              </p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white-700 tracking-wide">
                  Correo
                </label>
                <input
                  className=" w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="text"
                  placeholder="mail@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-white-700 tracking-wide">
                  Contraseña
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Recordarme
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-[#0400C0] hover:text-[#34CDEA]">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-[#0400C0]  hover:bg-[#34CDEA] text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2024
                <a
                  href="https://codepen.io/uidesignhub"
                  rel=""
                  target="_blank"
                  title="Ajimon"
                  className="text-green hover:text-[#34CDEA]"
                >
                  {" "}
                  UNAPEC
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
