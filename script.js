document.addEventListener('DOMContentLoaded', function() {
    // Si estamos en la página del formulario
    if (document.getElementById('informeForm')) {
        const form = document.getElementById('informeForm');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            generarInforme();
        });
    }
    
    // Si estamos en la página del informe generado
    if (document.getElementById('informeContent')) {
        cargarInforme();
        
        document.getElementById('btnImprimir').addEventListener('click', function() {
            window.print();
        });
        
        document.getElementById('btnEditar').addEventListener('click', function() {
            const content = document.getElementById('informeContent');
            content.contentEditable = content.contentEditable === 'true' ? 'false' : 'true';
            this.textContent = content.contentEditable === 'true' ? 'Finalizar Edición' : 'Editar Informe';
        });
        document.getElementById('volverForm').addEventListener('click',function(){
            window.location.href = 'index.html';
        })
    }
});

function generarInforme() {
    // Obtener datos del formulario
    const formData = {
        caratula: document.getElementById('caratula').value,
        expediente: document.getElementById('expediente').value,
        nombre: document.getElementById('nombre').value,
        dni: document.getElementById('dni').value,
        edad: document.getElementById('edad').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        ocupacion: document.getElementById('ocupacion').value,
        manoHabil: document.getElementById('manoHabil').value,
        fechaEvaluacion: formatDate(document.getElementById('fechaEvaluacion').value),
        fechaAccidente: formatDate(document.getElementById('fechaAccidente').value),
        segmentos: Array.from(document.querySelectorAll('input[name="segmentos"]:checked')).map(el => el.value),
        anamnesis: document.getElementById('anamnesis').value,
        estudios: document.getElementById('estudios').value,
        consideraciones: document.getElementById('consideraciones').value,
        conclusiones: document.getElementById('conclusiones').value,
        puntosPericiales: document.getElementById('puntosPericiales').value
    };
    
    // Guardar datos en localStorage
    localStorage.setItem('informeMedicoLegal', JSON.stringify(formData));
    
    // Redirigir a la página del informe
    window.location.href = 'informe.html';
}

