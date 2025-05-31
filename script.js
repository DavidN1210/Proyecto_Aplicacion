document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const botones = document.querySelectorAll('.btn');

  let operacion = '';

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const valor = boton.textContent;

      if (valor === 'C') {
        operacion = '';
        actualizarDisplay('0');
        return;
      }

      if (valor === '←') {
        operacion = operacion.slice(0, -1);
        actualizarDisplay(operacion || '0');
        return;
      }

      if (valor === '=') {
        try {
          const resultado = evaluarOperacion(operacion);
          actualizarDisplay(resultado);
          operacion = resultado.toString();
        } catch {
          actualizarDisplay('Error');
          operacion = '';
        }
        return;
      }

      const operadores = {
        '÷': '/',
        '×': '*',
        '−': '-',
        '+': '+'
      };

      if (valor in operadores) {
        const ultimo = operacion.slice(-1);
        if (['+', '-', '*', '/'].includes(ultimo)) {
          operacion = operacion.slice(0, -1);
        }
        operacion += operadores[valor];
      } else if (!isNaN(valor)) {
        operacion += valor;
      }

      actualizarDisplay(operacion);
    });
  });

  function actualizarDisplay(valor) {
    display.textContent = valor;
  }

  function evaluarOperacion(op) {
    const resultado = Function('"use strict"; return (' + op + ')')();
    if (!isFinite(resultado)) throw new Error('División inválida');
    return resultado;
  }
});
