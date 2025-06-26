<!-- Script para ocultar/mostrar sidebar -->
function ocultarBarra()
{

    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');

    toggleBtn.addEventListener('click', () => {
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'block';
            document.body.style.marginLeft = '220px';
        } else {
            sidebar.style.display = 'none';
            document.body.style.marginLeft = '0';
        }
    });
}


/*GRAFICOOOO TORTTAAAAAA=================================

// JavaScript mejorado para el gráfico circular
    document.addEventListener('DOMContentLoaded', function() {
        initProgressChart();
    });

    function initProgressChart() {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');

        if (!progressFill || !progressText) {
            console.error('Elementos del gráfico no encontrados');
            return;
        }

        // Obtener el porcentaje de progreso del texto
        let progress = 0;
        const progressTextContent = progressText.textContent;

        if (progressTextContent) {
            const match = progressTextContent.match(/(\d+)/);
            if (match) {
                progress = parseInt(match[1]);
            }
        }

        // Validar que el progreso esté en el rango correcto
        progress = Math.min(Math.max(progress, 0), 100);

        // Actualizar el texto del progreso
        progressText.textContent = progress + '%';

        // Aplicar el progreso usando CSS custom properties
        const angle = (progress / 100) * 360;
        progressFill.style.setProperty('--progress-angle', angle + 'deg');

        // Animación suave
        progressFill.style.background = `conic-gradient(#39A900 0deg, #39A900 ${angle}deg, transparent ${angle}deg)`;
    }

    // Función para ocultar/mostrar barra lateral
    function ocultarBarra() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        const body = document.body;

        if (sidebar.style.left === '-220px') {
            sidebar.style.left = '0';
            body.style.marginLeft = '220px';
        } else {
            sidebar.style.left = '-220px';
            body.style.marginLeft = '0';
        }
    }*/






//  <!--GRAFICCOOOOO-->
// resources/static/js/grafico.js

document.addEventListener('DOMContentLoaded', function() {
    initDynamicProgressChart();
});

function initDynamicProgressChart() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (!progressFill || !progressText) {
        console.error('Elementos del gráfico no encontrados');
        return;
    }

    // Función para actualizar el progreso
    function updateProgress(newPercentage) {
        const progress = Math.min(Math.max(newPercentage, 0), 100);
        progressText.textContent = `${progress}%`;
        animateProgress(progressFill, progress);
    }

    // Animación mejorada
    function animateProgress(element, targetPercent) {
        // Si el progreso es 0%, ocultamos completamente la barra
        if (targetPercent === 0) {
            element.style.background = `conic-gradient(#39A900 0deg, #39A900 0deg, transparent 0deg)`; // Establecer a 0%
            element.style.display = 'block'; // Mantener visible pero vacío
            return;
        }

        element.style.display = 'block';
        const targetAngle = (targetPercent / 100) * 360;
        let currentAngle = 0;
        const duration = 1500;
        const startTime = performance.now();

        function updateAnimation() {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            currentAngle = targetAngle * easeOutQuart(progress);

            // Aplicamos el ángulo calculado usando conic-gradient para el efecto de arco
            element.style.background = `conic-gradient(#39A900 0deg, #39A900 ${currentAngle}deg, transparent ${currentAngle}deg)`;

            if (progress < 1) {
                requestAnimationFrame(updateAnimation);
            }
        }

        updateAnimation();
    }

    // Función de easing
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    // Carga inicial con el porcentaje del texto
    const initialText = progressText.textContent;
    const initialPercent = initialText ? parseInt(initialText.replace('%', '')) || 0 : 0;
    updateProgress(initialPercent);

    // Para actualizaciones dinámicas
    window.updateProgressChart = updateProgress;
}

<!--EDITAR PERFILLL-->

