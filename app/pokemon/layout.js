"use client";

import { useState } from 'react'
import ReduxProvider from "../store/ReduxProvider";

export default function PokemonLayout({
    children, // will be a page or nested layout
}) {
    return (
        <section>
            <nav style={{fontSize: "11px", "backgroundColor": "#1c2e4a", color: "white"}}>
                <div className="d-flex justify-content-between p-2 fw-bold">
                    <span>Tioreza Febrian</span>
                    <span>Software Engineer</span>
                </div>
            </nav>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </section>
    )
}