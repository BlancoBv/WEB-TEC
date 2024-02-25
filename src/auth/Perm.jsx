const Perm = (idPermiso) => {
  const permisos = JSON.parse(localStorage.getItem("user")).permisos || [];

  return permisos.some((el) => el.permisoIdpermiso == idPermiso);
};

export default Perm;
