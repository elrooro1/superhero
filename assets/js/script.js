// Función para consultar la información del superhéroe por ID
// Función para consultar la API y mostrar la información del superhéroe
function consultarSuperHeroe(id) {
    const apiKey = '4905856019427443';
    const apiUrl = `https://www.superheroapi.com/api.php/${apiKey}/${id}`;

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            console.log('Respuesta de la API:', response);
            mostrarInformacion(response);
            mostrarGrafico(response);
        },
        error: function(xhr, status, error) {
            if (xhr.status == 404) {
                alert('Superhéroe no encontrado. Ingresa un ID válido.');
            } else {
                console.error('Error al consultar la API:', error);
            }
        }
    });
}

//  mostrar la información del superhéroe 
function mostrarInformacion(superHeroe) {
    
    const resultadoHTML = `
        <img src="${superHeroe.image.url}" alt="${superHeroe.name}">
        <h2>${superHeroe.name}</h2>
        <p>Inteligencia: ${superHeroe.powerstats.intelligence}</p>
        <p>Fuerza: ${superHeroe.powerstats.strength}</p>
        <p>Velocidad: ${superHeroe.powerstats.speed}</p>
        <p>Durabilidad: ${superHeroe.powerstats.durability}</p>
        <p>Poder: ${superHeroe.powerstats.power}</p>
        <p>Combate: ${superHeroe.powerstats.combat}</p>
        <h3>Biografía</h3>
        <p>Nombre Completo: ${superHeroe.biography['full-name']}</p>
        <p>Alter Egos: ${superHeroe.biography['alter-egos']}</p>
        <p>Lugar de Nacimiento: ${superHeroe.biography['place-of-birth']}</p>
        <p>Primera Aparición: ${superHeroe.biography['first-appearance']}</p>
        <h3>Apariencia</h3>
        <p>Género: ${superHeroe.appearance.gender}</p>
        <p>Raza: ${superHeroe.appearance.race}</p>
        <p>Altura: ${superHeroe.appearance.height.join(', ')}</p>
        <p>Peso: ${superHeroe.appearance.weight.join(', ')}</p>
        <p>Color de Ojos: ${superHeroe.appearance['eye-color']}</p>
        <p>Color de Cabello: ${superHeroe.appearance['hair-color']}</p>
        <h3>Trabajo</h3>
        <p>Ocupación: ${superHeroe.work.occupation}</p>
        <p>Base: ${superHeroe.work.base}</p>
        <h3>Conexiones</h3>
        <p>Afiliación de Grupo: ${superHeroe.connections['group-affiliation']}</p>
        <p>Familiares: ${superHeroe.connections.relatives}</p>
    `;

    // Muestra el resultado en la sección de resultado
    $('#resultado').html(resultadoHTML);
}

//  para mostrar gráfico con CanvasJS
function mostrarGrafico(superHeroe) {
    

    // Crear un array de objetos para los datos del gráfico
    const dataPoints = [];
    for (const poder in superHeroe.powerstats) {
        dataPoints.push({ label: poder, y: parseInt(superHeroe.powerstats[poder]) });
    }

    // Configurar opciones del gráfico
    const options = {
        animationEnabled: true,
        title: {
            text: `Estadísticas de ${superHeroe.name}`
        },
        data: [{
            type: 'pie',
            startAngle: 240,
            yValueFormatString: '##0.00"%"',
            indexLabel: '{label} {y}',
            dataPoints: dataPoints
        }]
    };

    //  gráfico en el contenedor con id "grafico"
    const chart = new CanvasJS.Chart("grafico", options);
    chart.render();
}

// Evento clic del botón de búsqueda
$('#btnBuscar').on('click', function() {
    //  información ingresada por el usuario
    const idHeroe = $('#inputHeroe').val();

    //  información ingresada sea un número
    if (!isNaN(idHeroe)) {
        // Consulta la API para obtener la información del superhéroe
        consultarSuperHeroe(idHeroe);
    } else {
        alert('Por favor, ingrese un número válido para el ID del superhéroe.');
    }
});