/**
     * Función para habilitar la edición del formulario
     * - Deshabilita el botón "Editar"
     * - Habilita todos los campos del formulario
     * - Habilita los botones "Guardar" y "Cancelar"
     */
    function habilitarEdicion() {
        // Deshabilitar botón Editar
        document.getElementById('btnEditar').disabled = true;

        // Habilitar todos los campos del formulario (sin efectos visuales)
        const campos = document.querySelectorAll('.form-control-wide, .form-select-wide');
        campos.forEach(campo => {
            campo.disabled = false;
        });

        // Habilitar botones Guardar y Cancelar
        document.getElementById('btnGuardar').disabled = false;
        document.getElementById('btnCancelar').disabled = false;

        // Enfocar el primer campo
        document.querySelector('.form-control-wide').focus();
    }

    /**
     * Función para cancelar la edición del formulario
     * - Recarga la página para restaurar los valores originales
     * - Restablece el estado inicial del formulario
     */
    function cancelarEdicion() {
        // Confirmar cancelación
        if (confirm('¿Está seguro de que desea cancelar? Se perderán los cambios no guardados.')) {
            // Recargar la página para restaurar valores originales
            window.location.reload();
        }
    }

    /**
     * Función para restablecer el estado inicial después de guardar
     * Se ejecuta cuando el formulario se envía exitosamente
     */
    function restablecerEstadoInicial() {
        // Habilitar botón Editar
        document.getElementById('btnEditar').disabled = false;

        // Deshabilitar todos los campos del formulario
        const campos = document.querySelectorAll('.form-control-wide, .form-select-wide');
        campos.forEach(campo => {
            campo.disabled = true;
        });

        // Deshabilitar botones Guardar y Cancelar
        document.getElementById('btnGuardar').disabled = true;
        document.getElementById('btnCancelar').disabled = true;
    }

     /**
        * Interceptar el envío del formulario para validación y manejo de estado
        */
       document.querySelector('form').addEventListener('submit', function(e) {
           // Solo validación, NO restablecer estado aquí
           const campos = document.querySelectorAll('.form-control-wide, .form-select-wide');

           for (let campo of campos) {
               if (campo.value.trim() === '') {
                   e.preventDefault();
                   alert('Por favor complete todos los campos obligatorios');
                   campo.focus();
                   return;
               }
           }
           // El formulario se enviará normalmente con todos los campos habilitados
       });

    /**
     * Asegurar que el estado inicial esté correcto cuando se carga la página
     */
    document.addEventListener('DOMContentLoaded', function() {
        // Si hay un mensaje de éxito, restablecer el estado inicial
        if (document.querySelector('.alert-success')) {
            restablecerEstadoInicial();
        }
    });


/*=========================SELECTS FILTRABLES===============================*/

/**
 * Clase para manejar selects con filtrado en tiempo real (SIN TILDES)
 * Versión mejorada con mejor posicionamiento
 */
class FilterableSelect {
    constructor(searchInputId, dropdownId, hiddenSelectId) {
        this.searchInput = document.getElementById(searchInputId);
        this.dropdown = document.getElementById(dropdownId);
        this.hiddenSelect = document.getElementById(hiddenSelectId);
        this.container = this.searchInput?.closest('.filterable-select-container');

        if (!this.searchInput || !this.dropdown || !this.hiddenSelect || !this.container) {
            console.warn(`FilterableSelect: No se encontraron elementos para ${searchInputId}`);
            return;
        }

        this.options = Array.from(this.dropdown.querySelectorAll('.filterable-option'));
        this.selectedIndex = -1;
        this.isOpen = false;

        this.init();
    }

