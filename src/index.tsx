import React from "react";
import {createRoot} from "react-dom/client";
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from 'react-dnd'
import { TouchBackend } from "react-dnd-touch-backend";
import {isMobile} from "react-device-detect"

import {App} from "./app/ui/App";


const container = document.getElementById('root');
if (!container) {
    throw new Error('root not found')
}

const root = createRoot(container)
const Backend = isMobile ? TouchBackend : HTML5Backend;

root.render(
    <DndProvider backend={Backend}>
        <App />
    </DndProvider>
);