function cargarInforme() {
    const storedData = localStorage.getItem('informeMedicoLegal');
    if (!storedData) {
        document.getElementById('informeContent').textContent = 'No se encontraron datos del informe.';
        return;
    }
    
    const formData = JSON.parse(storedData);
    const informeContent = document.getElementById('informeContent');
    
    // Generar el contenido del informe
    let informeHTML = `
<div class="titulo-informe">
<h1>INFORME MÉDICO LEGAL</h1>
<h2> Dr. Antonelli Carlos</h2>
<h4> Esp. en Medicina Legal</h4>
<h4>M.N. 138.247 </h4>
</div></br>

Señor Juez: </br>

<b>Dr. Antonelli Carlos Alberto</b>, (Médico Especialista en Medicina Legal M.N. 138.247, DNI 31.133.241), Perito Cirujano designado en autos caratulados:
<b>"${formData.caratula}"</b> Expte. Nº <b>"${formData.expediente}"</b>, con condición impositiva Monotributista ante la AFIP, con domicilio físico en la calle Hualfin 853 piso 4 Depto "B" - CABA (Tel. celular 15-3812-6446), con Clave de Identificación Electrónica 20311332415 y correo electrónico antonellimd@gmail.com, a V.S. se eleva el presente:</br> </br>

<strong>Fecha de evaluación:</strong> ${formData.fechaEvaluacion}</br>
<strong>Fecha de accidente denunciado:</strong> ${formData.fechaAccidente}</br>
<strong>Consultores técnicos:</strong> Sin participación de terceros.</br>


<table>
<h2>DATOS DEL PERITADO</h2>
    <tr>
        <th>Nombre y apellido</th>
        <td>${formData.nombre}</td>
    </tr>
    <tr>
        <th>DNI</th>
        <td>${formData.dni}</td>
    </tr>
    <tr>
        <th>Edad</th>
        <td>${formData.edad} años</td>
    </tr>
    <tr>
        <th>Estado civil</th>
        <td>${formData.estadoCivil}</td>
    </tr>
    <tr>
        <th>Ocupación</th>
        <td>${formData.ocupacion}</td>
    </tr>
    <tr>
        <th>Mano hábil</th>
        <td>${formData.manoHabil}</td>
    </tr>
</table>

<h2>EXAMEN DEL PERITADO</h2>

<h3>Anamnesis y relato de los hechos:</h3>

<p>${formData.anamnesis || "No se proporcionó información."}</p>

<strong>Antecedentes personales:</strong></br>

<b>o   Cirugías:</b> No refiere.</br>
<b>o   Enfermedades crónicas:</b> No refiere.</br>
<b>o   Medicación crónica:</b> No refiere.</br>
<b>o   Antecedentes traumatológicos previos:</b> No refiere.</br>
<b>o   Tratamientos psicológicos/psiquiátricos:</b> No refiere.</br>
<b>o   Antecedentes heredofamiliares:</b> No presenta antecedentes de importancia a destacar.</br></br>

<strong><h3>Aspecto psíquico:</strong></h3>

<p>
Se muestra respetuoso, correcto en sus modos y apariencia (aseo y vestimenta acordes a su sexo, edad y época del año). Su lenguaje es fluido y congruente con su nivel educacional.</br>
Conciencia : Lucido, orientado en tiempo, espacio y persona.</br>
Memoria: conservada.</br>
Actitud coherente con mímica y mirada acordes al relato.</br>
Atención conservada.</br>
El curso y el contenido del pensamiento son normales.</br>
Juicio conservado. No se evidencia producción de alucinaciones ni delirios.</br>
Razonamiento lógico y deductivo.</br>
Timia displacentera relacionada a las dolencias manifestadas.</br>
</p>

<strong><h3>Examen físico:</strong></h3>

<p>
Presenta facies compuesta con marcha eubasica sin claudicación en puntas de pie ni talones.</br>
Peso: 98 Kg / Talla: 1.9 mts / IMC = 25 </br>
Piel normotrófica con tejido celular subcutáneo acorde a sexo y edad.</br>

<b>Sistema nervioso central:</b></br>  Normocéfalo sin asimetrías faciales.</br> 
No se evidencia alteración de los pares craneales.</br>
No se evidencia síndrome vertiginoso, ni disfunción vestibular postural.</br>
Sin signos de foco motor o sensitivo.</br>
No se evidencian trastornos motores ni sensitivos, praxia sin particularidades.</br>
No se evidencian trastornos mnésicos ni disfunción neurocognitiva.</br>
<b>Cuello:</b> </br> cónico, simétrico sin cicatrices.</br>
<b>Tórax:</b> </br> simétrico, buena entrada de aire bilateral con murmullo vesicular conservado. Sin ruidos agregados.</br>
<b>Abdomen:</b> </br> blando depresible e indoloro a la palpación superficial y profunda sin defensa ni reacción peritoneal. Ruidos hidroaéreos positivo. Resto sin particularidades.</br>
</p>
`;

    // Añadir segmentos seleccionados
    if (formData.segmentos && formData.segmentos.length > 0) {
        informeHTML += "\n<b>SEGMENTOS EVALUADOS</b></br>\n";
        
        formData.segmentos.forEach(segmento => {
            switch(segmento) {
                case 'Columna cervical':
                    informeHTML += `
 <p>                   
<b>Columna cervical:</b></br>
Se comprueba ejes columnarios alineados con lordosis fisiológica conservada.</br> Relieves paraespinales simétricos. </br>Piel de la región sin particularidades, sin presencia de hematomas cicatrices o procesos inflamatorios. </br>En las maniobras de palpación se halla una moderada hipertonía paraespinal bilateral y de ambos trapecios.</br> Maniobra de Adson negativa - Spurling negativo.</br>
Funcionalmente se constata rangos de movilidad conservados/reducidos:</br>
Goniometría:</br>
Flexión : 45º</br>
Extensión: 45º </br>
Inclinación derecha: 45º </br>
Inclinación Izquierda : 45º</br>
Rotación derecha: 80º </br>
Rotación izquierda: 80º</br>
</p>
`;
                    break;
                case 'Cervicobraquialgia':
                    informeHTML += `
<p>
<b>Cevicobraquialgia:</b> (derecha/izquierda/bilateral)</br>
Se comprueba ejes columnarios alineados con lordosis fisiológica conservada. </br>
Relieves paraespinales simétricos.</br>
 Piel de la región sin particularidades, sin presencia de hematomas cicatrices o procesos inflamatorios. </br>
 En las maniobras de palpación se halla una moderada hipertonía paraespinal bilateral y de ambos trapecios.</br>
  Maniobra de Adson negativa - Spurling positivo (izquierdo/derecho/bilateral).</br>
Funcionalmente se constata rangos de movilidad reducidos:</br>
Goniometría:</br>
Flexión : 30º</br>
Extensión: 30º </br>
Inclinación derecha: 30º </br>
Inclinación Izquierda : 30º</br>
Rotación derecha: 50º </br>
Rotación izquierda: 50º</br>
</p>
`;
                    break;
                case 'Columna Lumbar':
                    informeHTML += `
<p>
<b>Columna lumbar:</b> </br>
No presenta contractura muscular paravertebral. </br>
Maniobra de Lasegue es negativa. Maniobra de Neri negativa.</br>
No hay disminución del reflejo aquileano, ni debilidad de los músculos soleo ni gemelos.</br>
 Sensibilidad y fuerza motora sin alteraciones en las regiones exploradas.</br>
Funcionalmente se constata rangos de movilidad conservados/disminuidos.</br>
Goniometría:</br>
Flexión: 80º</br>
Extensión: 30º</br>
Rotación derecha: 30º</br>
Rotación izquierda: 30º </br>
Inclinación derecha : 40º</br>
Inclinación izquierda: 40º</br>

`;
                    break;
                case 'Lumbociatalgia':
                    informeHTML += `
<p>
<b>Lumbociatalgia (derecha/izquierda/bilateral):</b></br>
Presenta contractura muscular paravertebral. </br>
Maniobra de Lasegue es positiva (izquierda/derecha/bilateral). Maniobra de Neri negativa.</br>
Disminución del reflejo aquileano (derecho/izquierdo/bilateral), sin debilidad de los músculos soleo ni gemelos.</br> 
Sensibilidad y fuerza motora conservada (S5M5).</br>
Funcionalmente se constata rangos de movilidad de la columna disminuidos.</br>
Goniometría:</br>
Flexión: 60º</br>
Extensión: 20º</br>
Rotación derecha: 20º</br>
Rotación izquierda: 20º </br>
Inclinación derecha : 30º</br>
Inclinación izquierda: 30º</br>
</p>
`;
                    break;
                case 'Hombro':
                    informeHTML += `
<p>
<b>Hombro (derecho/izquierdo):</b></br>
Piel de la región sin cicatrices, hematomas o signos de procesos inflamatorios en curso.</br>
Ejes articulares conservados sin deformidades.</br>
Palpación (dolorosa/indolora) en las inserciones musculares.</br>
Trofismo muscular del manto deltoides (conservado/disminuido).</br>
Los rango de movilidad articular se encuentran (conservados/disminuidos)</br>
Goniometría:</br>
Abducción:  180º </br>
Aducción: 30º</br>
Flexión : 180º</br>
Extensión: 30º</br>
Rotación interna: 90º</br>
Rotación externa: 90º</br>
</p>
`;
                    break;
                case 'Codo':
                    informeHTML += `
<p>
<b>Codo (derecho/izquierdo):</b></br>
A la inspección la articulación del codo (se encuentra/no se encuentra) tumefacta con diámetros (conservados /aumentados) respecto al miembro contralateral, no se evidencian cicatrices ni hematomas. </br>
Los ejes articulares se encuentran alineados, no se evidencian deformaciones.</br>
La palpación resulta (indolora/dolorosa) del pliegue anterior y epicóndilo con la flexión contra resistencia  del antebrazo y la dorsiflexión de la muñeca.</br>
Las pruebas de esfuerzo en valgo y varo resultan (positivas/negativas) . Pivot shift (positivo/negativo).</br>
Funcionalmente los rangos de movilidad de la articulación se encuentran ( conservados/disminuidos). </br>
Goniometría:</br>
Arco de flexo - extensión: desde 0º hasta los 150º.</br>
Pronación: 80º</br>
Supinación:80º.</br>
</p>
`;
                    break;
                case 'Muñeca':
                    informeHTML += `
<p>
<b>Muñeca (derecha/izquierda):</b></br>
Piel de la región sin cambios de coloración ni signos de procesos inflamatorios agudos. </br>
(Sin/Con) signos de edema, temperatura conservada. </br>
Trofismo muscular (conservado/disminuido). Signo de Tinel: (negativo/positivo). Signo de Phalen: (negativo/positivo).</br> 
Funcionalmente se constata rangos de movilidad (conservados/disminuidos).</br>
Goniometría:</br>
Flexión dorsal: 80º</br>
Flexión palmar: 80º </br>
Desviación radial: 20º</br>
Desviación Cubital: 40º</br>
</p>
`;
                    break;
                case 'Mano':
                    informeHTML += `
<p>
<b>Mano (derecha/izquierda):</b></br>
A la inspección, piel sin cicatrices, sin hematomas o signos de flogosis.</br> 
No se observan deformidades, los ejes articulares se encuentran alineados con rayos metacarpeanos conservados.</br>
Eminencia tenar e hipotenar con trofismo (conservado/disminuido).</br>
La fuerza muscular  y sensibilidad se encuentra (conservadas/alteradas) S(1/2/3/4/5) M(1/2/3/4/5)</br>
Los rangos de movilidad articular son (completos/incompletos)</br>
Goniometría:</br>
<b>  Pulgar:</b></br> 
Articulación carpo - metacarpiana: </br>
Flexión: 20º</br>
Extensión: 30º</br>
Articulación Metacarpo-falángica: </br>
flexión:60º</br>
Articulación interfalángica: </br>
flexión 80º</br>
<b>   Dedo índice:</b></br> 
Metacarpofalángica: Flexión: 90º</br>
Interfalángica proximal : Flexión: 100º </br>
Interfalángica distal: Flexión: 70º</br>
<b>   Dedo mayor: </b></br>
Metacarpofalángica: Flexión: 90º</br>
Interfalángica proximal : Flexión: 100º </br>
Interfalángica distal: Flexión: 70º</br>
<b>   Dedo anular: </b></br>
Metacarpofalángica: Flexión: 90º</br>
Interfalángica proximal : Flexión: 100º </br>
Interfalángica distal: Flexión: 70º</br>
<b>   Dedo meñique:</b></br>
Metacarpofalángica: Flexión: 90º</br>
Interfalángica proximal : Flexión: 100º </br>
Interfalángica distal: Flexión: 70º</br>
</p>
`;
                    break;
                case 'Cadera':
                    informeHTML += `
<p>
<b>Cadera( derecha/izquierda):</b></br>
A la exploración no se evidencian signos inflamatorios agudos ni cicatrices, no se observan tumoraciones, flogosis ni hematomas. </br>
(No se/Se) detectan puntos dolorosos a nivel del trocánter, isquion, región inguinal o glútea. </br>
Test de Faber (negativo/positivo). Prueba de Tendelenburg (negativa/positiva). Maniobra de Thomas (negativa/positiva).</br>
Funcionalmente se comprueban rangos de movilidad (conservados/disminuidos).</br>
Goniometría:</br>
Flexión : 120º</br>
Extensión: 20º</br>
Abducción: 40º</br>
Aducción: 20º</br>
Rotación interna: 30º</br>
Rotación externa: 60º</br>
</p>
`;
                    break;
                case 'Rodilla':
                    informeHTML += `
<p>
<b>Rodilla (izquierda/derecha):</b></br>
Piel de la región explorada sin cambios de coloración ni cicatrices visibles.</br>
Pulsos arteriales, temperatura y sensibilidad conservadas.</br>
A la palpación no se evidencian deformaciones.</br>
Reflejos osteotendinosos conservados.</br>
Diámetro de rodilla (aumentado/conservado) con respecto al contralateral.</br>
Circunferencia de la articulación (38 cm), contralateral (38cm/menor).</br>
Trofismo muscular (conservado/disminuido).</br>
Circunferencia muslo ( a 7 cm de la rodilla ) 48 cm, contralateral (48 cm / mayor)</br>
A las maniobras semiológicas de la articulación:</br>
(Signos/Sin signos) de hidroartrosis leve en las maniobras de la ola y rebote patelar.</br>
(Signos/Sin signos) de inestabilidad articular a las maniobras de cajón, Lachman, Loose y Hughston. McMurray (positivo/negativo).</br>
Funcionalmente los rangos de movilidad de la articulación se encuentran (conservados/disminuidos)</br>
Goniometría:</br>
Arco de flexo extensión: 0 a 150º.</br>
</p>
`;
                    break;
                case 'Tobillo':
                    informeHTML += `
<p>
<b>Tobillo (derecho/izquierdo):</b></br>
Piel de la región explorada sin presencia de cicatrices, sin signos de flogosis, hematomas o procesos inflamatorios agudos.</br>
La temperatura, tono y trofismo muscular conservados.</br>
No se evidencian alteraciones sensitivas ni motoras.(S5 M5).</br>
Perímetro bimaleolar : 27cm ( contralateral 27cm /o menor).</br>
(No se observa/Se observa) inestabilidad articular ligamentaria.</br>
Funcionalmente los rangos de movilidad de la articulación se encuentran (conservados/disminuidos).</br>
Goniometría: </br>
Flexión dorsal: 20º</br>
Flexión plantar: 30º</br>
Inversión: 30º </br>
Eversión: 20º</br>
</p>

`;
                    break;
            }
        });
    }
    
    // Añadir secciones finales
    informeHTML += `
<h3>ESTUDIOS COMPLEMENTARIOS SOLICITADOS</h3>
<p>${formData.estudios || "No se solicitan estudios complementarios."}</p>

<h3>CONSIDERACIONES MEDICO - LEGALES</h3>
<p>${formData.consideraciones || "No se proporcionaron consideraciones médico-legales específicas."}</p>

<h3>CONCLISIONES</h3>
<p>De comprobarse la mecánica del accidente, el mismo resulta idóneo y suficiente para generar las secuelas constatadas y puede guardar nexo de causalidad con el mismo.</br>
${formData.conclusiones || "No se proporcionaron conclusiones específicas."}</p>

<h3>PUNTOS PERICIALES SOLICITADOS</h3>
<p>${formData.puntosPericiales || "No se especificaron puntos periciales adicionales."}</p></br>

<h3>PETITORIO</h3>
<p>En merito a todo lo cual a V.S. pido:</br>
-  Tenga por cumplida la tarea pericial encomendada.</br>
-  Incorpore en autos el presente y se de traslado a las partes.</br>
-  Oportunamente regule mis honorarios.</br>
</p></br>

<p class="provea">Provea V.S. de conformidad</p></br>

<p class="sera_jus"><strong>SERA JUSTICIA</strong></p>
`;
    
    // Insertar el contenido en la página
    informeContent.innerHTML = informeHTML.replace(/\n/g, '');
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR');
}