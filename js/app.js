document.addEventListener('DOMContentLoaded', () => {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // select elements from the interface

    const inputEmail = document.querySelector('#email');

    const inputEmail2 = document.querySelector('#email2');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#message');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    const spinner = document.querySelector('#spinner');


    inputEmail.addEventListener('input', validar);
    inputEmail2.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    function enviarEmail(e){

        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }


    function validar(e){

        if(e.target.value.trim() === ''){
            if(e.target.id === 'email2'){
                limpiarAlerta(e.target.parentElement);
                return;  
            }
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('Email no valido', e.target.parentElement);
            email[e.target.name] = '';
            return;
        }
        if(e.target.id === 'email2' && !validarEmail(e.target.value)){
            mostrarAlerta('Destinatario 2 no valido', e.target.parentElement);
            email[e.target.name] = '';
            return;
        }

        limpiarAlerta(e.target.parentElement);
        email[e.target.name] = e.target.value;

        validarEmail(); 
    }


    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-700', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-2', 'font-bold', 'text-sm', 'uppercase');
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-700');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
    
    function resetFormulario() {
        // reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
    }
});