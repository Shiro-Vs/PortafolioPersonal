// Formulario de contacto
function enviarMensaje(e) {
  e.preventDefault();
  const estado = document.getElementById("estado-formulario");
  if (estado) {
    estado.textContent = "Gracias por tu mensaje. ¡Te responderé pronto!";
    estado.style.display = "block"; // Asegurar que se vea

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      estado.style.display = "none";
      estado.textContent = "";
    }, 5000);
  }
  e.target.reset();
}

// Animación de escritura (Typing effect)
document.addEventListener("DOMContentLoaded", () => {
  const palabras = ["Minimalismo", "Rendimiento", "UI/UX"];
  const etiqueta = document.getElementById("etiqueta-dinamica");

  if (!etiqueta) return;

  let i = 0; // índice de palabra
  let j = 0; // índice de letra
  let borrando = false;

  const speedWrite = 120; // velocidad al escribir
  const speedDelete = 60; // velocidad al borrar
  const pause = 900; // pausa cuando termina de escribir

  function type() {
    const palabra = palabras[i];

    if (!borrando) {
      etiqueta.textContent = palabra.substring(0, j);
      if (j === palabra.length) {
        borrando = true;
        return setTimeout(type, pause);
      }
      j++;
      return setTimeout(type, speedWrite);
    }

    // Borrando
    etiqueta.textContent = palabra.substring(0, j);
    if (j === 0) {
      // Pasar a la siguiente palabra SIN que aparezca completa
      borrando = false;
      i = (i + 1) % palabras.length;
      j = 0; // clave para evitar el flash
      etiqueta.textContent = ""; // limpia por si acaso
      return setTimeout(type, 500); // pequeña pausa antes de escribir la siguiente
    }
    j--;
    return setTimeout(type, speedDelete);
  }

  type();
});
