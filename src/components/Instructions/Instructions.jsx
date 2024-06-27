
import './Instructions.css';

export function Instructions(){
    return (
        <div className='ins-container'>
            <h1>Resumen del Juego Survive</h1>
            
            <h2>Tipo de Juego</h2>
            <p><span className="highlight">Estrategia y supervivencia.</span></p>
            
            <h2>Objetivo</h2>
            <p>Ser el último jugador en pie. Los jugadores navegan por un tablero, adquieren propiedades, construyen defensas, y utilizan habilidades especiales de personajes.</p>
            
            <h2>Número de Jugadores</h2>
            <p>De 2 a 4 jugadores.</p>
            
            <h2>Personajes y Habilidades</h2>
            <ul>
                <li><span className="highlight">Amistoso:</span> 20% de no perder vida en propiedades de otros.</li>
                <li><span className="highlight">Negociador:</span> Compra propiedades un 20% más barato.</li>
                <li><span className="highlight">Ladrón:</span> 5% de probabilidad de robar un corazón o boings.</li>
                <li><span className="highlight">Apostador:</span> Al caer en propiedades ajenas, apuesta para pagar doble o nada.</li>
                <li><span className="highlight">Doctor:</span> 20% de probabilidad de recuperar un corazón por turno.</li>
                <li><span className="highlight">Gemelos:</span> 20% de probabilidad de tirar los dados una segunda vez.</li>
            </ul>
            
            <h2>Tablero</h2>
            <p><span className="highlight">Diseño:</span> Cuadrado con casillas de propiedades y acciones.</p>
            <p><span className="highlight">Esquinas Especiales:</span> Hospital, casino, asalto y punto de inicio.</p>
            
            <h2>Casillas del Tablero</h2>
            <ul>
                <li><span className="highlight">Propiedades:</span> Valen 100 boings, se pueden comprar y mejorar con defensas.</li>
                <li><span className="highlight">Apuesta:</span> Sacar una carta con consecuencias o beneficios.</li>
                <li><span className="highlight">Esquinas Especiales:</span></li>
                <ul>
                    <li><span className="highlight">Asalto:</span> Pierdes vida y boings.</li>
                    <li><span className="highlight">Hospital:</span> Pagar 150 boings para curarte.</li>
                    <li><span className="highlight">Casino:</span> Apostar vida o boings.</li>
                    <li><span className="highlight">Punto de Inicio:</span> Cada vuelta, ganas 100 boings.</li>
                </ul>
            </ul>
            
            <h2>Defensas</h2>
            <ul>
                <li><span className="highlight">Alambre de púas:</span> Cuesta 40 boings, resta 1 corazón.</li>
                <li><span className="highlight">Pistola:</span> Cuesta 75 boings, resta 3 corazones.</li>
                <li><span className="highlight">Tanque:</span> Cuesta 100 boings, resta 5 corazones.</li>
                <li><span className="highlight">Misil:</span> Cuesta 150 boings, resta 7 corazones.</li>
                <li><span className="highlight">Bomba:</span> Cuesta 200 boings, resta 10 corazones.</li>
                <li><span className="highlight">Alíen:</span> Cuesta 1000 boings, mata instantáneamente.</li>
            </ul>
            
            <h2>Recursos</h2>
            <ul>
                <li><span className="highlight">Boings:</span> Dinero del juego.</li>
                <li><span className="highlight">Corazones:</span> Vida, cada jugador empieza con 35.</li>
            </ul>
            
            <h2>Reglas del Juego</h2>
            
            <h3>Inicio del Juego</h3>
            <ul>
                <li><span className="highlight">Configuración:</span> Crear o unirse a una partida, seleccionar rol, distribución de recursos iniciales.</li>
                <li><span className="highlight">Orden de Juego:</span> Determinado por una tirada de dados, el jugador con el mayor número empieza.</li>
            </ul>
            
            <h3>Desarrollo del Juego</h3>
            <ul>
                <li><span className="highlight">Movimiento:</span> Los jugadores se mueven según la tirada de dados.</li>
                <li><span className="highlight">Acciones:</span> Dependen de la casilla en la que caigan.</li>
                <ul>
                    <li><span className="highlight">Propiedades:</span> Pueden comprarlas y construir defensas.</li>
                    <li><span className="highlight">Casillas de acción:</span> Sacar cartas con efectos variados.</li>
                </ul>
                <li><span className="highlight">Pasar Esquinas:</span> Ganas 50 boings al pasar por el resto de esquinas.</li>
            </ul>
            
            <h3>Final del Juego</h3>
            <ul>
                <li><span className="highlight">Ganador:</span> El último jugador con vida.</li>
            </ul>
            
            <h2>Roles de Usuario</h2>
            <ul>
                <li><span className="highlight">Usuario no registrado:</span> No puede ni observar ni jugar partidas.</li>
                <li><span className="highlight">Usuario registrado:</span> Puede crear y unirse a partidas.</li>
            </ul>
        </div>
    );
}