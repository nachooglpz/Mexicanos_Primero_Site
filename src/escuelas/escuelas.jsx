import { useEffect, useState } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../aliados/aliados.css'

createRoot(document.getElementById('escuelas')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App() {
    return (
        <>
            <h1>Lista de Escuelas</h1>
            <div class="search-filter">
                <input type="text" id="search" placeholder="Buscar escuelas..." />
                <select id="support-filter">
                    <option value="">Filtrar por tipo de apoyo</option>
                    <option value="financiero">Financiero</option>
                    <option value="material">Material</option>
                    <option value="voluntariado">Voluntariado</option>
                </select>
            </div>
            <div class="ally-list">
                <div class="ally-card" data-sector="educacion" data-support="financiero">
                    <h2>Escuela 1</h2>
                    <p>Sector: Educación</p>
                    <p>Necesidades:</p>
                    <ul>
                        <li>Necesidad 1</li>
                        <li>Necesidad 2</li>
                        <li>Necesidad 3</li>
                    </ul>
                </div>
                <div class="ally-card" data-sector="salud" data-support="material">
                    <h2>Escuela 2</h2>
                    <p>Sector: Educación</p>
                    <p>Necesidades:</p>
                    <ul>
                        <li>Necesidad 1</li>
                        <li>Necesidad 2</li>
                        <li>Necesidad 3</li>
                    </ul>
                </div>
                <div class="ally-card" data-sector="tecnologia" data-support="voluntariado">
                    <h2>Escuela 3</h2>
                    <p>Sector: Educación</p>
                    <p>Necesidades:</p>
                    <ul>
                        <li>Necesidad 1</li>
                        <li>Necesidad 2</li>
                        <li>Necesidad 3</li>
                    </ul>
                </div>
                <div class="ally-card" data-sector="finanzas" data-support="financiero">
                    <h2>Escuela 4</h2>
                    <p>Sector: Educación</p>
                    <p>Necesidades:</p>
                    <ul>
                        <li>Necesidad 1</li>
                        <li>Necesidad 2</li>
                        <li>Necesidad 3</li>
                    </ul>
                </div>
            </div>
            <div id="notifications">
                <h2>Notificaciones</h2>
                <ul>
                    <li>Notificación 1</li>
                    <li>Notificación 2</li>
                    <li>Notificación 3</li>
                </ul>
            </div>
        </>
    );
}