    init() {
        // IMPORTANTE: Ocultar dropdown inicialmente
        this.hideDropdown();

        // Configurar eventos
        this.searchInput.addEventListener('input', (e) => this.filterOptions(e.target.value));
        this.searchInput.addEventListener('focus', () => this.showDropdown());

        // Mejorar el manejo del blur
        this.searchInput.addEventListener('blur', (e) => {
            // Verificar si el click fue dentro del dropdown
            setTimeout(() => {
                if (!this.dropdown.matches(':hover') && !this.container.contains(document.activeElement)) {
                    this.hideDropdown();
                }
            }, 150);
        });

        // Navegación con teclado
        this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Click en opciones con mejor manejo
        this.options.forEach((option, index) => {
            option.addEventListener('mousedown', (e) => {
                // Prevenir que el input pierda el foco antes del click
                e.preventDefault();
            });

            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectOption(option, index);
            });

            option.addEventListener('mouseenter', () => this.highlightOption(index));
        });

        // Mejorar el manejo de clicks fuera
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.hideDropdown();
            }
        });

        // Manejar redimensionamiento de ventana
        window.addEventListener('resize', () => {
            if (this.isOpen) {
                this.repositionDropdown();
            }
        });

        // Configurar valor inicial si existe
        this.setInitialValue();
    }

    /**
     * Función para normalizar texto removiendo tildes y caracteres especiales
     */
    normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    filterOptions(searchTerm) {
        const normalizedSearchTerm = this.normalizeText(searchTerm);
        let hasResults = false;
        let visibleOptions = [];

        this.options.forEach((option, index) => {
            const originalText = option.dataset.text;
            const normalizedText = this.normalizeText(originalText);
            const matches = normalizedText.includes(normalizedSearchTerm);

            option.style.display = matches ? 'block' : 'none';
            if (matches) {
                hasResults = true;
                visibleOptions.push(index);
            }
        });

        // Resetear selección
        this.selectedIndex = -1;
        this.removeHighlight();

        // Mostrar mensaje si no hay resultados
        this.showNoResults(!hasResults && normalizedSearchTerm.length > 0);

        // Mostrar dropdown si hay término de búsqueda o está enfocado
        if (normalizedSearchTerm.length > 0 || document.activeElement === this.searchInput) {
            this.showDropdown();
        }

        return visibleOptions;
    }

    handleKeydown(e) {
        const visibleOptions = this.getVisibleOptions();

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!this.isOpen) {
                    this.showDropdown();
                }
                this.selectedIndex = Math.min(this.selectedIndex + 1, visibleOptions.length - 1);
                this.highlightOption(visibleOptions[this.selectedIndex]);
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (!this.isOpen) {
                    this.showDropdown();
                }
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.highlightOption(visibleOptions[this.selectedIndex]);
                break;

            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0 && visibleOptions[this.selectedIndex] !== undefined) {
                    const optionIndex = visibleOptions[this.selectedIndex];
                    this.selectOption(this.options[optionIndex], optionIndex);
                }
                break;

            case 'Escape':
                this.hideDropdown();
                this.searchInput.blur();
                break;

            case 'Tab':
                // Permitir navegación con Tab
                this.hideDropdown();
                break;
        }
    }

    getVisibleOptions() {
        return this.options
            .map((option, index) => option.style.display !== 'none' ? index : null)
            .filter(index => index !== null);
    }

    highlightOption(index) {
        this.removeHighlight();
        if (index >= 0 && this.options[index]) {
            this.options[index].classList.add('selected');
            // Scroll automático para mantener la opción visible
            this.scrollToOption(this.options[index]);
        }
    }

    scrollToOption(option) {
        const dropdownRect = this.dropdown.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();

        if (optionRect.bottom > dropdownRect.bottom) {
            this.dropdown.scrollTop += optionRect.bottom - dropdownRect.bottom;
        } else if (optionRect.top < dropdownRect.top) {
            this.dropdown.scrollTop -= dropdownRect.top - optionRect.top;
        }
    }

    removeHighlight() {
        this.options.forEach(opt => opt.classList.remove('selected'));
    }

    showNoResults(show) {
        let noResultsDiv = this.dropdown.querySelector('.no-results');
        if (show && !noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.textContent = 'No se encontraron resultados';
            this.dropdown.appendChild(noResultsDiv);
        } else if (!show && noResultsDiv) {
            noResultsDiv.remove();
        }
    }

    selectOption(option, index) {
        const value = option.dataset.value;
        const text = option.dataset.text;

        // Actualizar input y select oculto
        this.searchInput.value = text;
        this.hiddenSelect.value = value;

        // Marcar como seleccionado
        this.removeHighlight();
        option.classList.add('selected');

        this.hideDropdown();

        // Disparar evento change para validaciones
        this.hiddenSelect.dispatchEvent(new Event('change', { bubbles: true }));

        // Disparar evento personalizado
        this.container.dispatchEvent(new CustomEvent('optionSelected', {
            detail: { value, text, option }
        }));
    }

    showDropdown() {
        if (this.isOpen) return;

        // Cerrar otros dropdowns abiertos
        this.closeOtherDropdowns();

        // Marcar contenedor como activo
        this.container.classList.add('active');

        // Mostrar dropdown
        this.dropdown.classList.add('show');
        this.isOpen = true;

        // Reposicionar si es necesario
        this.repositionDropdown();
    }

    hideDropdown() {
        if (!this.isOpen) return;

        // Marcar contenedor como inactivo
        this.container.classList.remove('active');

        // Ocultar dropdown
        this.dropdown.classList.remove('show');
        this.showNoResults(false);
        this.selectedIndex = -1;
        this.removeHighlight();
        this.isOpen = false;
    }

    repositionDropdown() {
        // Verificar si el dropdown se sale de la pantalla
        const rect = this.container.getBoundingClientRect();
        const dropdownHeight = 200; // max-height del dropdown
        const spaceBelow = window.innerHeight - rect.bottom;

        if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
            // Mostrar arriba del input
            this.dropdown.style.top = 'auto';
            this.dropdown.style.bottom = '100%';
            this.dropdown.style.borderRadius = '0.375rem 0.375rem 0 0';
        } else {
            // Mostrar debajo del input (normal)
            this.dropdown.style.top = 'calc(100% + 1px)';
            this.dropdown.style.bottom = 'auto';
            this.dropdown.style.borderRadius = '0 0 0.375rem 0.375rem';
        }
    }

    closeOtherDropdowns() {
        // Cerrar otros dropdowns que puedan estar abiertos
        document.querySelectorAll('.filterable-select-container.active').forEach(container => {
            if (container !== this.container) {
                const otherDropdown = container.querySelector('.filterable-dropdown');
                if (otherDropdown) {
                    container.classList.remove('active');
                    otherDropdown.classList.remove('show');
                }
            }
        });
    }

    setInitialValue() {
        const selectedValue = this.hiddenSelect.value;
        if (selectedValue) {
            const selectedOption = this.options.find(opt => opt.dataset.value === selectedValue);
            if (selectedOption) {
                this.searchInput.value = selectedOption.dataset.text;
                selectedOption.classList.add('selected');
            }
        }
    }

    // Método público para limpiar el select
    clear() {
        this.searchInput.value = '';
        this.hiddenSelect.value = '';
        this.removeHighlight();
        this.hideDropdown();
    }

    // Método público para establecer un valor
    setValue(value) {
        const option = this.options.find(opt => opt.dataset.value === value);
        if (option) {
            this.selectOption(option, this.options.indexOf(option));
        }
    }

    // Método público para obtener el valor actual
    getValue() {
        return this.hiddenSelect.value;
    }

    // Método público para obtener el texto actual
    getText() {
        return this.searchInput.value;
    }
}

/**
 * Función para inicializar todos los selects filtrables
 */
function initializeFilterableSelects() {
    // Crear instancias de selects filtrables
    const selectConfigs = [
        { search: 'aprendiz-search', dropdown: 'aprendiz-dropdown', select: 'aprendiz-select' },
        { search: 'ficha-search', dropdown: 'ficha-dropdown', select: 'ficha-select' },
        { search: 'empresa-search', dropdown: 'empresa-dropdown', select: 'empresa-select' },
        { search: 'evaluador-search', dropdown: 'evaluador-dropdown', select: 'evaluador-select' },
        { search: 'programa-search', dropdown: 'programa-dropdown', select: 'programa-select' }
    ];

    const filterableSelects = {};

    selectConfigs.forEach(config => {
        if (document.getElementById(config.search)) {
            filterableSelects[config.search] = new FilterableSelect(
                config.search,
                config.dropdown,
                config.select
            );
            console.log(`Inicializado select filtrable: ${config.search}`);
        }
    });

    // Hacer disponible globalmente para debugging
    window.filterableSelects = filterableSelects;

    console.log('Selects filtrables inicializados:', Object.keys(filterableSelects));
}

/**
 * Inicializar selects filtrables cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', function() {
    // Agregar un pequeño delay para asegurar que todo esté cargado
    setTimeout(() => {
        initializeFilterableSelects();
    }, 100);
});

// También inicializar si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFilterableSelects);
} else {
    initializeFilterableSelects();
}



//===================VALIDACIONES CAMPOS EDITARPERFIL====================//

// Validaciones para el formulario de editar perfil

// Función para validar solo letras y espacios
function validarSoloLetras(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(input.value.trim());
}

// Función para validar solo números
function validarSoloNumeros(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input.value.trim());
}

// Función para validar email
function validarEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input.value.trim());
}

// Función para validar email institucional (debe contener @sena.edu.co)
function validarEmailInstitucional(input) {
    const regex = /^[^\s@]+@soy\.sena\.edu\.co$/;
    return regex.test(input.value.trim());
}

// Función para validar dirección (letras, números, espacios y caracteres especiales básicos)
function validarDireccion(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s#\-.,]+$/;
    return regex.test(input.value.trim()) && input.value.trim().length >= 5;
}

// Función para validar número de contacto (10 dígitos)
function validarContacto(input) {
    const regex = /^[0-9]{10}$/;
    return regex.test(input.value.trim());
}

// Función para validar número de documento según tipo
function validarNumeroDocumento(inputNumero, selectTipo) {
    const numero = inputNumero.value.trim();
    const tipo = selectTipo.value;

    switch(tipo) {
        case 'Cédula de Ciudadania':
            // CC: 7-10 dígitos
            return /^[0-9]{7,10}$/.test(numero);
        case 'Tarjeta de Identidad':
            // TI: 10-11 dígitos
            return /^[0-9]{10,11}$/.test(numero);
        case 'Cédula de Extranjeria':
            // CE: puede contener letras y números, 6-12 caracteres
            return /^[a-zA-Z0-9]{6,12}$/.test(numero);
        case 'PEP':
            // PEP: formato alfanumérico, 8-15 caracteres
            return /^[a-zA-Z0-9]{8,15}$/.test(numero);
        default:
            return false;
    }
}

// Función para mostrar error
function mostrarError(input, mensaje) {
    // Remover error anterior si existe
    const errorAnterior = input.parentNode.querySelector('.error-message');
    if (errorAnterior) {
        errorAnterior.remove();
    }

    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = mensaje;

    // Agregar clase de error al input
    input.classList.add('is-invalid');
    input.style.borderColor = '#dc3545';

    // Insertar mensaje después del input
    input.parentNode.appendChild(errorDiv);
}

// Función para limpiar error
function limpiarError(input) {
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.classList.remove('is-invalid');
    input.style.borderColor = '';
}

// Función para validar campo individual
function validarCampo(input) {
    const valor = input.value.trim();
    const nombre = input.name || input.id;

    // Limpiar error anterior
    limpiarError(input);

    // Validar si el campo es requerido y está vacío
    if (input.hasAttribute('required') && valor === '') {
        mostrarError(input, 'Este campo es obligatorio');
        return false;
    }

    // Si está vacío y no es requerido, es válido
    if (valor === '' && !input.hasAttribute('required')) {
        return true;
    }

    // Validaciones específicas por campo
    switch(nombre) {
        case 'nombresU':
            if (!validarSoloLetras(input)) {
                mostrarError(input, 'Solo se permiten letras y espacios');
                return false;
            }
            if (valor.length < 2) {
                mostrarError(input, 'Debe tener al menos 2 caracteres');
                return false;
            }
            break;

        case 'apellidosU':
            if (!validarSoloLetras(input)) {
                mostrarError(input, 'Solo se permiten letras y espacios');
                return false;
            }
            if (valor.length < 2) {
                mostrarError(input, 'Debe tener al menos 2 caracteres');
                return false;
            }
            break;

        case 'numeroU':
            const tipoDocumento = document.querySelector('select[name="tipo_dc"]');
            if (!validarNumeroDocumento(input, tipoDocumento)) {
                let mensaje = 'Número de documento inválido';
                switch(tipoDocumento.value) {
                    case 'Cédula de Ciudadania':
                        mensaje = 'La cédula debe tener entre 7 y 10 dígitos';
                        break;
                    case 'Tarjeta de Identidad':
                        mensaje = 'La tarjeta de identidad debe tener entre 10 y 11 dígitos';
                        break;
                    case 'Cédula de Extranjeria':
                        mensaje = 'La cédula de extranjería debe tener entre 6 y 12 caracteres alfanuméricos';
                        break;
                    case 'PEP':
                        mensaje = 'El PEP debe tener entre 8 y 15 caracteres alfanuméricos';
                        break;
                }
                mostrarError(input, mensaje);
                return false;
            }
            break;

        case 'emailU':
            if (!validarEmail(input)) {
                mostrarError(input, 'Ingrese un email válido (ejemplo@dominio.com)');
                return false;
            }
            break;

        case 'email_instiU':
            if (!validarEmailInstitucional(input)) {
                mostrarError(input, 'El email institucional debe terminar en @soy.sena.edu.co');
                return false;
            }
            break;

        case 'direccionU':
            if (!validarDireccion(input)) {
                mostrarError(input, 'La dirección debe tener al menos 5 caracteres válidos');
                return false;
            }
            break;

        case 'contacto1U':
            if (!validarContacto(input)) {
                mostrarError(input, 'El contacto debe tener exactamente 10 dígitos');
                return false;
            }
            break;

        case 'contacto2U':
            if (valor !== '' && !validarContacto(input)) {
                mostrarError(input, 'El contacto debe tener exactamente 10 dígitos');
                return false;
            }
            break;

        case 'codigoFicha':
            if (!validarSoloNumeros(input)) {
                mostrarError(input, 'El código de ficha solo debe contener números');
                return false;
            }
            if (valor.length < 4) {
                mostrarError(input, 'El código de ficha debe tener al menos 4 dígitos');
                return false;
            }
            break;
    }

    return true;
}

// Función para validar todo el formulario
function validarFormulario() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="emailU"]');
    let formularioValido = true;

    inputs.forEach(input => {
        if (!input.disabled && !validarCampo(input)) {
            formularioValido = false;
        }
    });

    // Validar selects requeridos
    const selects = document.querySelectorAll('select[required]');
    selects.forEach(select => {
        if (!select.disabled && select.value === '') {
            mostrarError(select, 'Este campo es obligatorio');
            formularioValido = false;
        }
    });

    return formularioValido;
}

// Función para validar en tiempo real mientras se escribe
function validacionEnTiempoReal(input) {
    const valor = input.value;
    const nombre = input.name || input.id;

    // Aplicar restricciones mientras se escribe
    switch(nombre) {
        case 'nombresU':
        case 'apellidosU':
            // Solo permitir letras, espacios y acentos
            input.value = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            break;

        case 'contacto1U':
        case 'contacto2U':
            // Solo permitir números y limitar a 10 dígitos
            input.value = valor.replace(/[^0-9]/g, '').substring(0, 10);
            break;

        case 'numeroU':
            const tipoDoc = document.querySelector('select[name="tipo_dcU"]').value;
            if (tipoDoc === 'Cédula de Ciudadania' || tipoDoc === 'Tarjeta de Identidad') {
                // Solo números para CC y TI
                input.value = valor.replace(/[^0-9]/g, '');
            } else {
                // Alfanumérico para CE y PEP
                input.value = valor.replace(/[^a-zA-Z0-9]/g, '');
            }
            break;

        case 'codigoFicha':
            // Solo números
            input.value = valor.replace(/[^0-9]/g, '');
            break;
    }
}

// Event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {

    // Agregar validación en tiempo real a todos los inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
        // Validación mientras se escribe
        input.addEventListener('input', function() {
            validacionEnTiempoReal(this);
        });

        // Validación al salir del campo
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
    });

    // Validar número de documento cuando cambie el tipo
    const tipoDocumento = document.querySelector('select[name="tipo_dcU"]');
    const numeroDocumento = document.querySelector('input[name="numeroU"]');

    if (tipoDocumento && numeroDocumento) {
        tipoDocumento.addEventListener('change', function() {
            if (numeroDocumento.value.trim() !== '') {
                validarCampo(numeroDocumento);
            }
        });
    }

    // Validar formulario antes de enviar
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            if (!validarFormulario()) {
                e.preventDefault();

                // Mostrar mensaje de error general
                const primerError = document.querySelector('.error-message');
                if (primerError) {
                    primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // Mostrar alerta
                alert('Por favor corrija los errores en el formulario antes de continuar');
            }
        });
    }
});



/*==============DESHABILITAR CAMPOS PARA APRENDIZ ======================*/

    // Función para habilitar edición con restricciones según el rol
    function habilitarEdicion() {
        // Obtener el rol del usuario desde el campo oculto (más confiable)
        const hiddenRol = document.getElementById('hiddenRol');
        const rolUsuario = hiddenRol ? parseInt(hiddenRol.value) : null;

        // Campos que siempre pueden editarse (para todos los roles)
        const camposEditablesGenerales = [
            'input[name="email"]',
            'input[name="direccion"]',
            'input[name="contacto1"]',
            'input[name="contacto2"]'
        ];

        // Campos adicionales que solo pueden editar usuarios que NO sean Aprendices (rol != 1)
        const camposEditablesAdmin = [
            'input[name="nombres"]',
            'input[name="apellidos"]',
            'select[name="tipo_dc"]',
            'input[name="numero"]',
            'input[name="email_insti"]',
            'select[name="id_rol_display"]',
            'select[name="estado"]',
            'select[name="id_modalidad_display"]', // Cambiado a display
            'input[name="codigoFicha"]',
            'input[name="nombrePrograma"]',
            'input[name="nombreEmpresa"]',
            'select[name="estado_formativo_display"]' // Cambiado a display
        ];

        // Campos que solo deben mostrarse como readonly para Aprendices (no disabled)
        const camposSoloLectura = [
            'input[name="nombres"]',
            'input[name="apellidos"]',
            'select[name="tipo_dc"]',
            'input[name="numero"]',
            'input[name="email_insti"]'
        ];

        // Habilitar campos editables según el rol
        if (rolUsuario === 1) {
            // Usuario Aprendiz - Solo puede editar campos específicos
            camposEditablesGenerales.forEach(selector => {
                const campo = document.querySelector(selector);
                if (campo) {
                    campo.disabled = false;
                    campo.readOnly = false;
                    campo.style.backgroundColor = '#fff';
                    campo.style.border = '1px solid #ced4da';
                }
            });

            // CAMBIO CLAVE: Campos de solo lectura en lugar de disabled
            camposSoloLectura.forEach(selector => {
                const campo = document.querySelector(selector);
                if (campo) {
                    campo.disabled = false;  // ✅ NO disabled
                    campo.readOnly = true;   // ✅ Solo lectura
                    campo.style.backgroundColor = '#e9ecef';
                    campo.style.border = '1px solid #ced4da';
                    campo.style.cursor = 'not-allowed';
                }
            });

            // Mantener deshabilitados los campos administrativos que no deben editarse
            const camposAdminRestantes = camposEditablesAdmin.filter(selector =>
                !camposSoloLectura.some(slSelector => slSelector === selector));

            camposAdminRestantes.forEach(selector => {
                const campo = document.querySelector(selector);
                if (campo) {
                    campo.disabled = true;
                    campo.style.backgroundColor = '#e9ecef';
                    campo.style.border = '1px solid #ced4da';
                }
            });

            console.log('Modo de edición para Aprendiz activado - Campos críticos en modo solo lectura');
        } else {
            // Usuarios con otros roles - pueden editar todos los campos (excepto el rol que siempre va oculto)
            const todosCampos = [...camposEditablesGenerales, ...camposEditablesAdmin.filter(selector =>
                selector !== 'select[name="id_rol_display"]' &&
                selector !== 'select[name="id_modalidad_display"]' &&
                selector !== 'select[name="estado_formativo_display"]')];
            todosCampos.forEach(selector => {
                const campo = document.querySelector(selector);
                if (campo) {
                    campo.disabled = false;
                    campo.readOnly = false;
                    campo.style.backgroundColor = '#fff';
                    campo.style.border = '1px solid #ced4da';
                }
            });

            console.log('Modo de edición completa activado para usuario con rol:', rolUsuario);
        }

        // Cambiar estado de los botones
        const btnEditar = document.getElementById('btnEditar');
        const btnGuardar = document.getElementById('btnGuardar');
        const btnCancelar = document.getElementById('btnCancelar');

        if (btnEditar) {
            btnEditar.disabled = true;
            btnEditar.style.opacity = '0.6';
        }

        if (btnGuardar) {
            btnGuardar.disabled = false;
            btnGuardar.style.opacity = '1';
        }

        if (btnCancelar) {
            btnCancelar.disabled = false;
            btnCancelar.style.opacity = '1';
        }
    }

    // Función para cancelar la edición
    function cancelarEdicion() {
        // Deshabilitar todos los campos del formulario
        const todosLosCampos = document.querySelectorAll('input:not([type="hidden"]), select');
        todosLosCampos.forEach(campo => {
            campo.disabled = true;
            campo.readOnly = false; // ✅ Limpiar readOnly
            campo.style.backgroundColor = '#e9ecef';
            campo.style.border = '1px solid #ced4da';
            campo.style.cursor = 'default'; // ✅ Restaurar cursor
        });

        // Restaurar estado de los botones
        const btnEditar = document.getElementById('btnEditar');
        const btnGuardar = document.getElementById('btnGuardar');
        const btnCancelar = document.getElementById('btnCancelar');

        if (btnEditar) {
            btnEditar.disabled = false;
            btnEditar.style.opacity = '1';
        }

        if (btnGuardar) {
            btnGuardar.disabled = true;
            btnGuardar.style.opacity = '0.6';
        }

        if (btnCancelar) {
            btnCancelar.disabled = true;
            btnCancelar.style.opacity = '0.6';
        }

        // Recargar la página para restaurar los valores originales
        location.reload();
    }

    // Función para enviar formulario asegurando que los campos readonly se incluyan
    function prepararEnvioFormulario() {
        // Antes de enviar, temporalmente habilitar campos readonly para que se envíen
        const camposReadOnly = document.querySelectorAll('input[readonly], select[readonly]');
        camposReadOnly.forEach(campo => {
            campo.readOnly = false;
        });

        // El formulario se enviará automáticamente después de esta función
        return true;
    }

    // Función para ocultar/mostrar barra lateral (manteniendo la funcionalidad existente)
    function ocultarBarra() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('body');

        if (sidebar.style.left === '-220px') {
            sidebar.style.left = '0px';
            mainContent.style.marginLeft = '220px';
        } else {
            sidebar.style.left = '-220px';
            mainContent.style.marginLeft = '0px';
        }
    }

    // Inicialización cuando se carga la página
    document.addEventListener('DOMContentLoaded', function() {
        // Asegurar que todos los campos estén deshabilitados al cargar
        /*const todosLosCampos = document.querySelectorAll('input:not([type="hidden"]), select');
        todosLosCampos.forEach(campo => {
            campo.disabled = true;
            campo.style.backgroundColor = '#e9ecef';
            campo.style.border = '1px solid #ced4da';
        });*/
        const camposFormulario = [
                    'input[name="nombresU"]',
                    'input[name="apellidosU"]',
                    'input[name="emailU"]',
                    'input[name="direccionU"]',
                    'input[name="contacto1U"]',
                    'input[name="contacto2U"]',
                    'select[name="tipo_dcU"]',
                    'input[name="numeroU"]',
                    'input[name="email_instiU"]',
                    'select[name="id_rol_display"]',
                    'select[name="estadoU"]',
                    'select[name="id_modalidad_display"]',
                    'input[name="codigoFicha"]',
                    'input[name="nombrePrograma"]',
                    'input[name="nombreEmpresa"]',
                    'select[name="estado_formativo_display"]'
        ];

        camposFormulario.forEach(selector => {
              const campo = document.querySelector(selector);
              if (campo) {
                        campo.disabled = true;
                        campo.style.backgroundColor = '#e9ecef';
                        campo.style.border = '1px solid #ced4da';
              }
        });


        // Asegurar estado inicial de los botones
        const btnGuardar = document.getElementById('btnGuardar');
        const btnCancelar = document.getElementById('btnCancelar');

        if (btnGuardar) {
            btnGuardar.disabled = true;
            btnGuardar.style.opacity = '0.6';
        }

        if (btnCancelar) {
            btnCancelar.disabled = true;
            btnCancelar.style.opacity = '0.6';
        }

        // ✅ AÑADIR EVENTO AL FORMULARIO PARA PREPARAR ENVÍO
        const formulario = document.querySelector('form');
        if (formulario) {
            formulario.addEventListener('submit', prepararEnvioFormulario);
        }

        console.log('Formulario inicializado - Todos los campos deshabilitados');
    });